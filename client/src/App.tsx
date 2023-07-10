import "./App.css";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage/mainPage";
import { NoticePage } from "./pages/noticePage/noticePage";
import { ProductInfoPage } from "./pages/productInfoPage/productInfoPage";
import { ProductListPage } from "./pages/productListPage/productListPage";

function App() {
  return (
    <Routes>
      <Route element={<MainPage />} path="/" />
      <Route element={<NoticePage />} path="/notice" />
      <Route element={<ProductInfoPage />} path="/productinfo" />
      <Route element={<ProductListPage />} path="/productlist" />
    </Routes>
  );
}

export default App;
