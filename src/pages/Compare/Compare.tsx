import TabsMenu from "../../components/TabsMenu/TabsMenu";
import DetailsContainer from "../../components/UI/DetailsContainer/DetailsContainer";
import CompareItem from "../../components/UI/CompareItem/CompareItem";
import compareRates from "../../helpers/compareRates";
import { useQuery } from "@tanstack/react-query";
import { useRateContext } from "../../contexts/RateContext";
import { type Rate } from "../../types/rate";
import EmptyPage from "../../components/UI/EmptyPage/EmptyPage";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import CompareHeaderContent from "./CompareHeaderContent";

type RateWithName = Rate & { name: string };

const Compare = () => {
  const { firstCurrency, sendValue } = useRateContext();
  const { isFavorited } = useFavoritesContext();
  const compareRatesString = compareRates.map((r) => r.iso_code).join(",");

  const {
    isPending,
    error,
    data: compareCurrenciesData,
  } = useQuery<Rate[]>({
    queryKey: ["compareCurrencies", firstCurrency, compareRatesString],
    staleTime: 5000,
    queryFn: async () => {
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=${firstCurrency}&quotes=${compareRatesString}`,
      );

      if (!response.ok) {
        throw new Error("There was an error with compareCurrencies query");
      }

      return await response.json();
    },
  });

  const data = Array.isArray(compareCurrenciesData)
    ? compareCurrenciesData
    : [];

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
            currency={firstCurrency}
          />
        }
      >
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
              isFavorite={isFavorited(firstCurrency, item.quote)}
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
