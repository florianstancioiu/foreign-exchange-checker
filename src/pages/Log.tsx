import Header from "../components/Header/Header";
import CheckRate from "../components/CheckRate/CheckRate";
import TabsMenu from "../components/TabsMenu/TabsMenu";

const Log = () => {
  return (
    <>
      <Header />
      <main className="pb-10">
        <CheckRate />
        <TabsMenu variant="log">
          <h1>Log</h1>
        </TabsMenu>
      </main>
    </>
  );
};

export default Log;
