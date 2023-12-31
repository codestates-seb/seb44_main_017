import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
`;

export const PageTitle = styled.div<{ isPurchase: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 24px 16px 20px;

  @media (max-width: 767px) {
    padding: 24px 0 12px;
  }

  & .sub_title {
    display: flex;
    gap: 24px;

    & .title_register {
      color: ${props => (props.isPurchase ? "#d9d9d9" : "#191919")};
      cursor: pointer;
    }

    & .title_purchase {
      color: ${props => (props.isPurchase ? "#191919" : "#d9d9d9")};
      cursor: pointer;
    }
  }

  & h2 {
    @media (max-width: 767px) {
      font-size: var(--font-size-16);
    }

    @media (min-width: 768px) and (max-width: 1120px) {
      font-size: 20px;
    }
  }
`;

export const ContentBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 2px solid var(--color-black);
  padding-top: 24px;
  grid-row-gap: 12px;

  @media (max-width: 1070px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 830px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 580px) {
    grid-template-columns: repeat(1, 1fr);
  }

  & .product_wrapper {
    display: flex;
    justify-content: center;
  }

  & img {
    width: 230px;
    height: 230px;

    @media (max-width: 1200px) {
      width: 200px;
      height: 200px;
    }
  }
`;

export const NoneItemsBox = styled.div`
  border-top: 2px solid var(--color-black);

  & .none_items {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh;
    border: 1px dashed var(--color-gray100);
    border-radius: 16px;
    margin-bottom: 36px;
    color: var(--color-gray200);
    margin-top: 24px;

    @media (max-width: 767) {
      font-size: var(--font-size-12);
    }
  }
`;

export const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 36px 0;
`;
