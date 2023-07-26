import styled, { keyframes } from "styled-components";
import { Alert, Slider } from "@mui/material";

export const ProductInfo = styled.section`
  padding: 36px 0 8px 0;

  & .back_btn {
    position: absolute;
    bottom: -50px;
    right: calc(50% - 48px);
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

export const Container = styled.div`
  display: flex;
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  border-bottom: 2px solid var(--color-black);
  justify-content: space-between;
  position: relative;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
  }
`;

export const DetailAndButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContetntsWrapper = styled.div`
  display: flex;
  max-height: 404px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 36px;

  @media (max-width: 1023px) {
    max-height: 354px;
  }

  /* @media (max-width: 900px) {
    flex-direction: column;
    gap: 8px;
  } */
`;

export const ProductImageBox = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 40px;

  @media (max-width: 900px) {
    margin-right: 0;
  }
`;

export const ProductImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: contain;
  border: 2px solid var(--color-darkblue);
  border-radius: 16px;

  @media (max-width: 767px) {
    width: 300px;
    height: 300px;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 350px;
    height: 350px;
  }
`;

export const ProductDetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ProductUpperPart = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 757px;
`;

export const SalesBox = styled.div`
  border-radius: 16px;
  width: 85px;
  height: 30px;
  text-align: center;
  line-height: 32px;
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
  width: 80px;
  height: 30px;
  font-weight: var(--font-weight-700);
  font-size: var(--font-size-12);
  border: 0;
  color: white;
  font-family: "Roboto";
  background-color: var(--color-lightred);

  &:hover {
    background-color: #e35757;
  }

  @media (max-width: 900px) {
    width: 70px;
    height: 25px;
  }
`;
export const ProductMiddlePart = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 757px;
  align-items: center;
`;

export const LeftWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;

  & > h2 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--gray-title);
    @media (max-width: 900px) {
      font-size: var(--font-size-24);
    }
  }
`;

// export const CategoryBox = styled.div`
//   border-radius: 16px;
//   width: 108px;
//   height: 32px;
//   text-align: center;
//   line-height: 32px;
//   font-weight: var(--font-weight-700);
//   margin-right: 16px;
//   font-size: var(--font-size-16);
//   border: 0;
//   color: white;
//   background-color: var(--color-darkblue);
// `;

export const Condition = styled.img`
  width: 24px;
  height: 36px;
`;

export const ProductLowerPart = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 757px;

  & > h2 {
    font-size: var(--font-size-24);
    font-weight: 700;
    color: var(--gray-title);
  }
`;

export const PostInfo = styled.div`
  display: flex;
  gap: 4px;
  color: #5a5a5a;
  align-items: center;
  & .post_dot {
    font-size: var(--font-size-24);
  }
`;

export const ProductDescription = styled.div`
  display: flex;
  height: 180px;
  border: 1px solid var(--color-gray200);
  border-radius: 20px;
  padding: 20px;

  @media (max-width: 767px) {
    height: 150px;
  }

  @media (max-width: 1023px) {
    height: 130px;
  }
`;

export const PurchaseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  font-size: 1.2rem;
  gap: 12px;
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

export const CartBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  width: 138px;
  height: 36px;
  font-weight: var(--font-weight-700);
  font-size: var(--font-size-20);
  border: 2px solid var(--color-darkgreen);
  background-color: var(--color-white);
  color: var(--color-darkgreen);
  cursor: pointer;
  gap: 4px;

  &:hover {
    background-color: var(--color-darkgreen);
    color: var(--color-white);
  }

  @media (max-width: 1023px) {
    width: 120px;
    height: 30px;
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

  &:hover {
    background-color: #385c78;
  }

  @media (max-width: 1023px) {
    width: 120px;
    height: 34px;
  }
`;

export const CommentContainer = styled.div``;

export const CustomSlider = styled(Slider)`
  color: var(--color-darkblue) !important;
`;

const slideFromTop = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const CustomAlert = styled(Alert)`
  position: absolute;
  top: 40px;
  right: 50%;
  border-radius: 99px !important;
  animation: ${slideFromTop} 1s ease;
  z-index: 9999;
`;
