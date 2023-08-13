import styled from "styled-components";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const SubTitleContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--color-darkblue);
  width: 100%;
  @media (max-width: 767px) {
    margin-bottom: 24px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-bottom: 36px;
  }
  @media (min-width: 1024px) {
    margin-bottom: 40px;
  }
`;
export const SubTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 12px;
`;
export const SubTitle = styled.div`
  color: white;
  @media (max-width: 767px) {
    font-size: 16px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 24px;
  }
  @media (min-width: 1024px) {
    font-size: 36px;
  }
`;
export const ProductsBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;
export const ProductsCarousel = styled.div`
  display: flex;
  flex-wrap: none;
  overflow: hidden;
  @media (max-width: 767px) {
    width: 294px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 660px;
  }
  @media (min-width: 1024px) {
    width: 972px;
  }
`;
export const Product = styled.div`
  display: flex;
  transition: all ease 1s;
  :hover {
    cursor: pointer;
  }
`;
export const ArrowLeftIcon = styled(BsChevronDoubleLeft)`
  color: white;
  margin-right: 16px;
  @media (max-width: 767px) {
    width: 24px;
    height: 24px;
    margin-right: 8px;
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
export const ArrowRightIcon = styled(BsChevronDoubleRight)`
  color: white;
  margin-left: 16px;
  @media (max-width: 767px) {
    width: 24px;
    height: 24px;
    margin-left: 8px;
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
  margin-bottom: 24px;
  @media (max-width: 767px) {
    margin-bottom: 16px;
    nav.last-button {
      margin-right: none;
    }
  }
`;
export const SelectBar = styled.div`
  width: 338px;
  display: flex;
  justify-content: flex-end;
  @media (min-width: 480px) and (max-width: 767px) {
    width: 468px;
    padding-right: 16px;
  }
`;
export const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 479px) {
    width: 342px;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 468px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 612px;
  }
  @media (min-width: 1024px) {
    width: 1100px;
  }
`;
export const CustomPaginationBox = styled.div`
  margin: 16px 0px;
`;
export const SearchBox = styled.div`
  @media (max-width: 479px) {
    width: 342px;
    margin-bottom: 16px;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 448px;
    margin-bottom: 16px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 632px;
    margin-bottom: 24px;
  }
  @media (min-width: 1024px) {
    width: 1084px;
    margin-bottom: 28px;
  }
`;
export const SearchIcon = styled(FiSearch)`
  width: 16px;
  height: 16px;
  position: absolute;
  right: 8px;
`;
export const EmptyProduct = styled.p`
  height: 30vh;
  color: var(--color-gray200);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  border: solid 1px;
  border-radius: 16px;
  @media (max-width: 479px) {
    width: 342px;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 468px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 612px;
  }
  @media (min-width: 1024px) {
    width: 1100px;
  }
`;
