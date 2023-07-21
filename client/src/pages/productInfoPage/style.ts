import styled from "styled-components";

export const ProductInfo = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding: 36px 36px 8px 36px;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  /* border: 4px solid red; */

  & .back_btn {
    position: relative;
    top: 24px;
    border-radius: 16px;
    width: 96px;
    height: 32px;
    font-weight: var(--font-weight-700);
    font-size: var(--font-size-12);
    border: 2px solid var(--color-darkblue);
    background-color: var(--color-white);
    color: var(--color-darkblue);

    &:hover {
      background-color: var(--color-darkblue);
      color: var(--color-white);
    }
  }
`;

export const ContetntsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 40px;

  /* border: 4px solid red; */

  @media (max-width: 872px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ProductImageBox = styled.div`
  display: flex;
  justify-content: center;
  max-width: 440px;
  /* border: 4px solid red; */

  @media (max-width: 872px) {
    margin: 0;
  }
`;

export const ProductImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: contain;
  border: 2px solid var(--color-darkblue);
  border-radius: 16px;
`;

export const ProductDetailContainer = styled.div`
  width: 100%;
  max-width: 772px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  /* border: 4px solid red; */
`;

export const ProductUpperPart = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 757px;
  /* border: 4px solid red; */
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
  /* border: 4px solid red; */
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
  /* border: 4px solid red; */
`;

export const LeftWrapper = styled.div`
  display: flex;
  width: 100%;

  & > h2 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--gray-title);
    margin-left: 20px;
    /* border: 4px solid red; */
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

export const Condition = styled.img`
  width: 24px;
  height: 36px;
`;

export const ProductLowerPart = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 757px;
  /* border: 4px solid red; */

  & > h2 {
    font-size: 2rem;
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
  height: 251px;
  border: 1px solid var(--color-gray200);
  border-radius: 20px;
`;

export const PurchaseButtonWrapper = styled.div`
  display: flex;
  /* flex-direction: row-reverse; */
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid var(--color-black);
  font-size: 1.2rem;
  gap: 24px;
  padding: 12px 0;
  max-width: 1200px;
  /* border: 4px solid red; */
`;

export const CartBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  width: 138px;
  height: 38px;
  font-weight: var(--font-weight-700);
  font-size: var(--font-size-12);
  border: 2px solid var(--color-darkgreen);
  background-color: var(--color-white);
  color: var(--color-darkgreen);
  cursor: pointer;
  gap: 4px;

  &:hover {
    background-color: var(--color-darkgreen);
    color: var(--color-white);

    & svg {
      stroke: var(--color-white);
    }
  }
`;

export const PaymentBtn = styled.button`
  width: 100%;
  max-width: 140px;
  height: 40px;
  border-radius: 20px;
  font-weight: var(--font-weight-700);
  font-size: var(--font-size-20);
  border: 0;
  color: white;
  font-family: "Roboto";
  background-color: var(--color-darkblue);
  /* border: 4px solid red; */
  @media (max-width: 872px) {
  }

  &:hover {
    background-color: #385c78;
  }
`;

export const CommentContainer = styled.div``;
