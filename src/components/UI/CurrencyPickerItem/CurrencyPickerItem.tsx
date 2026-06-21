import CheckSvg from "../../../images/icon-check.svg?react";

export type CurrencyPickerItemProps = {
  flag: string | null;
  currency: string;
  currencyTitle: string;
  isActive?: boolean;
};

const CurrencyPickerItem = ({
  flag,
  currency,
  currencyTitle,
  isActive = false,
}: CurrencyPickerItemProps) => {
  return (
    <button
      type="button"
      className="border border-neutral-600 bg-neutral-600 rounded-sm py-3 px-2 flex justify-between items-center w-full cursor-pointer hover:border-neutral-200 focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg    "
    >
      <div className="flex items-center gap-x-3">
        <img
          src={flag ? flag : ""}
          alt={`${currencyTitle} flag`}
          className="size-5 rounded-full"
        />
        <p className="uppercase text-neutral-50 text-sm font-normal leading-[120%] tracking-[1px]">
          {currency}
        </p>
        <p className="text-neutral-200 text-xs font-normal leading-[120%] tracking-[0.5px]">
          {currencyTitle}
        </p>
      </div>
      {isActive !== undefined && isActive === true ? <CheckSvg /> : <></>}
    </button>
  );
};

export default CurrencyPickerItem;
