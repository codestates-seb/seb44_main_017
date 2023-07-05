import styled, { css } from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;

  & div:first-child {
    display: flex;
    align-items: center;
    font-size: var(--font-size-12);
    font-weight: var(--font-weight-700);
    margin-right: 8px;
  }

  & img {
    width: 40px;
    height: 40px;
    cursor: pointer;
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
  transform: translate(-100px, 60px);
  transition: all 0.4s ease;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  min-width: 95px;

  &::before {
    content: "";
    position: absolute;
    top: -10%;
    left: 70%;
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
    font-size: var(--font-size-12);
    padding: 8px 16px;
    margin: 0;
    display: flex;
    gap: 5px;
    flex-direction: column;
    align-items: center;
    color: var(--color-darkblue);

    & li {
      cursor: pointer;

      &:hover {
        color: var(--color-darkgreen);
      }
    }

    & > a:visited {
      color: var(--color-darkblue);
    }
  }
`;
