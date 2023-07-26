import styled, { css } from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  position: relative;

  & div:first-child {
    display: flex;
    align-items: center;
    font-size: var(--font-size-16);
    font-weight: 900;
    margin-right: 8px;
    cursor: pointer;

    &:hover {
      color: var(--color-darkblue);
    }
  }

  & img {
    width: 40px;
    height: 40px;
  }

  & .profile_nickname {
    @media (max-width: 260px) {
      visibility: hidden;
      align-items: flex-start;
    }
  }
`;

export const DropDownContainer = styled.div<{ isDropped: boolean }>`
  border: 1.5px solid var(--color-darkblue);
  font-weight: var(--font-weight-700);
  border-radius: 10px;
  transform: translate(10px, 50px);
  transition: all 0.4s ease;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  min-width: 95px;
  position: absolute;
  right: 16px;
  background-color: var(--color-white);
  width: max-content;

  &::before {
    content: "";
    position: absolute;
    top: -4%;
    left: 80%;
    border: 10px solid transparent;
    border-width: 0px 5px 5px;
    border-bottom-color: var(--color-darkblue);
    z-index: -1;
  }

  ${props =>
    props.isDropped &&
    css`
      opacity: 1;
      visibility: visible;
    `};

  & > ul {
    font-size: var(--font-size-16);
    padding: 12px 16px;
    margin: 0;
    display: flex;
    gap: 12px;
    flex-direction: column;
    align-items: center;
    color: var(--color-darkblue);

    & li {
      cursor: pointer;
      padding: 4px;

      &:hover {
        color: var(--color-darkgreen);
      }
    }

    & > a:visited {
      color: var(--color-darkblue);
    }
  }
`;
