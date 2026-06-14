import Header from "../components/Header/Header";
import CheckRate from "../components/CheckRate/CheckRate";
import TabsMenu from "../components/TabsMenu/TabsMenu";

const Favorites = () => {
  return (
    <>
      <Header />
      <main className="pb-10">
        <CheckRate />
        <TabsMenu variant="favorites">
          <h1>Favorites</h1>
        </TabsMenu>
      </main>
    </>
  );
};

export default Favorites;
