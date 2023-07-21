import HamburgerDropdown from "../Dropdown_hamburger/HamburgerDropdown";
import ProfileDropdown from "../Dropdown_profile/ProfileDropdown";
import LoginModal from "../Modal_login/LoginModal";
import SignupModal from "../Modal_signup/SignupModal";
import * as S from "./styled";
import { Logo } from "./Logo";
import { LoginBtn, NavBtn, SignupBtn } from "./styled";
import { useState, useRef, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "@/recoil/atom";
import { LoginUserInfo } from "@/types/shared";
import { getId, getName, getRoles, getToken } from "@/utils/token";
import axios from "axios";
import { BASE_URL } from "@/constants/constants";

const Header = () => {
  const headerRef = useRef<HTMLButtonElement | null>(null);
  const role = getRoles();
  const memberId = Number(getId());
  const username = getName();
  const [isActive, setIsActive] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModallOpen, setSignupModalOpen] = useState(false);
  const setUserInfo = useSetRecoilState<LoginUserInfo | null>(userInfoState);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    if (role === "user") {
      const [authorization, refresh] = getToken();
      axios
        .get(BASE_URL + `/members/${memberId}`, {
          headers: {
            Authorization: authorization,
            Refresh: refresh,
          },
        })
        .then((res) => setUserInfo({ ...res.data.data, role: role }));
    } else if (role === "admin") {
      setUserInfo({
        email: "",
        isBan: false,
        memberId: memberId,
        money: 0,
        name: username,
        phone: "000-0000-0000",
        profile: "",
        role: "admin",
      });
    } else {
      setUserInfo(null);
    }
  }, []);
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
        {role ? (
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
