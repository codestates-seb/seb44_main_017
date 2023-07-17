import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 36px;
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
`;

export const PageTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 36px 16px 8px 16px;
`;

export const ContentBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 2px solid var(--color-black);
  padding: 24px;
  grid-row-gap: 12px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: repeat(1, 1fr);
  }

  & .product_wrapper {
    display: flex;
    justify-content: center;
  }

  & img {
    width: 250px;
    height: 250px;

    @media (max-width: 1200px) {
      width: 200px;
      height: 200px;
    }
  }
`;
