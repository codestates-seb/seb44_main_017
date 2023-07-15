import HamburgerDropdown from "../Dropdown_hamburger/HamburgerDropdown";
import ProfileDropdown from "../Dropdown_profile/ProfileDropdown";
import LoginModal from "../Modal_login/LoginModal";
import SignupModal from "../Modal_signup/SignupModal";
import * as S from "./styled";
import { Logo } from "./Logo";
import { LoginBtn, NavBtn, SignupBtn } from "./styled";
import { useState, useRef } from "react";

const Header = () => {
  const headerRef = useRef<HTMLButtonElement | null>(null);
  const isLogin = false;
  const [isActive, setIsActive] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModallOpen, setSignupModalOpen] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <S.HeaderContainer>
      <S.Spacing />
      <S.LogoContainer href="/">
        <S.LogoIcon>
          <Logo />
        </S.LogoIcon>
        <S.LogoText>RECLOSET</S.LogoText>
      </S.LogoContainer>
      <S.NavBarContainer>
        <NavBtn href="/productlist">상품보기</NavBtn>
        <NavBtn href="/notice">공지사항</NavBtn>
        <NavBtn href="/questions">Q&A</NavBtn>
        {isLogin ? (
          <ProfileDropdown />
        ) : (
          <>
            <LoginBtn
              onClick={() => {
                setLoginModalOpen(true);
              }}
            >
              LOGIN
            </LoginBtn>
            <SignupBtn onClick={() => setSignupModalOpen(true)}>
              SIGN UP
            </SignupBtn>
          </>
        )}
      </S.NavBarContainer>
      <S.DrawerContainer>
        <S.HamburgerButton
          className={isActive ? "active" : ""}
          onClick={handleClick}
          ref={headerRef}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </S.HamburgerButton>
        <HamburgerDropdown
          isOpen={isActive}
          setIsOpen={setIsActive}
          toggleMenu={handleClick}
          headerRef={headerRef}
        />
      </S.DrawerContainer>
      {loginModalOpen && (
        <LoginModal closeModal={() => setLoginModalOpen(false)} />
      )}
      {signupModallOpen && (
        <SignupModal closeModal={() => setSignupModalOpen(false)} />
      )}
    </S.HeaderContainer>
  );
};

export default Header;
