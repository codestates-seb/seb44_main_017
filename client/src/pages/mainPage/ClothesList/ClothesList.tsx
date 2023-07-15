import { useEffect, useState } from "react";
import * as S from "./styled";
import axios from "axios";
import ProductItem from "@/components/Item_product/ProductItem";
import FadeIn from "@/components/FadeIn/FadeIn";
import { useNavigate } from "react-router";
import { IMG_URL } from "@/constants/constants";

interface Data {
  image_link: string;
  isSell: boolean;
  productlike: boolean;
  name: string;
  price: string;
  product_id: number;
}
const ClothesList = () => {
  const navigate = useNavigate();
  const [clothesList, setClothesList] = useState<Data[]>([]);
  const products = clothesList.map((data, idx) => {
    return (
      <ProductItem
        key={`product_${idx}`}
        url={`${IMG_URL}/${data.image_link}`}
        isSell={false}
        like={data.productlike}
        title={data.name}
        price={data.price}
        product_id={data.product_id}
      />
    );
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `http://ec2-43-200-107-103.ap-northeast-2.compute.amazonaws.com:8080/products?page=1&size=12&sort=newest&issell=false`,
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
        <S.UppserListContainer>{products}</S.UppserListContainer>
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
