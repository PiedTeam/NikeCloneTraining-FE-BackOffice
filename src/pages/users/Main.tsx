import { JSX } from "react";
import SideBar from "../../components/SideBar";
import { Outlet } from "react-router-dom";

const Main = (): JSX.Element => {
  return (
    <div className="relative flex">
      <SideBar />
      <Outlet />
    </div>
  );
};
export default Main;
