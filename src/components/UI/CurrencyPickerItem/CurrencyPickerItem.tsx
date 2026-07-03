import CheckSvg from "../../../images/icon-check.svg?react";

export type CurrencyPickerItemProps = {
  iso_code: string;
  name: string;
  isActive?: boolean;
  onClick?: (isoCode: string) => void;
};

const CurrencyPickerItem = ({
  iso_code,
  name,
  isActive = false,
  onClick,
}: CurrencyPickerItemProps) => {
  return (
    <button
      type="button"
      onClick={() => {
        if (onClick) {
          onClick(iso_code);
        }
      }}
      data-testid="currency_picker_item"
      className="border border-neutral-600 bg-neutral-600 light:bg-blue-500 light:border-blue-600 rounded-sm py-3 px-2 flex justify-between items-center w-full cursor-pointer hover:border-neutral-200 light:hover:border-blue-400 focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg    "
    >
      <div className="flex items-center gap-x-3">
        <img
          src={`/foreign-exchange-checker/images/svg-flags/${iso_code.toUpperCase().substring(0, 2)}.svg`}
          alt={`${name} flag`}
          data-testid="currency_picker_item_flag"
          className="size-5 rounded-full"
        />
        <p
          data-testid="currency_picker_item_iso"
          className="uppercase text-neutral-50 text-sm font-normal leading-[120%] tracking-[1px]"
        >
          {iso_code}
        </p>
        <p
          className="text-neutral-200 text-xs font-normal leading-[120%] tracking-[0.5px] light:text-neutral-100"
          data-testid="currency_picker_item_name"
          title={name}
        >
          {name.substring(0, 20)}
        </p>
      </div>
      {isActive !== undefined && isActive === true ? (
        <div data-testid="currency_picker_active_svg">
          <CheckSvg />
        </div>
      ) : (
        <></>
      )}
    </button>
  );
};

export default CurrencyPickerItem;
