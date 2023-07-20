import styled from "styled-components";

export const Condition = styled.img`
  width: 24px;
  height: 36px;
`;

export const ProductInfo = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 36px;
`;

export const ContetntsWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const ProductImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 440px;
  height: 424px;
  margin-right: 40px;
`;

export const ProductImage = styled.img`
  width: 400px;
  height: 400px;
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

export const SalesBox = styled.div`
  border-radius: 16px;
  width: 108px;
  height: 36px;
  text-align: center;
  line-height: 36px;
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
  justify-content: space-between;
  width: 100%;
  max-width: 757px;
`;

export const LeftWrapper = styled.div`
  display: flex;
  width: 100%;

  & > h2 {
    font-size: 32px;
    font-weight: 700;
    color: var(--gray-title);
    margin-left: 20px;
  }
`;

export const CategoryBox = styled.div`
  border-radius: 10px;
  width: 108px;
  height: 40px;
  text-align: center;
  line-height: 40px;
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
  }
`;

export const ProductDescription = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  max-width: 756px;
  height: 157px;
  border: 1px solid var(--color-gray200);
  border-radius: 20px;
`;

export const PurchaseButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 1236px;
  border-bottom: 4px solid var(--color-gray200);
`;

export const PaymentBtn = styled.button`
  width: 100%;
  max-width: 160px;
  height: 48px;
  border-radius: 20px;
  font-weight: var(--font-weight-700);
  margin-bottom: 36px;
  font-size: var(--font-size-24);
  border: 0;
  color: white;
  font-family: "Roboto";
  background-color: var(--color-darkblue);

  &:hover {
    background-color: #385c78;
  }
`;

export const CommentContainer = styled.div`
  display: flex;
  border: 4px solid black;
`;
