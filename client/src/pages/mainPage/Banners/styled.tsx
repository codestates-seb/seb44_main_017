import styled from "styled-components";
import RecyclingIcon from "@mui/icons-material/Recycling";

export const MainPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 36px 0px;
  @media (max-width: 767px) {
    padding: 0px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 20px 0px;
  }
`;
export const BannerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  @media (max-width: 767px) {
    display: none;
  }
`;
export const TitleBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 64px 0px;
`;
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-top: 24px;
  }
`;
export const ImageBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const SubTitle = styled.span`
  color: var(--color-darkblue);
  font-size: var(--font-size-36);
  font-weight: var(--font-weight-700);
  @media (max-width: 599px) {
    color: var(--color-white);
    font-size: 20px;
  }
  @media (min-width: 600px) and (max-width: 767px) {
    color: var(--color-white);
    font-weight: var(--font-weight-500);
    font-size: var(--font-size-36);
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: var(--font-size-24);
  }
`;
export const MainTitle = styled.span`
  color: var(--color-darkgreen);
  font-size: var(--font-size-48);
  font-weight: var(--font-weight-700);
  @media (max-width: 599px) {
    color: var(--color-white);
    font-size: 32px;
  }
  @media (min-width: 600px) and (max-width: 767px) {
    color: var(--color-white);
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: var(--font-size-36);
  }
`;
export const RecycleIcon = styled(RecyclingIcon)`
  color: var(--color-darkgreen);
  font-size: 40px !important;
  @media (max-width: 767px) {
    color: var(--color-white);
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 32px !important;
  }
`;
export const Describe = styled.span`
  color: var(--color-darkblue);
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-700);
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: var(--font-size-12);
  }
`;
export const CollectionBtn = styled.button`
  width: 200px;
  color: var(--color-white);
  background-color: var(--color-darkblue);
  padding: 12px;
  border: 2px solid var(--color-darkblue);
  border-radius: 99px;
  margin-bottom: 16px;
  font-weight: var(--font-weight-700);
  @media (max-width: 767px) {
    width: 150px;
    color: var(--color-white);
    background-color: var(--color-black);
    border: 0;
    margin-top: 40px;
  }
`;
export const ShoppingBtn = styled.button`
  width: 200px;
  color: var(--color-darkblue);
  background-color: var(--color-white);
  padding: 12px;
  border: 2px solid var(--color-darkblue);
  border-radius: 99px;
  font-weight: var(--font-weight-700);
`;
export const ShoppingIamge = styled.img<{ src: string }>`
  width: 300px;
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 200px;
  }
`;
export const AnalzyImage = styled.img<{ src: string }>`
  width: 392px;
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 300px;
  }
`;
export const OnlineShoppingIamge = styled.img<{ src: string }>`
  width: 300px;
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 300px;
  }
`;
export const SendClothesIamge = styled.img<{ src: string }>`
  width: 300px;
  @media (max-width: 1023px) {
    display: none;
  }
`;
// Mobile Banner
export const BannerContainerMobile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    display: none;
  }
`;
export const TitleContainerMobile = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
`;
export const MobileBannerImage = styled.img<{ src: string }>`
  width: 100%;
  @media (min-width: 600px) {
    width: 100%;
    height: 40vh;
  }
`;
