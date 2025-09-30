import { useCallback, useEffect, useState } from "react";

interface DropdownPosition {
  top: number;
  left: number;
  width: number;
  direction: 'down' | 'up';
}

interface UseAutocompletePositionProps {
  isOpen: boolean;
  inputRef: React.RefObject<HTMLElement>;
  dropdownHeight?: number; // 预估的下拉框高度
  offset?: number; // 与输入框的间距
}

export const useAutocompletePosition = ({
  isOpen,
  inputRef,
  dropdownHeight = 200,
  offset = 8,
}: UseAutocompletePositionProps) => {
  const [position, setPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
    width: 0,
    direction: 'down',
  });

  const calculatePosition = useCallback(() => {
    if (!inputRef.current || !isOpen) return;

    const inputRect = inputRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // 计算下方可用空间
    const spaceBelow = viewportHeight - inputRect.bottom - offset;
    // 计算上方可用空间
    const spaceAbove = inputRect.top - offset;

    // 决定下拉框方向
    let direction: 'down' | 'up' = 'down';
    let top = inputRect.bottom + offset;

    // 如果下方空间不足，且上方空间更充足，则向上展开
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      direction = 'up';
      top = inputRect.top - offset - dropdownHeight;
    }

    // 水平位置计算
    let left = inputRect.left;
    const dropdownWidth = inputRect.width;

    // 确保下拉框不会超出视口右边界
    if (left + dropdownWidth > viewportWidth - 16) {
      left = viewportWidth - dropdownWidth - 16;
    }

    // 确保下拉框不会超出视口左边界
    if (left < 16) {
      left = 16;
    }

    setPosition({
      top,
      left,
      width: inputRect.width,
      direction,
    });
  }, [isOpen, dropdownHeight, offset]);

  // 监听窗口变化和滚动事件
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => calculatePosition();
    const handleScroll = () => calculatePosition();

    // 初始计算
    calculatePosition();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen, calculatePosition]);

  return position;
};


