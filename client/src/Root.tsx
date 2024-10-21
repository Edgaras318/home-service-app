// Root.tsx
import Topbar from "@/components/Topbar/Topbar";
import { Outlet } from "react-router-dom";
import React from "react"; // Import React for type inference

const Root: React.FC = () => {
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
