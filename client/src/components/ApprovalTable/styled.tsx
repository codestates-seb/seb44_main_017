import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ProductsTable = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid var(--color-gray200);
  padding: 16px 0px;
`;
export const productsInfo = styled.span<{ name: string }>`
  width: 150px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`;
export const Field = styled.div`
  display: flex;
  padding: 16px 36px;
  background-color: #f2f2f2;
`;
export const DetailsField = styled.div`
    display: flex;
    flex-direction: column;
`
export const ProductImage = styled.img<{ src: string }>`
`;
export const AgreeBtn = styled.button`
  padding: 8px 20px;
  border: 0;
  border-radius: 16px;
  color: white;
  background-color: #fd3c3c;
`;
export const CancelBtn = styled.button`
  padding: 8px 20px;
  border: 0;
  border-radius: 16px;
  color: black;
`;
