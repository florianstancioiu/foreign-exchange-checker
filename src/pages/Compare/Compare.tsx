import TabsMenu from "../../components/TabsMenu/TabsMenu";
import DetailsContainer from "../../components/UI/DetailsContainer/DetailsContainer";
import CompareItem from "../../components/UI/CompareItem/CompareItem";
import compareRates from "../../helpers/compareRates";
import { useRateContext } from "../../hooks/useRateContext";
import { useFavoritesContext } from "../../hooks/useFavoritesContext";
import { type Rate } from "../../types/rate";
import EmptyPage from "../../components/UI/EmptyPage/EmptyPage";
import CompareHeaderContent from "./CompareHeaderContent";
import useRateRequest from "../../hooks/useRateRequest";

type RateWithName = Rate & { name: string };

const Compare = () => {
  const { base, sendValue } = useRateContext();
  const { isFavorited } = useFavoritesContext();
  const compareRatesString = compareRates.map((r) => r.iso_code).join(",");

  const {
    isPending,
    error,
    data: compareCurrenciesData,
  } = useRateRequest(
    "compareCurrencies",
    [base, compareRatesString],
    `base=${base}&quotes=${compareRatesString}`,
  );

  let data: Rate[] = [];
  if (Array.isArray(compareCurrenciesData)) {
    data = compareCurrenciesData;
  }

  const enhancedData: RateWithName[] = data?.map((item: Rate) => ({
    ...item,
    name: compareRates.find((rate) => rate.iso_code === item.quote)?.name ?? "",
  }));

  return (
    <TabsMenu variant="compare">
      <DetailsContainer
        headerContent={
          <CompareHeaderContent
            pairs={compareRates.length}
            sendValue={sendValue}
            currency={base}
          />
        }
      >
        <ul className="list-none flex gap-y-3 flex-col">
          {Array.isArray(enhancedData) &&
            !isPending &&
            !error &&
            enhancedData.map((item) => (
              <CompareItem
                key={`${item.base}-${item.quote}`}
                currency={item.quote}
                currencyTitle={item.name}
                value={
                  item.rate *
                  (typeof sendValue === "string"
                    ? parseFloat(sendValue)
                    : sendValue)
                }
                subValue={item.rate}
                isFavorite={isFavorited(base, item.quote)}
              />
            ))}
        </ul>
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
