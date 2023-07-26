import styled from "styled-components";
import { BsEye } from "react-icons/bs";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Title = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 36px 0px 0px 0px;
  max-width: 1200px;
  width: 90%;
  font-size: 36px;
  @media (max-width: 767px) {
    font-size: 16px;
    margin-bottom: 8px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-bottom: 24px;
  }
  @media (min-width: 1024px) {
    margin-bottom: 36px;
  }
`;
export const InfoBox = styled.div`
  display: flex;
  max-width: 1200px;
  width: 80%;
  justify-content: flex-end;
  margin-bottom: 16px;
  color: #727272;
  font-size: 16px;
  @media (max-width: 767px) {
    font-size: 8px;
    margin-bottom: 8px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
  }
  @media (min-width: 1024px) {
  }
`;
export const Info = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

export const ContentBox = styled.div`
  max-width: 1200px;
  min-height: 512px;
  width: 80%;
  padding: 16px 20px;
  border-top: 3px solid var(--color-black);
  font-size: 16px;
  position: relative;
  @media (max-width: 767px) {
    font-size: 12px;
    margin-bottom: 8px;
  }
`;
export const MoveBox = styled.div`
  display: flex;
  max-width: 1200px;
  width: 80%;
  border-top: 1px solid #727272;
  border-bottom: 1px solid #727272;
  padding: 28px;
  font-size: 16px;
  @media (max-width: 767px) {
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
  }
  @media (min-width: 1024px) {
  }
`;
export const NoticeMove = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-right: 48px;
  @media (max-width: 767px) {
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
  }
  @media (min-width: 1024px) {
  }
`;
export const NoticeMoveTitle = styled.div`
  font-size: 16px;
  @media (max-width: 767px) {
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
  }
  @media (min-width: 1024px) {
  }
`;
export const NoticeMoveDate = styled.div`
  font-size: 16px;
  margin-left: auto;
  @media (max-width: 767px) {
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
  }
  @media (min-width: 1024px) {
  }
`;
export const NoneNotice = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1200px;
  width: 80%;
  border-top: 1px solid #727272;
  border-bottom: 1px solid #727272;
  padding: 28px;
  font-size: 16px;
  color: #727272;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`;
export const ListButton = styled.button`
  border-radius: 16px;
  width: 96px;
  height: 32px;
  font-weight: var(--font-weight-700);
  font-size: var(--font-size-12);
  border: 2px solid var(--color-darkblue);
  background-color: var(--color-white);
  color: var(--color-darkblue);
  margin-bottom: 32px;

  &:hover {
    background-color: var(--color-darkblue);
    color: var(--color-white);
  }
`;
export const ViewIcon = styled(BsEye)`
  width: 30px;
  height: 20px;
`;
export const SpeedDialContainer = styled.div`
  position: absolute;

  @media (max-width: 767px) {
    bottom: 16px;
    right: 0px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    bottom: 36px;
    right: 0px;
  }
  @media (min-width: 1024px) {
    bottom: 48px;
    right: -72px;
  }
`;
