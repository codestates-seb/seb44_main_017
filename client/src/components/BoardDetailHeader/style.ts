import styled from "styled-components";

export const HeaderContainer = styled.article`
  width: 100%;
`;

export const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid var(--color-black);
  padding: 36px 20px 16px;
  max-width: 1264px;
  margin: 0 auto;

  & .detail_title {
    font-size: var(--font-size-36);
  }

  & .detail_info {
    display: flex;
    gap: 12px;
    align-self: flex-end;
    color: #727272;
  }

  & .detail_view {
    display: flex;
    align-items: center;
  }

  & .detail_view > svg {
    margin-right: 8px;
  }
`;
