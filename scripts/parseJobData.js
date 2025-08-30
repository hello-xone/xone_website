#!/usr/bin/env node

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取 __dirname 的 ES modules 等价物
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* global process */

/**
 * 根据文件名称生成随机ID
 * @param {string} filePath 文件路径
 * @returns {string} 随机ID
 */
function generateRandomId(filePath) {
    const fileName = path.basename(filePath, path.extname(filePath));
    return fileName
}

/**
 * 解析数组格式的字符串字段
 * @param {string} value 字段值
 * @returns {string|string[]} 解析后的值
 */
function parseArrayField(value) {
    if (typeof value !== 'string') return value;

    // 检查是否是数组格式 "[item1,item2,item3]"
    if (value.startsWith('[') && value.endsWith(']')) {
        const content = value.slice(1, -1); // 移除方括号
        return content.split(',').map(item => item.trim()).filter(item => item);
    }

    return value;
}

/**
 * 解析 MDX 文件并提取职位数据
 * @param {string} filePath 文件路径
 * @param {string} baseDir 基础目录
 * @returns {Object} 职位数据对象
 */
function parseJobFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        // 提取摘要（前200个字符）
        const excerpt = content.replace(/[#*`]/g, '').substring(0, 200).trim();

        // 解析数组格式的字段
        const location = parseArrayField(data.location);
        const workType = parseArrayField(data.workType);
        const subType = parseArrayField(data.subType);

        return {
            id: generateRandomId(filePath), // 生成唯一ID
            title: data.title || '未命名职位',
            logo: data.logo || '/imgs/default-logo.png',
            position: data.position || '未知职位',
            subType: subType || '未知类型',
            publishDate: data.publishDate || new Date().toISOString().split('T')[0],
            workType: workType || '未知',
            company: data.company || '未知公司',
            location: location || '未知地点',
            content,
            excerpt: excerpt + (excerpt.length === 200 ? '...' : '')
        };
    } catch (error) {
        console.error(`解析文件失败 ${filePath}:`, error.message);
        return null;
    }
}

/**
 * 递归获取目录下的所有 MDX 文件
 * @param {string} dir 目录路径
 * @returns {string[]} 文件路径数组
 */
function getAllMdxFiles(dir) {
    const files = [];

    try {
        if (!fs.existsSync(dir)) {
            console.warn(`目录不存在: ${dir}`);
            return files;
        }

        const items = fs.readdirSync(dir);

        items.forEach(item => {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                // 递归处理子目录
                files.push(...getAllMdxFiles(fullPath));
            } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
                // 添加 MDX/MD 文件
                files.push(fullPath);
            }
        });
    } catch (error) {
        console.error(`读取目录失败 ${dir}:`, error.message);
    }

    return files;
}

/**
 * 解析所有职位数据
 */
function main() {
    const args = process.argv.slice(2);
    const inputDir = args[0] || 'src/assets/job';
    const outputFile = args[1] || 'src/assets/job/jobPosts.json';

    console.log(`🚀 开始解析目录: ${inputDir}`);
    console.log(`📁 输出文件: ${outputFile}`);

    // 获取所有 MDX 文件
    const mdxFiles = getAllMdxFiles(inputDir);
    console.log(`📄 找到 ${mdxFiles.length} 个 MDX 文件`);

    if (mdxFiles.length === 0) {
        console.log('❌ 没有找到 MDX 文件，退出');
        return;
    }

    // 解析所有文件
    const jobPosts = [];
    mdxFiles.forEach(filePath => {
        const jobData = parseJobFile(filePath);
        if (jobData) {
            jobPosts.push(jobData);
            console.log(`✅ 解析成功: ${jobData.title}`);
            console.log(`   🆔 ID: ${jobData.id}`);

            // 显示解析的字段信息
            if (Array.isArray(jobData.location)) {
                console.log(`   📍 地点: [${jobData.location.join(', ')}]`);
            }
            if (Array.isArray(jobData.workType)) {
                console.log(`   💼 工作类型: [${jobData.workType.join(', ')}]`);
            }
        }
    });

    // 按发布时间排序（最新的在前）
    jobPosts.sort((a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );

    // 创建输出目录（如果不存在）
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // 生成输出数据
    const outputData = {
        generatedAt: new Date().toLocaleString(),
        totalCount: jobPosts.length,
        sourceDirectory: inputDir,
        jobPosts
    };

    // 写入 JSON 文件
    try {
        fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2), 'utf8');
        console.log(`\n🎉 成功生成 JSON 文件: ${outputFile}`);
        console.log(`📊 总共解析了 ${jobPosts.length} 个职位`);

        // 显示统计信息
        const companies = [...new Set(jobPosts.map(job => job.company))];
        const workTypes = [...new Set(jobPosts.flatMap(job =>
            Array.isArray(job.workType) ? job.workType : [job.workType]
        ))];
        const locations = [...new Set(jobPosts.flatMap(job =>
            Array.isArray(job.location) ? job.location : [job.location]
        ))];

        console.log(`\n📈 统计信息:`);
        console.log(`   🏢 公司数量: ${companies.length}`);
        console.log(`   💼 工作类型: ${workTypes.length}`);
        console.log(`   📍 地点数量: ${locations.length}`);

        // 显示详细信息
        console.log(`\n🏢 公司列表:`);
        companies.forEach(company => console.log(`   - ${company}`));

        console.log(`\n💼 工作类型:`);
        workTypes.forEach(type => console.log(`   - ${type}`));

        console.log(`\n📍 地点列表:`);
        locations.forEach(location => console.log(`   - ${location}`));

    } catch (error) {
        console.error(`❌ 写入文件失败: ${error.message}`);
        process.exit(1);
    }
}

main();
