import styled from "styled-components";

export const FlowConatiner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 100px;
  padding: 56px 0px 100px 0px;
  background-color: var(--color-gray100);
  @media (max-width: 767px) {
    padding: 36px 0px 72px 0px;
    margin-top: 56px;
    align-items: flex-start;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 40px 0px;
  }
`;
export const MobileScrollContainer = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
  }
`;
export const CardContainer = styled.div`
  display: flex;
  margin-top: 56px;
  @media (max-width: 767px) {
    width: 100%;
    overflow: scroll;
    margin-top: 20px;
    &::-webkit-scrollbar {
      scrollbar-width: none;
      display: none;
    }
  }
  @media (max-width: 479px) {
    padding: 16px 56px;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 16px 120px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-top: 40px;
  }
  @media (min-width: 768px) and (max-width: 1229px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const UpperContainer = styled.div`
  display: flex;
`;
export const lowwerContainer = styled.div`
  display: flex;
  @media (min-width: 768px) and (max-width: 1229px) {
    margin-top: 16px;
  }
`;
export const FlowCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  border-radius: 16px;
  padding: 40px 16px;
  margin: 0 8px;
  box-shadow: 5px 8px 5px gray;
  background-color: var(--color-darkblue);
  &:hover {
    transform: translateY(-8px);
    transition: transform 3s ease;
    box-shadow: 8px 16px 5px gray;
  }
  @media (max-width: 767px) {
    padding: 20px 12px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 24px 16px;
  }
`;
export const Title = styled.p`
  text-align: center;
  width: 100%;
  font-size: 32px;
  font-weight: var(--font-weight-700);
  @media (max-width: 479px) {
    font-size: 20px;
  }
  @media (min-width: 480px) and (max-width: 1023px) {
    font-size: var(--font-size-24);
  }
`;
export const FlowImage = styled.img<{ src: string }>`
  width: 177px;
  margin-bottom: 24px;
  @media (max-width: 1023px) {
    width: 140px;
  }
`;
export const FlowDescirbe = styled.p`
  text-align: center;
  color: var(--color-white);
  font-size: var(--font-size-16);
  line-height: 1.5;
`;
export const Highlight = styled.span`
  color: var(--color-orange);
  font-weight: var(--font-weight-700);
`;
