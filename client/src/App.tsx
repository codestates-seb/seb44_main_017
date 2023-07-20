import "./App.css";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage/mainPage";
import { NoticePage } from "./pages/noticePage/noticePage";
import { ProductInfoPage } from "./pages/productInfoPage/productInfoPage";
import { ProductListPage } from "./pages/productListPage/productListPage";
import CollectionPage from "./pages/collectionPage/collectionPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import QnaListPage from "./pages/qnaListPage/qnaListPage";
import QnaDetailPage from "./pages/qnaDetailPage/qnaDetailPage";
import styled from "styled-components";
import MyproductsPage from "./pages/myproductsPage/myproductsPage";
import MyQnaPage from "./pages/myQnaPage/myQnaPage";
import ManageProductsPage from "./pages/adminpage/manageProductsPage/manageProductsPage";
import ManageUserPage from "./pages/adminpage/manageUserPage/manageUserPage";
import ManageApprovalPage from "./pages/adminpage/manageApproval/manageApprovalPage";
import MyinfoPage from "./pages/myinfoPage/myinfoPage";
import ShoppingCartPage from "./pages/shoppingCartPage/shoppingCartPage";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <AppContainer>
          <Header />
          <Routes>
            <Route element={<MainPage />} path="/" />
            <Route element={<NoticePage />} path="/notice" />
            <Route element={<ProductInfoPage />} path="/products/:productsID" />
            <Route element={<ProductListPage />} path="/productlist" />
            <Route element={<CollectionPage />} path="/collection" />
            <Route element={<QnaListPage />} path="/questions" />
            <Route element={<QnaDetailPage />} path="/questions/:questionId" />
            <Route element={<MyproductsPage />} path="/mypage" />
            <Route element={<MyQnaPage />} path="/mypage/posts" />
            <Route element={<ManageProductsPage />} path="admin/products" />
            <Route element={<ManageUserPage />} path="admin/users" />
            <Route element={<ManageApprovalPage />} path="admin/approval" />
            <Route element={<MyinfoPage />} path="/mypage/info" />
            <Route element={<ShoppingCartPage />} path="/cart" />
            <Route
            element={<NoticeDetailPage />}
            path="/notice/detail/:boardId"
          />
          </Routes>
        </AppContainer>
        <Footer />
      </RecoilRoot>
    </>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
