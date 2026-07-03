import CurrencyPickerItem from "../CurrencyPickerItem/CurrencyPickerItem";
import { type CurrencyPickerItemProps } from "../CurrencyPickerItem/CurrencyPickerItem";

export type CurrencyPickerSectionProps = {
  title: string;
  titleValue: number;
  data: CurrencyPickerItemProps[];
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
          <span
            className="uppercase light:text-neutral-900"
            data-testid="currency_picker_section_title"
          >
            {title}
          </span>
          <span
            className="light:text-neutral-900"
            data-testid="currency_picker_section_title_value"
          >
            {titleValue}
          </span>
        </p>
      </div>
      <div>
        {data.map((val) => (
          <CurrencyPickerItem
            key={val.iso_code}
            iso_code={val.iso_code}
            name={val.name}
            isActive={val.iso_code === activeIso}
            onClick={onClickItem}
          />
        ))}
      </div>
    </>
  );
};

export default CurrencyPickerSection;
