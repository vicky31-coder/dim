import type { PropsWithChildren } from "react";

import Header from "../Components/Header/Index";
// import Sidebar from "../Components/Sidebar/Index";

const MainLayout = (props: PropsWithChildren<{}>) => (
  <>
    <Header />
    {/* <Sidebar /> */}

    <main className="full">{props.children}</main>
  </>
);

export default MainLayout;
