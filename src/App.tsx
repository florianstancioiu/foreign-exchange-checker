import Header from "./components/Header/Header";
import CheckRate from "./components/CheckRate/CheckRate";
import TabsMenu from "./components/TabsMenu/TabsMenu";
import StatsItem from "./components/UI/StatsItem/StatsItem";
import ChevronDownSvg from "./images/icon-chevron-down.svg?react";

const App = () => {
  return (
    <>
      <Header />
      <main className="pb-10">
        <CheckRate />
        <TabsMenu variant="history">
          <div className="grid grid-cols-2 gap-2.5">
            <StatsItem title="Open" value={0.8516} />
            <StatsItem title="Last" value={0.853} />
            <StatsItem
              title="Change"
              value={<p className="text-green-500">+0.0014</p>}
            />
            <StatsItem
              title="% Change"
              value={
                <p className="text-green-500 flex items-center">
                  <ChevronDownSvg className="rotate-180 size-6" />{" "}
                  <span>+0.16%</span>
                </p>
              }
            />
          </div>
        </TabsMenu>
      </main>
    </>
  );
};

export default App;
