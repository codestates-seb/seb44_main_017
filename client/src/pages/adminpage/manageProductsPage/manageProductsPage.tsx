import axios from "axios";
import styled from "styled-components";
import { Divider } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import SelectBox from "@/components/SelectBox/SelectBox";
import { BASE_URL, IMG_URL } from "@/constants/constants";
import SubTitleBar from "@/components/SubTItleBar/SubTitleBar";
import ProductItem from "@/components/Item_product/ProductItem";
import CustomPagination from "@/components/Pagination/CustomPagination";

interface Product {
  image_link: string;
  productlike: boolean;
  name: string;
  price: string;
  product_id: string | number;
}
const options = [
  "최신순",
  "오래된순",
  "좋아요순",
  "조회수순",
  "가격낮은순",
  "가격높은순",
];

const ManageProductsPage = () => {
  const {} = useParams();
  const [clothesList, setClothesList] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState("newest");
  const products = clothesList.map((product, idx) => {
    return (
      <ProductItem
        key={`product_${idx}`}
        url={`${IMG_URL}/${product.image_link}`}
        isSell={false}
        like={product.productlike}
        title={product.name}
        price={product.price}
        product_id={product.product_id}
      />
    );
  });
  useEffect(() => {
    (async () => {
      try {
        const list = await axios.get(
          `${BASE_URL}/products?page=${page}&size=24&sort=${filter}&issell=false`
        );
        setClothesList(list.data.data);
        setTotalPage(list.data.pageInfo.totalPages);
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("Error getting clothes list", err);
      }
    })();
  }, [filter, page]);
  return (
    <Container>
      <SubTitleBar title="상품 관리" isButton={false} />
      <ContentConatiner>
        <SubTitleContainer>
          <Title>상품 관리</Title>
          <SelectBox usage={"정렬"} options={options} setOption={setFilter} />
        </SubTitleContainer>
        <CustomDivider />
        {clothesList.length ? (
          <ProductsContainer>{products}</ProductsContainer>
        ) : (
          <EmptyList>리스트가 비어있습니다.</EmptyList>
        )}
        <CustomPagination pageCount={totalPage} page={page} setPage={setPage} />
      </ContentConatiner>
    </Container>
  );
};

export default ManageProductsPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContentConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 880px;
  padding: 56px 0;
`;
const SubTitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  margin-bottom: 36px;
`;
const EmptyList = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
  border: 1px dashed var(--color-gray100);
  border-radius: 16px;
  margin-bottom: 36px;
  color: var(--color-gray200);
`;
const Title = styled.span`
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-700);
`;
const CustomDivider = styled(Divider)`
  height: 2px;
  color: black;
  width: 100%;
  margin: 16px 0px !important;
`;
