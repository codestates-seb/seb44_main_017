import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ContainerPC = styled.div`
  display: none;
  @media (min-width: 767px) {
    display: flex;
    overflow: hidden;
    width: 100%;
  }
`;
export const ContainerMobile = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    width: 100%;
    margin-top: 36px;
  }
`;
export const UppserListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1px;
  @media (max-width: 767px) {
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
export const ListpageBtn = styled.button`
  background-color: var(--color-white);
  padding: 12px;
  border: 2px solid var(--color-gray100);
  margin-top: 16px;
  @media (max-width: 534px) {
    width: 340px;
  }
  @media (min-width: 535px) and (max-width: 713px) {
    width: 514px;
  }
  @media (min-width: 714px) and (max-width: 767px) {
    width: 692px;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
