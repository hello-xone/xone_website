import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export const SeeMore = ({
    href,
    className,
    text,
    target
}: PropsWithChildren<{
    href: string;
    text: string;
    className?: string;
    target?: string;
}>) => {
    return (
        <Link to={href} target={target} className={`flex items-center gap-[8px] cursor-pointer group ${className ? className : ''}`}>
            <span className="text-[14px] md:text-[20px] font-medium group-hover:text-[--link1] leading-[100%]">{text}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" className="group-hover:translate-x-[6px] transition-transform" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4771 9.16603L9.00707 4.69603L10.1854 3.5177L16.6671 9.99937L10.1854 16.481L9.00707 15.3027L13.4771 10.8327H3.33374V9.16603H13.4771Z" fill="#FF0420" />
            </svg>

        </Link>
    );
};
