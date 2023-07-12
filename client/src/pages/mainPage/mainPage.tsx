import * as S from "./styled";
import BannerContainerPc from "./bannerContainerPc";
import BannerContainerMobile from "./bannerContainerMobile";
import { useEffect, useState } from "react";
import axios from "axios";
export const MainPage = () => {
  const [clothesList, setClothesList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        // const res = await axios({
        //   method: "GET",
        //   url: "http://ec2-43-200-107-103.ap-northeast-2.compute.amazonaws.com:8080/products?page=1&size=10&sort=newest",
        // });
        // console.log(res);
      } catch (err) {
        console.error("Error getting clothes list", err);
      }
    })();
  }, []);
  return (
    <S.MainPageContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          width: "100%",
        }}
      >
        <BannerContainerPc />
        <BannerContainerMobile />
        <div>의류 리스트</div>
      </div>
      <S.FlowConatiner>flow 소개</S.FlowConatiner>
      <div>협력업체 소개</div>
    </S.MainPageContainer>
  );
};
