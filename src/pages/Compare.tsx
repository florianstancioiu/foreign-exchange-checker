import Header from "../components/Header/Header";
import CheckRate from "../components/CheckRate/CheckRate";
import TabsMenu from "../components/TabsMenu/TabsMenu";

const Compare = () => {
  return (
    <>
      <Header />
      <main className="pb-10">
        <CheckRate />
        <TabsMenu variant="compare">
          <h1>Compare</h1>
        </TabsMenu>
      </main>
    </>
  );
};

export default Compare;
