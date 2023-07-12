import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  margin-top: 24px;
`;

export const QnaContainer = styled.article`
  display: flex;
  flex-direction: column;
  max-width: 1264px;
  margin: 0 auto;
`;

export const SortBox = styled.div`
  align-self: end;
`;

export const BoardContainer = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  font-size: var(--font-size-16);

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
        padding: 16px 0;
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

export const ViewBox = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    margin-right: 8px;
  }
`;
