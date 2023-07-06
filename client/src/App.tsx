import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/Modal_login/LoginModal";
import SignupModal from "./components/Modal_signup/SignupModal";
import ProductItem from "./components/Item_product/ProductItem";
import NotifyItem from "./components/Item_notify/NotifyItem";
import Comment from "./components/Comment/Comment";
import CustomPagination from "./components/Pagination/CustomPagination";
import CustomAutocomplete from "./components/Autocomplete/CustomAutocomplete";
import TitleBackground from "./components/TItleBackground/TitleBackground";
import SelectBox from "./components/SelectBox/SelectBox";

function App() {
  return (
    <Routes>
      <Route element={<Header />} path="/header" />
      <Route element={<Footer />} path="/footer" />
      <Route element={<LoginModal />} path="/modal_login" />
      <Route element={<SignupModal />} path="/modal_signup" />
      <Route element={<ProductItem />} path="/item_product" />
      <Route element={<NotifyItem />} path="/item_notify" />
      <Route element={<Comment />} path="/comment" />
      <Route element={<CustomAutocomplete />} path="/autocomplete" />
      <Route element={<CustomPagination />} path="/pagination" />
      <Route element={<TitleBackground />} path="/title_background" />
      <Route element={<SelectBox />} path="/select_box" />
    </Routes>
  );
}

export default App;
