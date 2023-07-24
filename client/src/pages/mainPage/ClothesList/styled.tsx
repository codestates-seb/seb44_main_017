import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ContainerPC = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    overflow: hidden;
    width: 100%;
  }
`;
export const ContainerMobile = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  margin-top: 36px;
  @media (max-width: 479px) {
    width: 342px;
  }
  @media (min-width: 480px) and (max-width: 639px) {
    width: 468px;
  }
  @media (min-width: 640px) and (max-width: 767px) {
    width: 624px;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
export const ClothesListContainer = styled.div`
  display: flex;
`;
export const UppserListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 767px) {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  @media (min-width: 768px) {
    animation: loop 100s linear infinite;
  }
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
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) {
    animation: loop 100s linear infinite;
  }
  @keyframes loop {
    100% {
      transform: translateX(-100%);
    }
  }
`;
export const BtnContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
export const EmptyList = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30vh;
  color: var(--color-gray200);
  border: 1px dashed var(--color-gray200);
  border-radius: 16px;
  @media (max-width: 479px) {
    width: 452px;
  }
  @media (min-width: 480px) and (max-width: 639px) {
    width: 514px;
  }
  @media (min-width: 640px) and (max-width: 767px) {
    width: 608px;
  }
`;
export const ListpageBtn = styled.button`
  background-color: var(--color-white);
  padding: 12px;
  border: 2px solid var(--color-gray100);
  margin-top: 16px;
  @media (max-width: 479px) {
    width: 326px;
  }
  @media (min-width: 480px) and (max-width: 639px) {
    width: 452px;
  }
  @media (min-width: 640px) and (max-width: 767px) {
    width: 608px;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
