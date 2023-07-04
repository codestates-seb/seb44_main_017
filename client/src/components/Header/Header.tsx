import HamburgerDropdown from "../Dropdown_hamburger/HamburgerDropdown";
import ProfileDropdown from "../Dropdown_profile/ProfileDropdown";
import LoginModal from "../Modal_login/LoginModal";
import SignupModal from "../Modal_signup/SignupModal";
import "./header.css";
import { Logo } from "./Logo";
import { LoginBtn, NavBtn, SignupBtn } from "./styled";
import { useState, useRef } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModallOpen, setSignupModalOpen] = useState(false);

  function toggleMenu() {
    const menuButton = document.querySelector(".menu-button");
    menuButton?.classList.toggle("open");
    setIsOpen(!isOpen);
  }

  return (
    <div id="haeder_box">
      <div id="logo_pc">
        <Logo width="48px" height="20px" />
        <span className="logo_font">RECLOSET</span>
      </div>
      <div id="logo_mobile">
        <span className="logo_font">RECLOSET</span>
      </div>
      <div id="navBar">
        <NavBtn href="/products">상품보기</NavBtn>
        <NavBtn href="/notice">공지사항</NavBtn>
        <NavBtn href="/">Q&A</NavBtn>
        <ProfileDropdown />
        <LoginBtn
          onClick={() => {
            setLoginModalOpen(true);
          }}
        >
          {/* <a href="/login" style={{ color: "inherit" }}> */}
          LOGIN
          {/* </a> */}
        </LoginBtn>
        {loginModalOpen && (
          <LoginModal closeModal={() => setLoginModalOpen(false)} />
        )}
        <SignupBtn onClick={() => setSignupModalOpen(true)}>
          {/* <a href="/signup" style={{ color: "inherit" }}> */}
          SIGN UP
          {/* </a> */}
        </SignupBtn>
        {signupModallOpen && (
          <SignupModal closeModal={() => setSignupModalOpen(false)} />
        )}
      </div>
      <div className="side-wrapper" ref={headerRef}>
        <div className="menu-button" onClick={toggleMenu}>
          <div className="menu-bar" />
          <div className="menu-bar" />
          <div className="menu-bar" />
        </div>
        <HamburgerDropdown
          isOpen={isOpen}
          toggleMenu={toggleMenu}
          headerRef={headerRef}
        />
      </div>
    </div>
  );
};

export default Header;
