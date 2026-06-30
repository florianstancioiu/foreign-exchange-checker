import TabsMenu from "../../components/TabsMenu/TabsMenu";
import DetailsContainer from "../../components/UI/DetailsContainer/DetailsContainer";
import FavoriteItem from "../../components/UI/FavoriteItem/FavoriteItem";
import EmptyPage from "../../components/UI/EmptyPage/EmptyPage";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import FavoritesHeaderContent from "./FavoritesHeaderContent";

const Favorites = () => {
  const { favorites } = useFavoritesContext();
  const numberOfFavorites = favorites !== undefined ? favorites.length : 0;

  return (
    <TabsMenu variant="favorites">
      <DetailsContainer
        headerContent={
          <FavoritesHeaderContent numberOfFavorites={numberOfFavorites} />
        }
      >
        {favorites !== undefined &&
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
        {favorites === undefined ||
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
