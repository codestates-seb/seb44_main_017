import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 36px;
`;

export const QnaContainer = styled.article`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

export const SortBox = styled.div`
  align-self: end;
`;

export const BoardContainer = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;

  @media (max-width: 767px) {
    font-size: var(--font-size-12);
  }

  & thead {
    border-bottom: 2px solid var(--color-black);
    & th {
      padding: 16px;
      font-weight: 700;

      @media (max-width: 767px) {
        padding: 5px;
      }
    }
  }

  & tbody {
    border-bottom: 2px solid var(--color-black);
    & tr {
      border-bottom: 1px solid #ddd;
      & td {
        padding: 16px 10px;
        font-weight: 400;

        & a {
          color: var(--color-black);
        }

        & a:visited {
          color: var(--color-black);
        }

        & a:hover {
          color: var(--color-darkblue);
          font-weight: 700;
        }
      }
    }
  }
`;

export const ViewBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    margin-right: 8px;

    @media (max-width: 767px) {
      width: 20px;
      height: 20px;
    }
  }
`;

export const PagenationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 36px 0;
`;
