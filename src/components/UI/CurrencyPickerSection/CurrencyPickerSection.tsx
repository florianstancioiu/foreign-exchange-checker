import CurrencyPickerItem from "../CurrencyPickerItem/CurrencyPickerItem";
import { type CurrencyPickerItemProps } from "../CurrencyPickerItem/CurrencyPickerItem";
import unavailableCurrencies from "../../../helpers/unavailableCurrencies";

type DataItem = CurrencyPickerItemProps & {
  id: number;
};

export type CurrencyPickerSectionProps = {
  title: string;
  titleValue: number;
  data: DataItem[];
  onClickItem: (isoCode: string) => void;
  activeIso?: string;
};

const CurrencyPickerSection = ({
  title,
  titleValue,
  data,
  onClickItem,
  activeIso,
}: CurrencyPickerSectionProps) => {
  return (
    <>
      <div>
        <p className="flex justify-between items-center text-xs font-normal leading-[120%] tracking-[0.5px text-neutral-200] p-2 border-b border-neutral-500">
          <span className="uppercase">{title}</span>
          <span className="">{titleValue}</span>
        </p>
      </div>
      <div>
        {data.map((val) => {
          // hide currencies that lack a svg flag icon
          if (unavailableCurrencies.includes(val.iso_code.toLowerCase())) {
            return;
          }

          return (
            <CurrencyPickerItem
              key={val.iso_code}
              iso_code={val.iso_code}
              name={val.name}
              isActive={val.iso_code === activeIso}
              onClick={onClickItem}
            />
          );
        })}
      </div>
    </>
  );
};

export default CurrencyPickerSection;
