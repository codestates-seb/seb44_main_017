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

export const PageTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 36px 16px 20px;

  & h2 {
    @media (max-width: 767px) {
      font-size: var(--font-size-16);
    }

    @media (min-width: 768px) and (max-width: 1120px) {
      font-size: 20px;
    }
  }
`;

export const SortBox = styled.div`
  align-self: end;
  margin-bottom: 16px;
`;

export const BoardContainer = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;

  @media (max-width: 550px) {
    & .qna_number {
      display: none;
    }
    & .qna_title {
      width: 60%;
    }
    & .qna_wrtier {
      width: 40%;
    }
  }

  @media (max-width: 767px) {
    font-size: var(--font-size-12);

    & .qna_created_at {
      display: none;
    }

    & .qna_title {
      width: 55%;
    }

    & .qna_writer {
      width: 35%;
    }
  }

  @media (max-width: 1023px) {
    & .qna_view {
      display: none;
    }
    & .qna_created_at {
      width: 20%;
    }
    & .qna_writer {
      width: 20%;
    }
  }
`;

export const TableHeader = styled.thead`
  border-top: 2px solid var(--color-black);
  border-bottom: 2px solid var(--color-black);
  & th {
    padding: 16px;
    font-weight: 700;

    @media (max-width: 767px) {
      padding: 5px;
    }
  }
`;
export const TableBody = styled.tbody`
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

export const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 36px 0;
`;
