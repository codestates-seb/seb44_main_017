import styled from "styled-components";
import { LoginBtn } from "../../components/Header/styled";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-top: 54px;
`;

export const PageTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-bottom: 40px;
  border-bottom: 2px solid var(--color-black);
  gap: 12px;
  width: 67%;

  & > h1 {
    font-size: 36px;
    font-weight: 700;

    @media (max-width: 767px) {
      font-size: 24px;
    }
  }

  & > h4 {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-gray200);

    @media (max-width: 767px) {
      display: none;
    }
  }
`;

export const ContentsContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 36px 0;
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  @media (max-width: 767px) {
    justify-content: space-around;
  }

  & > .product_no {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-darkblue);
  }
`;

export const DeleteBtn = styled(LoginBtn)`
  margin: 0;
  width: 75px;
  height: 27px;
  background-color: var(--color-lightred);

  &:hover {
    background-color: #e35757;
  }
`;

export const AddFormBtn = styled(LoginBtn)`
  margin: 0;
  width: 150px;
  height: 50px;
  border-radius: 40px;

  &:hover {
    background-color: #355873;
  }
`;

export const AddBtnBox = styled.div`
  padding: 60px 0;
`;

export const SubmitBox = styled.div`
  display: flex;
  margin-bottom: 40px;
  align-items: center;
  width: 67%;
  justify-content: end;
  gap: 12px;

  & > .total_product {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-darkblue);

    @media (max-width: 767px) {
      font-size: var(--font-size-12);
    }
  }
`;

export const SubmitBtn = styled(LoginBtn)`
  margin: 0;
  &:hover {
    background-color: #355873;
  }
`;
