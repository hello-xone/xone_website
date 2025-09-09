import { countTrailingZeros, effectiveDecimals, extractSignificantDigits } from "@/utils/number";

function Price({
    price,
    className1,
    num = 2,
    extractNum = 2,
    show$ = true,
}: {
    price: string | number;
    className1: string;
    num?: number
    extractNum?: number
    show$?: boolean;
}) {
    return (
        <div className={`flex items-baseline ${className1}`}>
            {countTrailingZeros(price) > num ? (
                <>
                    {show$ ? '$' : ''}0.0
                    <span className={`scale-[0.7] origin-bottom`}>{countTrailingZeros(price)}</span>
                    {extractSignificantDigits(price, extractNum)}
                </>
            ) : (
                <>{show$ ? '$' : ''}{effectiveDecimals(price)}</>
            )}
        </div>
    );
}

export default Price;
