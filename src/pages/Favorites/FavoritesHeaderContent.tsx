type FavoritesHeaderContent = {
  numberOfFavorites: number;
};

const FavoritesHeaderContent = ({
  numberOfFavorites,
}: FavoritesHeaderContent) => (
  <div className="flex justify-between items-start mb-4 md:mb-5">
    <p className="uppercase text-base font-medium leading-[120%] tracking-[1px] text-neutral-50 light:text-neutral-900">
      Pinned pairs
    </p>
    <p className="uppercase text-sm font-normal leading-[120%] tracking-[1px] text-neutral-200 mb-2.5 light:text-neutral-700">
      {numberOfFavorites} favorites
    </p>
  </div>
);

export default FavoritesHeaderContent;
