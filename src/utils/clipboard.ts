import copy from 'copy-to-clipboard';

import { Toast } from '@/components/Toast';

export function copyText(text: string) {
  if (copy(text)) {
    Toast.success('Copied!');
  } else {
    Toast.error('Copy failed.');
  }
}

// 获取粘贴文案函数
export function getPasteText(): Promise<string> {
  if (window?.navigator?.clipboard?.readText != null) {
    return navigator.clipboard.readText();
  } else {
    const textArea = document.createElement('textarea');
    textArea.style.position = 'absolute';
    textArea.style.left = '-1000px';
    textArea.style.top = '-1000px';
    document.body.appendChild(textArea);
    textArea.focus();
    document.execCommand('paste');
    const text = textArea.value;
    document.body.removeChild(textArea);
    return Promise.resolve(text);
  }
}
