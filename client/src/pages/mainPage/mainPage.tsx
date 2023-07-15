import axios from "axios";
import { useEffect, useState } from "react";
import FlowDescription from "@/pages/mainPage/FlowDescription/FlowDescription";
import styled from "styled-components";
import { BASE_URL } from "@/constants/constants";
import BannerContainerPc from "./Banners/bannerContainerPc";
import BannerContainerMobile from "./Banners/bannerContainerMobile";
import AffiliatedCompanies from "./AffiliatedCompanies/AffiliatedCompanies";

export const MainPage = () => {
  const [clothesList, setClothesList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        // const res = await axios({
        //   method: "GET",
        // url: `${BASE_URL}/products?page=1&size=10&sort=newest`,
        // });
        // console.log(res);
      } catch (err) {
        console.error("Error getting clothes list", err);
      }
    })();
  }, []);
  return (
    <MainPageContainer>
      <BannerContainer>
        <BannerContainerPc />
        <BannerContainerMobile />
      </BannerContainer>
      <FlowDescription />
      <AffiliatedCompanies />
    </MainPageContainer>
  );
};

const MainPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 56px 0px;
  @media (max-width: 767px) {
    padding: 0px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 36px 0px;
  }
`;
const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
