import styled, { css } from "styled-components";

export const SideBar = styled.nav<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
  color: var(--color-darkblue);
  width: 20%;
  z-index: 99;
  position: fixed;
  top: 43px;
  right: 0;
  opacity: 0;
  visibility: hidden;
  transform: translate(50%, 0);
  transition: all 0.2s ease;
  background-color: var(--color-white);

  ${(props) =>
    props.isOpen &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(0, 0);
    `};

  & img {
    width: 40px;
    height: 40px;
  }

  & svg {
    cursor: pointer;
  }

  .logout-icon {
    position: relative;
    left: 15px;

    & > svg {
      &:hover {
        transform: scale(1.1);
      }
    }

    @media (max-width: 767px) {
      & > svg {
        width: 24px;
        height: 24px;
      }
    }

    @media (max-width: 600px) {
      left: 0px;
      align-self: center;
    }
  }
  @media (min-width: 1024px) {
    display: none;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 50px 0 10px 0;
  font-weight: var(--font-weight-700);
  font-size: var(--font-size-12);

  .auth_btn {
    display: flex;
    flex-direction: column;
    gap: 10px;

    & > button {
      margin: 0;
    }
  }

  & .profile_name {
    @media (max-width: 600px) {
      display: none;
    }
  }
`;

export const MenuBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 15px;
  margin-bottom: 100px;
  font-size: var(--font-size-16);

  & li {
    cursor: pointer;
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 4px;
    border-radius: 5px;

    &:hover {
      background-color: var(--color-darkgreen);
      color: var(--color-white);
    }

    @media (max-width: 600px) {
      &:hover > .nav_description {
        display: block;
      }
    }

    & > img {
      width: 24px;
      height: 24px;

      @media (max-width: 767px) {
        width: 16px;
        height: 16px;
      }

      @media (max-width: 600px) {
        width: 24px;
        height: 24px;
      }
    }

    & .nav_description {
      padding: 5px;
      background-color: #444444;
      border-radius: 5px;
      color: #fff;
      position: absolute;
      display: none;
      width: max-content;
      right: 0;
      font-size: var(--font-size-12);
    }
  }

  & .nav_text {
    margin: 0;
    width: 100%;
    text-align: center;

    @media (max-width: 767px) {
      font-size: var(--font-size-16);
    }

    @media (max-width: 600px) {
      display: none;
    }
  }
`;
