import LogoIcon from "@/assets/imgs/header/logo.png";

function Empty({ className }: { className?: string }) {
    return (
        <div className={`flex flex-col bg-b3 rounded-[16px] items-center justify-center gap-[8px] py-[130px] w-full ${className ? className : ''}`}>
            <img alt="" src={LogoIcon} className="w-6 h-6"></img>
            <div className="text-t2 font-medium text-sm">Look forward to it !</div>
        </div>
    );
}

export default Empty;
