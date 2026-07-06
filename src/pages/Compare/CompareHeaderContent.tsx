type CompareHeaderContentProps = {
  pairs: number;
  sendValue: number | string;
  currency: string;
};

const CompareHeaderContent = ({
  pairs,
  sendValue,
  currency,
}: CompareHeaderContentProps) => (
  <>
    <div className="flex justify-between items-start mb-4 md:hidden">
      <div className="uppercase">
        <p className="text-sm font-normal leading-[120%] tracking-[1px] text-neutral-200 mb-2.5 light:text-neutral-900">
          Multi-Currency
        </p>
        <p className="uppercase text-xs font-normal leading-[120%] tracking-[0.5px] text-neutral-50 opacity-70 light:text-neutral-800">
          {pairs} pairs
        </p>
      </div>
      <p className="text-base font-medium leading-[120%] tracking-[1px] text-neutral-50 light:text-neutral-800">
        {sendValue} <span className="hidden sm:inline">from </span>
        {currency}
      </p>
    </div>
    <div className="justify-between items-center mb-5 hidden md:flex">
      <div className="uppercase flex items-center gap-x-3">
        <p className="text-sm font-normal leading-[120%] tracking-[1px] text-neutral-200 light:text-neutral-900">
          Multi-Currency
        </p>
        <p className="text-base font-medium leading-[120%] tracking-[1px] text-neutral-50 light:text-neutral-800">
          {sendValue} from {currency}
        </p>
      </div>
      <p className="uppercase text-xs font-normal leading-[120%] tracking-[0.5px] text-neutral-50 opacity-70 light:text-neutral-800">
        {pairs} pairs
      </p>
    </div>
  </>
);

export default CompareHeaderContent;
