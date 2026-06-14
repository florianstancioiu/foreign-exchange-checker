import Header from "../../components/Header/Header";
import CheckRate from "../../components/CheckRate/CheckRate";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="pb-10">
        <CheckRate />
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
