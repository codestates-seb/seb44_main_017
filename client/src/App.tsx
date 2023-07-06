import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductItem from "./components/Item_product/ProductItem";
import NotifyItem from "./components/Item_notify/NotifyItem";
import Comment from "./components/Comment/Comment";
import CustomPagination from "./components/Pagination/CustomPagination";
import CustomAutocomplete from "./components/Autocomplete/CustomAutocomplete";
import TitleBackground from "./components/TItleBackground/TitleBackground";

function App() {
  return (
    <Routes>
      <Route element={<Header />} path="/header" />
      <Route element={<Footer />} path="/footer" />
      <Route element={<NotifyItem />} path="/item_notify" />
      <Route element={<Comment />} path="/comment" />
      <Route element={<CustomAutocomplete />} path="/autocomplete" />
      <Route element={<CustomPagination />} path="/pagination" />
      <Route element={<TitleBackground />} path="/title_background" />
    </Routes>
  );
}

export default App;
