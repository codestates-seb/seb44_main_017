import "./header.css";
import { Logo } from "./Logo";
import { LoginBtn, NavBtn, SignupBtn } from "./styled";

const Header = () => {
  function toggleMenu() {
    const menuButton = document.querySelector(".menu-button");
    menuButton?.classList.toggle("open");
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
        <LoginBtn>
          <a href="/login" style={{ color: "inherit" }}>
            LOGIN
          </a>
        </LoginBtn>
        <SignupBtn>
          <a href="/signup" style={{ color: "inherit" }}>
            SIGN UP
          </a>
        </SignupBtn>
      </div>
      <div className="menu-button" onClick={toggleMenu}>
        <div className="menu-bar" />
        <div className="menu-bar" />
        <div className="menu-bar" />
      </div>
    </div>
  );
};

export default Header;
