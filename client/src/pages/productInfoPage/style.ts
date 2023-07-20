import styled from "styled-components";

export const ProductInfo = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding: 36px;
  /* border: 4px solid red; */
`;

export const ContetntsWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  width: 100%;
  /* border: 4px solid red; */

  @media (max-width: 872px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ProductImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 440px;
  height: 424px;
  margin-right: 40px;
  /* border: 4px solid red; */

  @media (max-width: 872px) {
    margin: 0;
  }
`;

export const ProductImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: contain;
`;

export const ProductDetailContainer = styled.div`
  width: 100%;
  max-width: 772px;
  /* border: 4px solid red; */

  & > * {
    margin-top: 24px;
  }
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
  height: 157px;
  border: 1px solid var(--color-gray200);
  border-radius: 20px;
`;

export const PurchaseButtonWrapper = styled.div`
  display: flex;
  /* flex-direction: row-reverse; */
  justify-content: flex-end;
  width: 100%;
  border-bottom: 4px solid var(--color-gray200);
  font-size: 1.2rem;
  /* border: 4px solid red; */
`;

export const FourBox = styled.div`
  width: 440px;
  border: 4px solid red;
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
  /* border: 4px solid red; */
  @media (max-width: 872px) {
    margin-top: 20px;
  }

  &:hover {
    background-color: #385c78;
  }
`;

export const CommentContainer = styled.div`
  /* display: flex; */
  /* width: 100%; */
  /* justify-content: center; */
  padding-top: 36px;
  /* border: 4px solid black; */
`;
