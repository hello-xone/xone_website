import clsx from "clsx";
import React from "react";

interface Props {
  title: string;
  description: string;
  list: {
    title: string;
    icon: React.ComponentType<any> | string;
    description?: string;
  }[];
  isMobileTow?: boolean;
}

export const CardList = ({ title, description, list, isMobileTow }: Props) => {
  return (
    <div>
      <h2 className="text-[var(--t1)] text-[24px] md:text-[48px] font-bold">
        {title}
      </h2>
      <p className="text-[var(--t2)] text-[15px] md:text-[16px] mt-2">
        {description}
      </p>
      <div
        className={clsx(
          "grid grid-cols-1 mt-8 gap-y-[16px] gap-x-[16px] md:gap-y-[24px] md:gap-x-[36px] md:grid-cols-3",
          isMobileTow && "grid-cols-2"
        )}
      >
        {list.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start bg-[var(--b2)] md:rounded-[24px] rounded-[8px] md:p-[24px] p-[16px]"
          >
            <div className="w-[40px] h-[40px] md:w-[54px] md:h-[54px] flex items-center justify-center mb-2 md:mb-3">
              <item.icon className="w-full h-full" />
            </div>
            <h3 className="text-[var(--t1)] text-[20px] md:text-[28px] font-bold leading-[1.2]">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-[var(--t2)] text-[14px] md:text-[16px] mt-1 md:mt-3">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
