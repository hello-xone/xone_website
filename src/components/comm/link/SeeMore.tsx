import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export const SeeMore = ({
  href,
  className,
  textClassName,
  text,
  disabled = false,
  target = "_blank",
}: PropsWithChildren<{
  href: string;
  text: string;
  className?: string;
  textClassName?: string;
  target?: string;
  disabled?: boolean;
}>) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const linkContent = (
    <>
      <span
        className={`text-[14px] md:text-[20px] font-medium leading-[100%] transition-colors duration-200 ${disabled ? "!text-t3 cursor-not-allowed" : "group-hover:text-[--link1]"
          } ${textClassName ? textClassName : ""}`}
      >
        {text}
      </span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className={`transition-all duration-200 ${disabled
          ? "cursor-not-allowed"
          : "group-hover:translate-x-[6px]"
          }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.4771 9.16603L9.00707 4.69603L10.1854 3.5177L16.6671 9.99937L10.1854 16.481L9.00707 15.3027L13.4771 10.8327H3.33374V9.16603H13.4771Z"
          fill={"#FF0420"}
        />
      </svg>
    </>
  );

  if (disabled) {
    return (
      <div
        className={`flex items-center gap-[8px] cursor-not-allowed ${className ? className : ""}`}
        onClick={handleClick}
      >
        {linkContent}
      </div>
    );
  }

  return (
    <Link
      to={href}
      target={href.includes("http") ? target : "_self"}
      className={`flex items-center gap-[8px] cursor-pointer group ${className ? className : ""}`}
      onClick={handleClick}
    >
      {linkContent}
    </Link>
  );
};
