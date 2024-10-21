import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.scss";

const rootElement = document.getElementById("root")!; // Use the non-null assertion operator

createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>
);
