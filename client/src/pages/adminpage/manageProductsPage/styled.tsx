import { Divider } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ContentConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 0;
`;
export const SubTitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
export const ProductsContainer = styled.div`
  display: flex;
  width: 880px;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-bottom: 36px;
  @media (max-width: 479px) {
    width: 342px;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 468px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 612px;
  }
`;
export const EmptyList = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 880px;
  height: 40vh;
  border: 1px dashed var(--color-gray100);
  border-radius: 16px;
  margin-bottom: 36px;
  color: var(--color-gray200);
  @media (max-width: 479px) {
    width: 342px;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 468px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 612px;
  }
`;
export const Title = styled.span`
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-700);
  margin-left: 8px;
`;
export const SelectBoxContainer = styled.div`
  margin-right: 8px;
`;
export const CustomDivider = styled(Divider)`
  display: flex;
  width: calc(100% - 16px);
  height: 2px;
  color: black;
  margin: 16px 0px !important;
`;
