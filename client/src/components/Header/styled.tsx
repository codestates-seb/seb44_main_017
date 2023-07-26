import styled from "styled-components";

export const Spacing = styled.div`
  width: 24px;
  @media (max-width: 767px) {
    width: 16px;
  }
  @media (min-width: 1024px) {
    display: none;
  }
`;
export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 8px 36px;
  background-color: var(--color-white);
  z-index: 99;
  @media (max-width: 767px) {
    height: 32px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    height: 36px;
    padding: 12px 32px;
  }
`;
export const LogoContainer = styled.a<{ href: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const DrawerContainer = styled.div`
  position: relative;
  @media (min-width: 1024px) {
    display: none;
  }
`;
export const LogoIcon = styled.div`
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const LogoText = styled.span`
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-500);
  color: var(--color-darkblue);
  @media (max-width: 767px) {
    font-size: var(--font-size-16);
  }
`;
export const LoginBtn = styled.button`
  border-radius: 16px;
  width: 96px;
  height: 32px;
  font-weight: var(--font-weight-700);
  margin-right: 16px;
  font-size: var(--font-size-12);
  border: 0;
  background-color: var(--color-darkblue);
  color: var(--color-white);
`;
export const SignupBtn = styled.button`
  border-radius: 16px;
  width: 96px;
  height: 32px;
  font-weight: var(--font-weight-700);
  font-size: var(--font-size-12);
  border: 2px solid var(--color-darkblue);
  background-color: var(--color-white);
  color: var(--color-darkblue);
`;
export const NavBtn = styled.a<{ href: string }>`
  color: black;
  font-weight: var(--font-weight-700);
  font-size: var(--font-size-16);
  margin-right: 36px;
  cursor: pointer;
`;
export const MenuIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 767px) {
    width: 16px;
    height: 16px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 24px;
    height: 24px;
  }
`;
export const MenuBar = styled.div`
  width: 100%;
  background-color: #000;
  transition: transform 0.3s;
  border-radius: 8px;
`;

export const HamburgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  .bar {
    width: 100%;
    border-radius: 16px;
    background-color: black;
    transition: transform 0.3s ease-in-out;
  }
  @media (max-width: 767px) {
    width: 16px;
    height: 16px;
    .bar {
      height: 2px;
      margin: 1.5px 0px;
    }
    &.active .bar:nth-child(1) {
      transform: translateY(5px) rotate(45deg);
    }
    &.active .bar:nth-child(3) {
      transform: translateY(-5px) rotate(-45deg);
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 24px;
    height: 24px;
    .bar {
      height: 3px;
      margin: 2px 0px;
    }
    &.active .bar:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    &.active .bar:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }
  &.active .bar:nth-child(2) {
    opacity: 0;
  }
`;
