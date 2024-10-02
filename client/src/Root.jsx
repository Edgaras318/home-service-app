import Topbar from "@/components/topbar/Topbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Topbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
