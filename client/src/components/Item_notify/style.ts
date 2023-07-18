import styled from "styled-components";

export const Notifyitemcard = styled.button`
  display: flex;
  flex-direction: column;
  max-width: 294px;
  width: 100%;
  height: 180px;
  padding: 12px;
  border: 0;
  border-radius: 10px;
  box-shadow: 4px 4px 10px 4px rgba(0, 0, 0, 0.25);
  background-color: #f7f7f7;
  backdrop-filter: blur(5px);

  @media (max-width: 767px) {
    width: 320px;
    height: 106px;
    padding: 4px;
    border-radius: 15px;
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.25);
  }
`;
export const NotifyTitle = styled.h2`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  width: 100%;
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-700);

  @media (max-width: 767px) {
    margin-top: 12px;
    margin-bottom: 12px;
  }
`;

export const PostIt = styled.img`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 12px;
  right: 16px;

  @media (max-width: 767px) {
    width: 26px;
    height: 26px;
  }
`;
export const NotifyContents = styled.p`
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-400);
  margin-bottom: auto;

  @media (max-width: 767px) {
    font-size: var(--font-size-10);
  }
`;

export const NewBadge = styled.div`
  width: 44px;
  /* height: 16px; */
  margin-bottom: 12px;
  border: 0;
  border-radius: 8px;
  background-color: var(--color-darkblue);
  color: var(--color-white);
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-700);

  @media (max-width: 767px) {
    width: 32px;
    margin-bottom: 8px;
    font-size: var(--font-size-8);
    font-weight: var(--font-weight-400);
  }
`;

export const RegInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: space-between;

  small {
    color: var(--color-gray200);
    font-size: var(--font-size-12);
  }
`;

export const ViewImg = styled.img`
  width: 18px;
  height: 8px;
`;
