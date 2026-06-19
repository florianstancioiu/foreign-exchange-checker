import TabsMenu from "../components/TabsMenu/TabsMenu";
import DetailsContainer from "../components/UI/DetailsContainer/DetailsContainer";
import FavoriteItem from "../components/UI/FavoriteItem/FavoriteItem";

const headerContent = (
  <div className="flex justify-between items-start mb-4 md:mb-5">
    <p className="uppercase text-base font-medium leading-[120%] tracking-[1px] text-neutral-50">
      Pinned pairs
    </p>
    <p className="uppercase text-sm font-normal leading-[120%] tracking-[1px] text-neutral-200 mb-2.5">
      10 favorites
    </p>
  </div>
);

const favoriteItems = [
  {
    id: 1,
    firstCurrency: "usd",
    secondCurrency: "eur",
    value: 0.853,
    percentageValue: -0.16,
    isFavorite: true,
  },
  {
    id: 2,
    firstCurrency: "gbp",
    secondCurrency: "eur",
    value: 0.853,
    percentageValue: 0.16,
    isFavorite: true,
  },
  {
    id: 3,
    firstCurrency: "usd",
    secondCurrency: "jpy",
    value: 0.853,
    percentageValue: 0.16,
    isFavorite: true,
  },
  {
    id: 4,
    firstCurrency: "usd",
    secondCurrency: "bdt",
    value: 0.853,
    percentageValue: 0.16,
    isFavorite: true,
  },
  {
    id: 5,
    firstCurrency: "euro",
    secondCurrency: "gbd",
    value: 0.853,
    percentageValue: 0.16,
    isFavorite: true,
  },
  {
    id: 6,
    firstCurrency: "aud",
    secondCurrency: "nzd",
    value: 0.853,
    percentageValue: 0.16,
    isFavorite: true,
  },
  {
    id: 7,
    firstCurrency: "gbp",
    secondCurrency: "eur",
    value: 0.853,
    percentageValue: 0.16,
    isFavorite: true,
  },
  {
    id: 8,
    firstCurrency: "gbp",
    secondCurrency: "eur",
    value: 0.853,
    percentageValue: 0.16,
    isFavorite: true,
  },
  {
    id: 9,
    firstCurrency: "gbp",
    secondCurrency: "eur",
    value: 0.853,
    percentageValue: 0.16,
    isFavorite: true,
  },
  {
    id: 10,
    firstCurrency: "gbp",
    secondCurrency: "eur",
    value: 0.853,
    percentageValue: 0.16,
    isFavorite: true,
  },
];

const Favorites = () => {
  return (
    <TabsMenu variant="favorites">
      <DetailsContainer headerContent={headerContent}>
        {favoriteItems.map((item) => (
          <FavoriteItem
            key={item.id}
            firstCurrency={item.firstCurrency}
            secondCurrency={item.secondCurrency}
            value={item.value}
            percentageValue={item.percentageValue}
            isFavorite={item.isFavorite}
          />
        ))}
      </DetailsContainer>
    </TabsMenu>
  );
};

export default Favorites;
