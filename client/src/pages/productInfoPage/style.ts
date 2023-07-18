import styled from "styled-components";

export const Condition = styled.img`
  width: 24px;
  height: 36px;
  margin-left: 480px;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
  align-items: flex-start;
  width: 100%;
  max-width: 1260px;
  height: 600px;
  border: 4px solid red;
`;

export const ContetntsWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const ProductImage = styled.div`
  width: 100%;
  max-width: 464px;
  height: 424px;
  border: 4px solid blue;
`;

export const ProductDetailContainer = styled.div`
  width: 100%;
  max-width: 772px;
  height: 168px;

  & > * {
    margin-top: 24px;
  }
`;

export const ProductUpperPart = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 757px;
`;

export const SalesButton = styled.button`
  border-radius: 16px;
  width: 108px;
  height: 36px;
  font-weight: var(--font-weight-700);
  margin-right: 16px;
  font-size: var(--font-size-16);
  border: 0;
  color: white;
  font-family: "Roboto";
  background-color: var(--color-orange);
`;

export const DeleteBtn = styled.button`
  border-radius: 16px;
  width: 96px;
  height: 32px;
  font-weight: var(--font-weight-700);
  margin-right: 16px;
  font-size: var(--font-size-12);
  border: 0;
  color: white;
  font-family: "Roboto";
  background-color: var(--color-lightred);

  &:hover {
    background-color: #e35757;
  }
`;
export const ProductMiddlePart = styled.div`
  display: flex;
  width: 100%;
  max-width: 757px;

  & > h2 {
    font-size: 32px;
    font-weight: 700;
    color: var(--gray-title);
    margin-left: 20px;
  }
`;

export const CategoryButton = styled.button`
  border-radius: 10px;
  width: 112px;
  height: 40px;
  font-weight: var(--font-weight-700);
  margin-right: 16px;
  font-size: var(--font-size-16);
  border: 0;
  color: white;
  font-family: "Roboto";
  background-color: var(--color-darkblue);
`;

export const ProductLowerPart = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 757px;

  & > h2 {
    font-size: 32px;
    font-weight: 700;
    color: var(--gray-title);
    margin-left: 20px;
  }
`;

export const ProductDescription = styled.div`
  display: flex;
  width: 100%;
  max-width: 768px;
  height: 157px;
`;

export const PurchaseButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
`;

export const ProductPurchase = styled.button`
  width: 100%;
  max-width: 170px;
  height: 48px;
  border: 4px solid gray;
`;

export const CommentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1260px;
  border: 4px solid black;
`;
