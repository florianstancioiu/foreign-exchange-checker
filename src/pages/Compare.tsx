import TabsMenu from "../components/TabsMenu/TabsMenu";
import DetailsContainer from "../components/UI/DetailsContainer/DetailsContainer";
import CompareItem from "../components/UI/CompareItem/CompareItem";
import compareRates from "../helpers/compareRates";
import { useQuery } from "@tanstack/react-query";
import { useRateContext } from "../contexts/RateContext";
import { type Rate } from "../types/rate";
import EmptyPage from "../components/UI/EmptyPage/EmptyPage";

type CompareHeaderContentProps = {
  pairs: number;
  sendValue: number;
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
        <p className="text-sm font-normal leading-[120%] tracking-[1px] text-neutral-200 mb-2.5">
          Multi-Currency
        </p>
        <p className="uppercase text-xs font-normal leading-[120%] tracking-[0.5px] text-neutral-50 opacity-70">
          {pairs} pairs
        </p>
      </div>
      <p className="text-base font-medium leading-[120%] tracking-[1px] text-neutral-50">
        {sendValue} <span className="hidden sm:inline">from </span>
        {currency}
      </p>
    </div>
    <div className="justify-between items-center mb-5 hidden md:flex">
      <div className="uppercase flex items-center gap-x-3">
        <p className="text-sm font-normal leading-[120%] tracking-[1px] text-neutral-200">
          Multi-Currency
        </p>
        <p className="text-base font-medium leading-[120%] tracking-[1px] text-neutral-50">
          {sendValue} from {currency}
        </p>
      </div>
      <p className="uppercase text-xs font-normal leading-[120%] tracking-[0.5px] text-neutral-50 opacity-70">
        {pairs} pairs
      </p>
    </div>
  </>
);

const Compare = () => {
  const { firstCurrency, sendValue } = useRateContext();
  const compareRatesString = compareRates
    .map((r) => r.iso_code)
    .join(",")
    .toUpperCase();

  const { isPending, error, data } = useQuery({
    queryKey: [`compareCurrencies-${firstCurrency}-${compareRatesString}`],
    queryFn: async () => {
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=${firstCurrency.toUpperCase()}&quotes=${compareRatesString}`,
      );

      return await response.json();
    },
  });

  const enhancedData = data?.map((item: Rate) => ({
    ...item,
    name: compareRates.find(
      (rate) => rate.iso_code.toLowerCase() === item.quote.toLowerCase(),
    )?.name,
  }));

  return (
    <TabsMenu variant="compare">
      <DetailsContainer
        headerContent={CompareHeaderContent({
          pairs: compareRates.length,
          sendValue: sendValue,
          currency: firstCurrency,
        })}
      >
        {Array.isArray(enhancedData) &&
          !isPending &&
          !error &&
          enhancedData.map((item: Rate & { name: string }) => (
            <CompareItem
              key={`${item.base}-${item.quote}`}
              currency={item.quote}
              currencyTitle={item.name}
              value={item.rate * sendValue}
              subValue={item.rate}
              isFavorite={false}
            />
          ))}
        {isPending && (
          <EmptyPage
            title="Loading compare data"
            content={
              <div>
                <p>
                  We are currently loading the compare data for{" "}
                  {compareRates.length} currencies.
                </p>
                <p>This usually clears up in a minute.</p>
              </div>
            }
          />
        )}
        {error && (
          <EmptyPage
            title="There was an error loading the compare data"
            content={
              <div className="text-red-500">
                <p>We couldn't load the comparison data.</p>
                <p>Check back later.</p>
              </div>
            }
          />
        )}
      </DetailsContainer>
    </TabsMenu>
  );
};

export default Compare;
