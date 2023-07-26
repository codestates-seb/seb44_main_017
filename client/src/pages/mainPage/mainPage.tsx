import FlowDescription from "@/pages/mainPage/FlowDescription/FlowDescription";
import styled from "styled-components";
import BannerContainerPc from "./Banners/bannerContainerPc";
import BannerContainerMobile from "./Banners/bannerContainerMobile";
import AffiliatedCompanies from "./AffiliatedCompanies/AffiliatedCompanies";
import ClothesList from "./ClothesList/ClothesList";

export const MainPage = () => {
  return (
    <MainPageContainer>
      <MainContentContainer>
        <BannerContainer>
          <BannerContainerPc />
          <BannerContainerMobile />
        </BannerContainer>
        <ClothesList />
      </MainContentContainer>
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
  @media (max-width: 767px) {
    padding: 0px;
  }
`;
const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  min-height: calc(100vh - 72px);
`;
const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
