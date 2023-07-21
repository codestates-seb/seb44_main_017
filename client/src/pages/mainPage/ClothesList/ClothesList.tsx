import { useEffect, useState } from "react";
import * as S from "./styled";
import axios from "axios";
import ProductItem from "@/components/Item_product/ProductItem";
import FadeIn from "@/components/FadeIn/FadeIn";
import { useNavigate } from "react-router";
import { BASE_URL, IMG_URL } from "@/constants/constants";

interface Data {
  imageLink: string;
  isSell: boolean;
  productlike: boolean;
  name: string;
  price: string;
  productId: number;
}
const ClothesList = () => {
  const navigate = useNavigate();
  const [clothesList, setClothesList] = useState<Data[]>([]);
  const products = clothesList.map((data, idx) => {
    return (
      <ProductItem
        key={`product_${idx}`}
        url={`${IMG_URL}/${data.imageLink}`}
        isSell={false}
        like={data.productlike}
        title={data.name}
        price={data.price}
        productId={data.productId}
      />
    );
  });
  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `${BASE_URL}/products?page=1&size=12&sort=newest&issell=false`,
        });
        setClothesList(res.data.data);
      } catch (err) {
        console.error("Error getting clothes list", err);
      }
    })();
  }, []);
  return (
    <S.Container>
      <S.ContainerPC>
        <FadeIn index={3}>
          <S.UppserListContainer>{products}</S.UppserListContainer>
        </FadeIn>
        <FadeIn index={3}>
          <S.LowerListContainer>{products}</S.LowerListContainer>
        </FadeIn>
      </S.ContainerPC>
      <S.ContainerMobile>
        <S.UppserListContainer>
          {clothesList.length ? (
            products
          ) : (
            <S.EmptyList>상품 정보가 없습니다.</S.EmptyList>
          )}
        </S.UppserListContainer>
      </S.ContainerMobile>
      <S.ListpageBtn
        onClick={() => {
          navigate("/productlist/");
        }}
      >
        상품 전체 보기
      </S.ListpageBtn>
    </S.Container>
  );
};

export default ClothesList;
