import TabsMenu from "../components/TabsMenu/TabsMenu";
import DetailsContainer from "../components/UI/DetailsContainer/DetailsContainer";
import FavoriteItem from "../components/UI/FavoriteItem/FavoriteItem";
import EmptyPage from "../components/UI/EmptyPage/EmptyPage";
import { useFavoritesContext } from "../contexts/FavoritesContext";

type FavoritesHeaderContent = {
  numberOfFavorites: number;
};

const FavoritesHeader = ({ numberOfFavorites }: FavoritesHeaderContent) => (
  <div className="flex justify-between items-start mb-4 md:mb-5">
    <p className="uppercase text-base font-medium leading-[120%] tracking-[1px] text-neutral-50">
      Pinned pairs
    </p>
    <p className="uppercase text-sm font-normal leading-[120%] tracking-[1px] text-neutral-200 mb-2.5">
      {numberOfFavorites} favorites
    </p>
  </div>
);

const Favorites = () => {
  const { favorites } = useFavoritesContext();
  const numberOfFavorites = favorites !== undefined ? favorites.length : 0;

  return (
    <TabsMenu variant="favorites">
      <DetailsContainer
        headerContent={
          <FavoritesHeader numberOfFavorites={numberOfFavorites} />
        }
      >
        {typeof favorites !== undefined &&
          favorites?.length !== 0 &&
          favorites?.map((item) => (
            <FavoriteItem
              key={item.id}
              firstCurrency={item.base}
              secondCurrency={item.quote}
              value={0}
              percentageValue={0}
            />
          ))}
        {typeof favorites === undefined ||
          (favorites?.length === 0 && (
            <EmptyPage
              title="No pinned pairs yet"
              content={
                <p>
                  Pin a pair to track its rate here. Tap the star <br />
                  icon on any conversion or comparison row.
                </p>
              }
            />
          ))}
      </DetailsContainer>
    </TabsMenu>
  );
};

export default Favorites;
