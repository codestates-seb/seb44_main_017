import { useLocation } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: var(--color-darkblue);
  justify-content: center;
  align-items: center;
`;
export const SubTitleBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px 140px;
  @media (max-width: 767px) {
    padding: 24px 0px;
    min-height: 64px;
  }
  @media (min-width: 768px) and (max-width: 1120px) {
    padding: 40px 80px;
    min-height: 64px;
  }
`;
export const AdmitButtonContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 300px;
  background-color: var(--color-white);
  margin-bottom: -200px;
  padding: 16px 20px;
  border-radius: 99px;
  @media (max-width: 767px) {
    margin-bottom: -128px;
  }
  @media (min-width: 768px) and (max-width: 1120px) {
    margin-bottom: -152px;
  }
`;
export const Spacing = styled.div`
  width: 350px;
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1120px) {
    display: none;
  }
`;
export const SubTitleImage = styled.img<{ src: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 350px;
  margin-bottom: -36px;
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1120px) {
    display: none;
  }
`;
export const SubTitle = styled.span`
  color: var(--color-white);
  font-size: var(--font-size-36);
  font-weight: var(--font-weight-500);
  @media (max-width: 767px) {
    font-size: var(--font-size-24);
  }
  @media (min-width: 768px) and (max-width: 1120px) {
    font-size: var(--font-size-24);
  }
`;
export const SubTitleButton = styled.a`
  position: absolute;
  background-color: var(--color-white);
  border: 0;
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-700);
  padding: 12px 40px;
  color: var(--color-darkblue);
  border-radius: 99px;
  margin-bottom: -200px;
  @media (max-width: 767px) {
    font-size: var(--font-size-12);
    margin-bottom: -116px;
    padding: 12px 20px;
  }
  @media (min-width: 768px) and (max-width: 1120px) {
    margin-bottom: -152px;
  }
`;
export const NavButton = styled.a<{ href: string }>`
  color: var(--color-gray200);
  text-decoration: none;
  ${({ href }) => {
    const location = useLocation();
    return href === location.pathname
      ? `color: var(--color-darkblue);
      font-weight: var(--font-weight-700);
      border-bottom : 2px solid var(--color-darkblue)`
      : "";
  }}
`;
