import styled from "styled-components";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 36px 36px 8px;
  max-width: 1200px;
  width: 100%;
  gap: 24px;

  @media (max-width: 767px) {
    padding: 36px 25px 10px;
  }

  & .detail_title {
    font-size: var(--font-size-36);

    @media (max-width: 767px) {
      font-size: var(--font-size-16);
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      font-size: var(--font-size-24);
    }
  }

  & .detail_info {
    display: flex;
    gap: 24px;
    align-self: flex-end;
    color: #727272;
    margin-right: 16px;

    @media (max-width: 767px) {
      margin-right: 0;
      font-size: 14px;
      align-items: center;
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      margin-right: 8px;
    }

    & .detail_name {
      @media (max-width: 767px) {
        display: none;
      }
    }
  }

  & .detail_view {
    display: flex;
    align-items: center;
  }

  & .detail_view > svg {
    margin-right: 8px;

    @media (max-width: 767px) {
      width: 20px;
      height: 20px;
    }
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  min-height: 512px;
  width: 90%;
  margin: 0 auto;
  padding: 16px 20px;
  border-top: 3px solid var(--color-black);
  border-bottom: 2px solid var(--color-black);
  position: relative;

  & .back_btn {
    position: absolute;
    bottom: -10%;
    right: 47%;
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
