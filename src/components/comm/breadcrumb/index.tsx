import clsx from "clsx";

// 面包屑项接口
export interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

// 组件属性接口
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

export const Breadcrumb = ({
  items,
  separator = "/",
  className,
  onItemClick,
}: BreadcrumbProps) => {
  const handleItemClick = (item: BreadcrumbItem, index: number) => {
    if (onItemClick && !item.isActive) {
      onItemClick(item, index);
    }
  };

  return (
    <nav
      className={clsx("flex items-center", className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {/* 面包屑项 */}
            <div className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-[var(--t3)] text-sm font-normal text-[12px]">
                  {separator}
                </span>
              )}
              <button
                type="button"
                className={clsx(
                  "text-sm font-normal transition-colors duration-200 text-[12px]",
                  item.isActive
                    ? "text-[var(--t1)] cursor-default"
                    : "text-[var(--t3)]"
                )}
                onClick={() => handleItemClick(item, index)}
                disabled={item.isActive}
              >
                {item.label}
              </button>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
