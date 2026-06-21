import CurrencyPickerItem from "../CurrencyPickerItem/CurrencyPickerItem";
import { type CurrencyPickerItemProps } from "../CurrencyPickerItem/CurrencyPickerItem";

type DataItem = CurrencyPickerItemProps & {
  id: number;
};

export type CurrencyPickerSectionProps = {
  title: string;
  titleValue: number;
  data: DataItem[];
};

const CurrencyPickerSection = ({
  title,
  titleValue,
  data,
}: CurrencyPickerSectionProps) => {
  console.log(data);
  return (
    <>
      <div>
        <p className="flex justify-between items-center text-xs font-normal leading-[120%] tracking-[0.5px text-neutral-200] p-2 border-b border-neutral-500">
          <span className="uppercase">{title}</span>
          <span className="">{titleValue}</span>
        </p>
      </div>
      <div>
        {data.map((val) => (
          <CurrencyPickerItem
            key={val.iso_code}
            iso_code={val.iso_code}
            name={val.name}
            isActive={val.isActive}
          />
        ))}
      </div>
    </>
  );
};

export default CurrencyPickerSection;
