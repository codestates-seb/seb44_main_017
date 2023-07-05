import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Header from "./components/Header/Header.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import NotifyItem from "./components/Item_notify/NotifyItem.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
    <NotifyItem />
  </BrowserRouter>
);
