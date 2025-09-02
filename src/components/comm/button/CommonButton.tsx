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
    type?: "common" | "outline" | 'primary' | 'black';
}) => {
    return <button className={clsx(`text-xs md:text-base font-medium flex items-center box-border border-[1px] border-transparent border-solid justify-center gap-[8px] leading-4 md:leading-6 px-[16px] py-[7px] rounded-[8px] cursor-pointer ${className ? className : ''}`, {
        'bg-primaryButtonBg text-primaryButtonText hover:bg-[--link2]': type === 'primary',
        'text-t1 !border-border4 hover:!border-[--link1] hover:text-[--link1]': type === 'outline',
        '!bg-b5 text-t5 hover:!bg-[--b10] hover:text-t2': type === 'black',
    })} onClick={() => onClick && onClick()}>{children}</button>;
};

export default CommonButton;
