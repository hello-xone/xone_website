const Switch = ({ value, onChange, text }: { value: boolean; onChange: () => void; text: string }) => {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <span className="mr-2 text-xs text-t1">
                {text}
            </span>
            <input type="checkbox" onChange={onChange} checked={value} className="sr-only peer" />
            <div className="relative w-9 h-5 bg-gray-200 rounded-full !outline-none peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-b5 after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primaryButtonBg dark:peer-checked:bg-primaryButtonBg"></div>
        </label>
    );
};

export default Switch;
