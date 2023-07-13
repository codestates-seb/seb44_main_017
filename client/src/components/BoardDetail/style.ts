import styled from "styled-components";

export const DetailContainer = styled.article`
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
    gap: 24px;
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

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin: 0 auto;
  max-width: 1264px;
  min-height: 512px;
  padding: 16px 20px;
  border-bottom: 2px solid var(--color-black);
  position: relative;

  & .back_btn {
    position: absolute;
    bottom: -10%;
    right: 50%;
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
