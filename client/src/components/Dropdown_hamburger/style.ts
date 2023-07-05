import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 180px;

  & img {
    width: 40px;
    height: 40px;
  }

  & svg {
    cursor: pointer;
  }

  .hamburger-icon,
  .close-icon {
    display: flex;
    justify-content: flex-end;

    @media (max-width: 179px) {
      justify-content: start;
    }
  }
`;

export const SideBar = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
  box-shadow: -3px 0px 5px -2px var(--color-gray200);
  color: var(--color-darkblue);
  z-index: 999;

  .logout-icon {
    position: relative;
    left: 5px;
    top: 5px;
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
  }

  & .profile_text {
    @media (max-width: 179px) {
      visibility: hidden;
    }
  }

  @media (max-width: 179px) {
    margin: 20px 0;
    align-items: flex-start;
  }
`;

export const MenuBox = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 179px) {
    justify-content: start;
  }
`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 15px;
  margin-bottom: 100px;
  font-size: var(--font-size-16);

  & img {
    width: 16px;
    height: 16px;

    @media (max-width: 179px) {
      width: 32px;
      height: 32px;
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
    @media (max-width: 179px) {
      visibility: hidden;
    }
  }
`;
