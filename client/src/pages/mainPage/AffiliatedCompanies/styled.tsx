import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 160px 0px 200px 0px;
  @media (max-width: 479px) {
    padding: 100px 0px 160px 0px;
  }
`;
export const UpperContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100vw;
  margin-top: 64px;
  @media (max-width: 479px) {
    margin-top: 40px;
  }
`;
export const LowerContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100vw;
  margin-top: 16px;
`;
export const UppserListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1px;
  animation: loop 30s linear infinite;
  @keyframes loop {
    100% {
      transform: translateX(-100%);
    }
  }
`;
export const LowerListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1px;
  animation: loop 40s linear infinite;
  @keyframes loop {
    100% {
      transform: translateX(-100%);
    }
  }
`;
export const Title = styled.p`
  text-align: center;
  font-size: 32px;
  font-weight: var(--font-weight-700);
  @media (max-width: 479px) {
    font-size: 20px;
  }
  @media (min-width: 480px) and (max-width: 1023px) {
    font-size: var(--font-size-24);
  }
`;
export const SubTitle = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: var(--font-weight-700);
  margin-top: 16px;
  @media (max-width: 479px) {
    font-size: 12px;
  }
  @media (min-width: 480px) and (max-width: 1023px) {
    font-size: var(--font-size-16);
  }
`;
export const ImageContainer = styled.div`
  width: 200px;
  padding: 16px 32px;
  margin: 0 8px;
  border: 1px solid var(--color-gray100);
  border-radius: 16px;
  cursor: pointer;
  @media (max-width: 479px) {
    width: 140px;
  }
`;
export const CompanyImage = styled.img<{ src: string }>`
  width: 100%;
`;
