import EmptyIcon from "@/assets/svg/home/empty.svg";

function Empty({ className }: { className?: string }) {
    return (
        <div className={`flex flex-col bg-b3 rounded-[16px] items-center justify-center gap-[8px] py-[130px] w-full ${className ? className : ''}`}>
            <img alt="" src={EmptyIcon} className="w-8 h-8"></img>
            <div className="text-t2 font-medium text-sm">Look forward to it !</div>
        </div>
    );
}

export default Empty;
