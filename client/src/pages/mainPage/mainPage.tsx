import FlowDescription from "@/pages/mainPage/FlowDescription/FlowDescription";
import styled, { keyframes } from "styled-components";
import BannerContainerPc from "./Banners/bannerContainerPc";
import BannerContainerMobile from "./Banners/bannerContainerMobile";
import AffiliatedCompanies from "./AffiliatedCompanies/AffiliatedCompanies";
import ClothesList from "./ClothesList/ClothesList";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router";
import { userInfoState } from "@/recoil/atom";
import { useRecoilValue } from "recoil";
import { getToken } from "@/utils/token";

export const MainPage = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const clickCollection = () => {
    if (!getToken()[1]) {
      setError("로그인이 필요합니다.");
      setOpen(true);
    } else if (userInfo?.role === "admin") {
      setError("관리자 계정으로는 수거신청이 불가능합니다.");
      setOpen(true);
    } else {
      navigate("/collection");
    }
  };
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // OAuth 토큰 저장
  const searchParamsToken = new URLSearchParams(window.location.search);
  const access = searchParamsToken.get("Authorization");

  const searchParamsId = new URLSearchParams(window.location.search);
  const refresh = searchParamsId.get("Refresh");

  const searchParamsName = new URLSearchParams(window.location.search);
  const roles = searchParamsName.get("roles");

  const searchParamsMemberId = new URLSearchParams(window.location.search);
  const memberId = searchParamsMemberId.get("memberId");

  useEffect(() => {
    if (access && refresh) {
      document.cookie = `authorization=${access}; path=/;`;
      document.cookie = `refresh=${refresh}; path=/;`;
      document.cookie = `id=${memberId}; path=/;`;
      document.cookie = `roles=${roles}; path=/;`;
      navigate("/");
    }
  }, []);

  return (
    <MainPageContainer>
      <MainContentContainer>
        <BannerContainer>
          <BannerContainerPc clickCollection={clickCollection} />
          <BannerContainerMobile clickCollection={clickCollection} />
        </BannerContainer>
        <ClothesList />
      </MainContentContainer>
      <FlowDescription />
      <AffiliatedCompanies />
      {open ? (
        <CustomAlert variant="filled" severity="error">
          {error}
        </CustomAlert>
      ) : (
        <></>
      )}
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
  width: 100%;
  @media (min-width: 768px) {
    justify-content: space-around;
    min-height: calc(100vh - 72px);
  }
`;
const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const slideFromTop = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;
const CustomAlert = styled(Alert)`
  position: absolute;
  top: 40px;
  border-radius: 99px !important;
  animation: ${slideFromTop} 1s ease;
  z-index: 9999;
`;
