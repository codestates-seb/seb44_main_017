import styled from "styled-components";

export const SubTitleContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--color-gray100);
  @media (max-width: 767px) {
    padding: 48px 40px 48px 40px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 40px 48px 56px 48px;
  }
  @media (min-width: 1024px) {
    padding: 40px 320px 62px 320px;
  }
`;
export const SubTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
export const SubTitle = styled.div`
  font-weight: var(--font-weight-700);
  @media (max-width: 767px) {
    font-size: 24px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 36px;
  }
  @media (min-width: 1024px) {
    font-size: 48px;
  }
`;
export const SubTitleLogo = styled.img`
  margin: 0px 16px 0px 4px;
  @media (max-width: 767px) {
    width: 24px;
    height: 24px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 36px;
    height: 36px;
  }
  @media (min-width: 1024px) {
    width: 40px;
    height: 40px;
  }
`;
export const ProductsBox = styled.div`
  display: flex;
  align-items: center;
`;
export const ProductsCarousel = styled.div`
  display: flex;
  flex-wrap: none;
  overflow: hidden;
  @media (max-width: 767px) {
    width: 234px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 740px;
  }
  @media (min-width: 1024px) {
    width: 1024px;
  }
`;
export const Product = styled.div`
  display: flex;
  transition: 0.5s;
  :hover {
    cursor: pointer;
  }
`;
export const ArrowLeftIcon = styled.img`
  color: var(--color-darkblue);
  margin-right: 16px;
  @media (max-width: 767px) {
    width: 24px;
    height: 24px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 36px;
    height: 36px;
  }
  @media (min-width: 1024px) {
    width: 48px;
    height: 48px;
  }
  &:hover {
    cursor: pointer;
  }
`;
export const ArrowRightIcon = styled.img`
  color: var(--color-darkblue);
  margin-left: 16px;
  @media (max-width: 767px) {
    width: 24px;
    height: 24px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 36px;
    height: 36px;
  }
  @media (min-width: 1024px) {
    width: 48px;
    height: 48px;
  }
  &:hover {
    cursor: pointer;
  }
`;
export const CategoryBar = styled.nav`
  display: flex;
  justify-content: center;
  @media (max-width: 767px) {
    margin-top: 24px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-top: 36px;
  }
  @media (min-width: 1024px) {
    margin-top: 40px;
  }
`;
export const SelectBar = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 767px) {
    padding: 0px 40px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 0px 48px;
  }
  @media (min-width: 1024px) {
    padding: 0px 320px;
  }
`;
export const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    padding: 0px 40px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 0px 48px;
  }
  @media (min-width: 1024px) {
    padding: 0px 320px;
  }
`;
export const Url = styled.a`
  text-decoration: none;
  color: var(--color-black);
`;
