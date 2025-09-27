#!/usr/bin/env node

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 处理HTML中的外部链接，添加 target="_blank" 和 rel="noopener noreferrer"
function processExternalLinks(html) {
  // 使用正则表达式匹配所有的 <a> 标签
  return html.replace(/<a\s+([^>]*?)href=["']([^"']+)["']([^>]*?)>/gi, (match, beforeHref, url, afterHref) => {
    // 检查是否为外部链接（以 http:// 或 https:// 开头）
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      // 检查是否已经有 target 属性
      const hasTarget = /target\s*=/i.test(beforeHref + afterHref);
      const hasRel = /rel\s*=/i.test(beforeHref + afterHref);
      
      let attributes = beforeHref + afterHref;
      
      // 如果没有 target 属性，添加 target="_blank"
      if (!hasTarget) {
        attributes += ' target="_blank"';
      }
      
      // 如果没有 rel 属性，添加 rel="noopener noreferrer"
      if (!hasRel) {
        attributes += ' rel="noopener noreferrer"';
      }
      
      return `<a ${attributes} href="${url}">`;
    }
    
    // 如果不是外部链接，保持原样
    return match;
  });
}

// 计算阅读时间（基于字数，中文按字符计算，英文按单词计算）
function calculateReadingTime(content) {
  // 移除 Markdown 语法
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // 标题
    .replace(/\*\*(.*?)\*\*/g, '$1') // 粗体
    .replace(/\*(.*?)\*/g, '$1') // 斜体
    .replace(/`(.*?)`/g, '$1') // 行内代码
    .replace(/```[\s\S]*?```/g, '') // 代码块
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // 图片
    .replace(/\|.*\|/g, '') // 表格
    .replace(/>\s+/g, '') // 引用
    .replace(/\n+/g, ' ') // 换行
    .trim();

  // 中文字符数
  const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length;
  
  // 英文单词数
  const englishWords = plainText
    .replace(/[\u4e00-\u9fa5]/g, '') // 移除中文字符
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // 阅读速度：中文 300 字/分钟，英文 200 词/分钟
  const chineseReadingTime = chineseChars / 300;
  const englishReadingTime = englishWords / 200;
  
  const totalMinutes = chineseReadingTime + englishReadingTime;
  
  return Math.max(1, Math.ceil(totalMinutes)); // 至少 1 分钟
}

// 解析单个 MDX 文件
async function parseAnnouncementFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    // 验证必需字段
    if (!data.id || !data.title || !data.date) {
      console.warn(`Missing required fields in ${filePath}`);
      return null;
    }

    const slug = path.basename(filePath, '.mdx');
    const readingTime = calculateReadingTime(content);

    // 将 Markdown 内容转换为 HTML
    const processedContent = await remark()
      .use(remarkHtml)
      .process(content);
    
    // 处理外部链接
    const contentHtml = processExternalLinks(processedContent.toString());

    // 生成摘要（从原始 Markdown 内容生成）
    const summary = data.summary || 
      content
        .replace(/#{1,6}\s+/g, '') // 移除标题标记
        .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体标记
        .replace(/\*(.*?)\*/g, '$1') // 移除斜体标记
        .replace(/`(.*?)`/g, '$1') // 移除行内代码标记
        .replace(/\n+/g, ' ') // 替换换行为空格
        .trim()
        .substring(0, 150) + '...';

    return {
      meta: {
        id: data.id,
        title: data.title,
        date: data.date,
        image: data.image,
        summary: summary,
        show: data.show, // 默认为true，除非明确设置为false
        moreLink: data.moreLink || null // 可选的Learn More链接
      },
      content: contentHtml, // 现在是 HTML 格式
      slug,
      readingTime
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

// 解析整个 MDX 目录
async function parseAnnouncementDirectory(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      console.warn(`Directory ${dirPath} does not exist`);
      return [];
    }

    const files = fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.mdx'))
      .sort(); // 按文件名排序

    const announcements = [];

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const announcement = await parseAnnouncementFile(filePath);
      
      if (announcement && announcement.meta.show) {
        announcements.push(announcement);
      }
    }

    // 按日期倒序排列（最新的在前）
    return announcements.sort((a, b) => 
      new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}


// 生成简化数据
async function generateAnnouncementData(dirPath) {
  const announcements = await parseAnnouncementDirectory(dirPath);
  
  return {
    timestamp: new Date().toISOString(),
    total: announcements.length,
    list: announcements
  };
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  
  // 默认 MDX 目录路径
  let mdxDir = path.join(__dirname, 'mdx');
  let outputFile = 'list.json';
  let format = 'json';

  // 解析命令行参数
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--dir':
      case '-d':
        mdxDir = args[++i];
        break;
      case '--output':
      case '-o':
        outputFile = args[++i];
        break;
      case '--format':
      case '-f':
        format = args[++i];
        break;
      case '--help':
      case '-h':
        console.log(`
Usage: node cli.js [options]

Options:
  -d, --dir <path>      MDX files directory (default: ./mdx)
  -o, --output <file>   Output file name (default: list.json)
  -f, --format <type>   Output format: json|js (default: json)
  -h, --help           Show this help message

Examples:
  node cli.js
  node cli.js --dir ./announcements --output data.json
  node cli.js --format js --output list.js
        `);
        return;
    }
  }

  console.log(`📁 Parsing MDX files from: ${mdxDir}`);
  console.log(`📄 Output file: ${outputFile}`);
  console.log(`📋 Format: ${format}`);
  console.log('');

  // 解析数据
  const data = await generateAnnouncementData(mdxDir);
  
  console.log(`✅ Parsed ${data.total} announcements`);
  console.log('');

  // 输出数据
  let outputContent;
  
  if (format === 'js') {
    outputContent = `// Generated at ${data.timestamp}
// Total announcements: ${data.total}

export const announcementData = ${JSON.stringify(data, null, 2)};

export default announcementData;
`;
  } else {
    outputContent = JSON.stringify(data, null, 2);
  }

  // 写入文件
  try {
    fs.writeFileSync(outputFile, outputContent, 'utf-8');
    console.log(`✅ Data written to ${outputFile}`);
    console.log(`📊 File size: ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error(`❌ Error writing file:`, error);
    process.exit(1);
  }

  console.log('\n🎉 Done!');
}

// 运行主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  generateAnnouncementData,
  parseAnnouncementDirectory,
  parseAnnouncementFile};
