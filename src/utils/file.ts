export const getFileInfo = (filePath: string) => {
  const parts = filePath.split(/[/\\]/).pop()?.split('.') || [];
  return {
    name: parts.slice(0, -1).join('.') || '', // 文件名（处理多级扩展名）
    ext: parts.length > 1 ? parts.pop() : '' // 后缀
  };
};
