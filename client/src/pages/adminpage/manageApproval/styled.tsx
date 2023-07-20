import { Divider } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 56px;
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 56px 0px;
`;
export const TableNameContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
`;
export const ProductListContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;
export const Title = styled.p`
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-700);
`;
export const TableName = styled.span<{ name: string }>`
  text-align: center;
  width: 150px;
  @media (max-width: 940px) {
    width: 70px;
    display: ${(props) =>
      props.name === "email" || props.name === "phone" ? "none" : ""};
  }
`;
export const EmptyList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  margin-top: 16px;
  border: 1px dashed var(--color-gray200);
  border-radius: 16px;
`;
export const EmptyContent = styled.p`
    color: gray;
`
export const CustomDivider = styled(Divider)`
  border-bottom-width: 2px !important;
  width: 100%;
  margin-top: 16px !important;
  background-color: black;
`;
