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
  gap: 12px;

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
  padding: 36px 0;
  border-top: 2px solid var(--color-black);
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 2px;

  &:hover {
    background-color: #e35757;
  }
`;

export const AddFormBtn = styled(LoginBtn)`
  margin: 0;
  width: 150px;
  height: 50px;
  border-radius: 40px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 4px;

  &:hover {
    background-color: #355873;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 140px;
    height: 45px;
  }

  @media (max-width: 767px) {
    width: 120px;
    height: 40px;
  }
`;

export const AddBtnBox = styled.div`
  padding-bottom: 60px;
`;

export const SubmitBox = styled.div`
  display: flex;
  margin-bottom: 40px;
  align-items: center;
  justify-content: end;
  gap: 12px;
  max-width: 750px;
  width: 100%;

  @media (min-width: 768px) and (max-width: 1023px) {
    max-width: 634px;
  }

  @media (max-width: 767px) {
    max-width: 300px;
  }

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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 2px;

  &:hover {
    background-color: #355873;
  }
`;
