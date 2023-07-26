import { useLocation } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  background-color: var(--color-darkblue);
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 60px;
`;

export const ProfileImage = styled.img`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 6px solid var(--color-darkblue);
  border-radius: 100%;
  background-color: var(--color-white);
  position: relative;
  top: 30px;
  width: 150px;
  height: 150px;
  margin-top: 30px;

  @media (max-width: 767px) {
    display: none;
  }

  @media (min-width: 768px) and (max-width: 1120px) {
    display: none;
  }
`;

export const InfoBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px 100px;
  min-width: 500px;

  @media (max-width: 767px) {
    padding: 24px 0px;
    min-height: 64px;
    min-width: 0;
  }

  @media (min-width: 768px) and (max-width: 1120px) {
    padding: 40px 80px;
    min-height: 64px;
    min-width: 0;
  }
`;

export const ProfileInfo = styled.div`
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  gap: 8px;

  & .profile_username {
    font-size: var(--font-size-36);
    font-weight: var(--font-weight-500);

    @media (max-width: 767px) {
      font-size: var(--font-size-24);
    }

    @media (min-width: 768px) and (max-width: 1120px) {
      font-size: var(--font-size-24);
    }
  }

  & .mypage_title {
    color: var(--color-white);
    font-size: var(--font-size-36);
    font-weight: var(--font-weight-500);
  }
`;

export const PointInfo = styled.div`
  font-size: var(--font-size-20);
  font-weight: var(--font-weight-500);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  & .profile_point {
    color: var(--color-white);
    font-size: var(--font-size-16);
    font-weight: var(--font-weight-500);
  }
`;

export const NavBox = styled.nav`
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
  width: 150px;

  @media (max-width: 767px) {
    display: none;
  }

  @media (min-width: 768px) and (max-width: 1120px) {
    display: none;
  }
`;

export const NavButton = styled.a<{ path: string }>`
  color: var(--color-gray200);
  text-decoration: none;
  cursor: pointer;
  ${({ path }) => {
    const location = useLocation();
    return path === location.pathname
      ? `color: var(--color-darkblue);
      font-weight: var(--font-weight-700);
      border-bottom : 2px solid var(--color-darkblue)`
      : "";
  }}
`;
