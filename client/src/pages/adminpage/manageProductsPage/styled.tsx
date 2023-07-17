import { Divider } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  @media (max-width:467px) {
  }
`;
export const ContentConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 880px;
  padding: 56px 0;
`;
export const SubTitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
export const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  margin-bottom: 36px;
`;
export const EmptyList = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
  border: 1px dashed var(--color-gray100);
  border-radius: 16px;
  margin-bottom: 36px;
  color: var(--color-gray200);
`;
export const Title = styled.span`
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-700);
  margin-left: 20px;
`;
export const SelectBoxContainer = styled.div`
    margin-right: 20px;
`
export const CustomDivider = styled(Divider)`
  display: flex;
  width: 100%;
  height: 2px;
  color: black;
  margin: 16px 0px !important;
`;
