import { useMemo } from "react";

import jobPosts from "@/assets/job/jobPosts.json";

/**
 * 根据ID获取职位详情的Hook
 * @param id 职位ID
 * @returns 职位详情数据
 */
export const useJobDetail = (id: string | undefined) => {
  const jobDetail = useMemo(() => {
    if (!id || !jobPosts.jobPosts) {
      return null;
    }

    // 在职位列表中查找匹配的ID
    const foundJob = jobPosts.jobPosts.find((job: any) => job.id === id);

    if (!foundJob) {
      console.warn(`未找到ID为 ${id} 的职位`);
      return null;
    }

    // 处理 MDX 内容，将 markdown 转换为简单的 HTML
    const processedJob = {
      ...foundJob,
      content: processMdxContent(foundJob.content || ""),
    };

    return processedJob;
  }, [id]);

  return {
    job: jobDetail,
    isLoading: false,
    error: jobDetail ? null : `未找到ID为 ${id} 的职位`,
  };
};

/**
 * 简单的 MDX 内容处理函数
 * 将基本的 markdown 语法转换为 HTML
 */
function processMdxContent(content: string): string {
  if (!content) return "";

  return (
    content
      // 移除 frontmatter 分隔符和内容
      .replace(/^---\s*$/gm, "")
      .replace(/^title:.*$/gm, "")
      .replace(/^logo:.*$/gm, "")
      .replace(/^position:.*$/gm, "")
      .replace(/^subType:.*$/gm, "")
      .replace(/^publishDate:.*$/gm, "")
      .replace(/^workType:.*$/gm, "")
      .replace(/^company:.*$/gm, "")
      .replace(/^location:.*$/gm, "")
      .replace(/^excerpt:.*$/gm, "")

      // 处理标题
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-xl font-semibold mt-3 mb-2 text-[var(--t1)]">$1</h3>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-2xl font-bold mt-4 mb-2 text-[var(--t1)]">$1</h2>'
      )
      .replace(
        /^# (.*$)/gim,
        '<h1 class="text-3xl font-bold mt-6 mb-3 text-[var(--t1)]">$1</h1>'
      )

      // 处理列表
      .replace(/^\* (.*$)/gim, '<p class="ml-4 mb-1 text-[var(--t2)]">$1</p>')
      .replace(/^- (.*$)/gim, '<p class="ml-4 mb-1 text-[var(--t2)]">$1</p>')
      .replace(/(<li.*<\/li>)/gim, '<p class="mb-1 list-decimal">$1</p>')

      // 处理段落
      .replace(
        /^(?!<[h|u|d])(.+)$/gim,
        '<p class="ml-4 mb-1 text-[var(--t2)]">$1</p>'
      )

      // 处理section div内的p标签，移除class属性
      .replace(/<div class="section">([\s\S]*?)<\/div>/g, (match, content) => {
        // 移除section div内p标签的class属性
        const cleanedContent = content.replace(/<p class="[^"]*">/g, "<p>");
        return `<div class="section text-[var(--t1)] text-[16px] font-normal" style="margin-bottom: 50px;">${cleanedContent}</div>`;
      })

      // 处理粗体和斜体
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-[var(--t1)]">$1</strong>'
      )
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

      // 处理代码块
      .replace(
        /```(\w+)?\n([\s\S]*?)\n```/g,
        '<pre class="bg-[var(--b3)] p-3 rounded-lg overflow-x-auto mb-2"><code class="text-sm">$2</code></pre>'
      )
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-[var(--b3)] px-2 py-1 rounded text-sm font-mono">$1</code>'
      )

      // 处理直接的 HTML 链接标签
      .replace(
        /<a\s+href="([^"]+)"([^>]*)>([^<]+)<\/a>/g,
        '<a href="$1" class="text-[var(--primary)] hover:underline"$2>$3</a>'
      )

      // 清理多余的空行和 frontmatter 相关内容
      .replace(/\n\s*\n/g, "\n")
      .replace(/^\s*---\s*$/gm, "")
      .replace(/^\s*[a-zA-Z]+:.*$/gm, "")
      .trim()
  );
}
