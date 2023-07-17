import "./App.css";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage/mainPage";
import NoticePage from "./pages/noticePage/noticePage";
import { ProductInfoPage } from "./pages/productInfoPage/productInfoPage";
import { ProductListPage } from "./pages/productListPage/productListPage";
import CollectionPage from "./pages/collectionPage/collectionPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import QnaListPage from "./pages/qnaListPage/qnaListPage";
import QnaDetailPage from "./pages/qnaDetailPage/qnaDetailPage";
import styled from "styled-components";
import MyproductsPage from "./pages/myproductsPage/myproductsPage";
import MyinfoPage from "./pages/myinfoPage/myinfoPage";

function App() {
  return (
    <>
      <AppContainer>
        <Header />
        <Routes>
          <Route element={<MainPage />} path="/" />
          <Route element={<NoticePage />} path="/notice" />
          <Route element={<ProductInfoPage />} path="/productinfo" />
          <Route element={<ProductListPage />} path="/productlist" />
          <Route element={<CollectionPage />} path="/collection" />
          <Route element={<QnaListPage />} path="/questions" />
          <Route element={<QnaDetailPage />} path="/questions/:questionId" />
          <Route element={<MyproductsPage />} path="/mypage" />
          <Route element={<MyinfoPage />} path="/mypage/info" />
        </Routes>
      </AppContainer>
      <Footer />
    </>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
