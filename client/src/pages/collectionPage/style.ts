import styled from "styled-components";

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
  }

  & > h4 {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-gray200);
  }
`;

export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 36px 0;
`;
