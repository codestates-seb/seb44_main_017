import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;

  & li {
    list-style: none;
  }
`;

export const ItemLayout = styled.article`
  display: flex;
  flex-direction: column;
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & li {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid blue;
    gap: 16px;
  }

  & img {
    width: 200px;
    height: 200px;
  }
`;

export const InfoLayout = styled.article`
  display: flex;
  flex-direction: column;
`;

export const SubHeader = styled.header``;

export const ItemBox = styled.div``;

export const InfoBox = styled.div``;
