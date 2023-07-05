import styled, { css } from "styled-components";

export const SideBar = styled.nav<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
  color: var(--color-darkblue);
  width: 230px;
  z-index: 99;
  position: fixed;
  top: 40px;
  right: 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  background-color: var(--color-white);

  ${props =>
    props.isOpen &&
    css`
      opacity: 1;
      visibility: visible;
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

    & svg {
      @media (max-width: 229px) {
        position: absolute;
        right: 15px;
      }
    }
  }

  @media (min-width: 1023px) {
    visibility: hidden;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 20px auto 10px;
  font-weight: var(--font-weight-700);
  font-size: var(--font-size-12);

  .auth_btn {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0;
  }

  & .profile_text {
    @media (max-width: 229px) {
      visibility: hidden;
    }
  }

  @media (max-width: 229px) {
    margin: 0;
    align-items: end;
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

  & img {
    width: 24px;
    height: 24px;

    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }

    @media (max-width: 229px) {
      width: 32px;
      height: 32px;
      position: absolute;
      right: 0;
    }
  }

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
  }

  & .nav_text {
    margin: 0;

    @media (max-width: 768px) {
      font-size: var(--font-size-16);
    }

    @media (max-width: 229px) {
      visibility: hidden;
    }
  }
`;
