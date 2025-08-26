import { clsx } from 'clsx';
import { ReactNode } from "react";

const CommonButton = ({
    onClick,
    type = "primary",
    children,
    className,
}: {
    onClick?: () => void;
    children: ReactNode;
    className?: string;
    type?: "common" | "outline" | 'primary';
}) => {
    return <button className={clsx(`text-xs md:text-base font-medium flex items-center box-border border-[1px] border-transparent border-solid justify-center gap-[8px] leading-4 md:leading-6 px-[16px] py-[7px] rounded-[5px] cursor-pointer ${className ? className : ''}`, {
        'bg-primaryButtonBg text-primaryButtonText': type === 'primary',
        'text-t1 !border-border4': type === 'outline',
    })} onClick={() => onClick && onClick()}>{children}</button>;
};

export default CommonButton;
