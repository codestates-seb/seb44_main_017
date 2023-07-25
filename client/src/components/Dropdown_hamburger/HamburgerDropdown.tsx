import defaultImage from "/images/cat.jpg";
import * as S from "./style";
import * as H from "../Header/styled";
import Logout from "../../assets/icons/Logout";
import product from "../../assets/product.svg";
import notice from "../../assets/notice.svg";
import clothes from "../../assets/clothes.svg";
import askQuestion from "../../assets/askQuestion.svg";
import magnifier from "../../assets/magnifier.svg";
import cart from "@/assets/cart.svg";
import managerIcon from "@/assets/managerIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import LoginModal from "../Modal_login/LoginModal";
import SignupModal from "../Modal_signup/SignupModal";
import { delCookie } from "@/utils/token";
import { IMG_URL } from "@/constants/constants";
import { LoginUserInfo } from "@/types/shared";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/recoil/atom";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMenu: () => void;
  headerRef: React.MutableRefObject<HTMLDivElement | HTMLButtonElement | null>;
}

const HamburgerDropdown = ({
  isOpen,
  setIsOpen,
  toggleMenu,
  headerRef,
}: Props) => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const barRef = useRef<HTMLDivElement | null>(null);
  const portalElement = document.getElementById("modal") as HTMLElement;
  const userInfo = useRecoilValue<LoginUserInfo | null>(userInfoState);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModallOpen, setSignupModalOpen] = useState(false);

  const logoutHandler = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      toggleMenu();
      delCookie();
      if (path === "/") {
        window.location.reload();
      } else {
        window.location.href = "/";
      }
    }
  };

  const handleClickOutside = (e: React.BaseSyntheticEvent | MouseEvent) => {
    if (
      !headerRef.current?.contains(e.target) &&
      !barRef.current?.contains(e.target)
    )
      toggleMenu();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside);
      return () => window.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <>
      {createPortal(
        <>
          {isOpen && <Backdrop />}
          {loginModalOpen && (
            <LoginModal closeModal={() => setLoginModalOpen(false)} />
          )}
          {signupModallOpen && (
            <SignupModal closeModal={() => setSignupModalOpen(false)} />
          )}
          <S.SideBar isOpen={isOpen} ref={barRef}>
            <S.Profile>
              {!userInfo ? (
                <>
                  <div className="auth_btn">
                    <H.LoginBtn
                      onClick={() => {
                        setLoginModalOpen(true);
                        setIsOpen(false);
                      }}
                    >
                      LOGIN
                    </H.LoginBtn>
                    <H.SignupBtn
                      onClick={() => {
                        setSignupModalOpen(true);
                        setIsOpen(false);
                      }}
                    >
                      SIGN UP
                    </H.SignupBtn>
                  </div>
                </>
              ) : (
                <>
                  {userInfo.profile ? (
                    <img src={IMG_URL + "/" + userInfo.profile} />
                  ) : (
                    <img src={defaultImage} />
                  )}

                  <div className="profile_name">{userInfo?.name} 님</div>
                  <div></div>
                </>
              )}
            </S.Profile>
            {userInfo && (
              <>
                <S.MenuBox>
                  <S.Menu>
                    <li
                      onClick={() => {
                        navigate("/productlist");
                        toggleMenu();
                      }}
                    >
                      <img src={product} title="상품 보기" />
                      <h3 className="nav_text">상품 보기</h3>
                      <div className="nav_description">상품 보기</div>
                    </li>
                    {userInfo.role === "admin" ? (
                      <></>
                    ) : (
                      <>
                        <li
                          onClick={() => {
                            navigate("/collection");
                            toggleMenu();
                          }}
                        >
                          <img src={clothes} title="수거 요청" />
                          <h3 className="nav_text">수거 요청</h3>
                          <div className="nav_description">수거 요청</div>
                        </li>
                      </>
                    )}
                    <li
                      onClick={() => {
                        navigate("/notice");
                        toggleMenu();
                      }}
                    >
                      <img src={notice} title="공지사항" />
                      <h3 className="nav_text">공지사항</h3>
                      <div className="nav_description">공지사항</div>
                    </li>
                    <li
                      onClick={() => {
                        navigate("/questions");
                        toggleMenu();
                      }}
                    >
                      <img src={askQuestion} title="Q&A" />
                      <h3 className="nav_text">Q & A</h3>
                      <div className="nav_description">Q&A</div>
                    </li>
                    <li
                      onClick={() => {
                        navigate("/cart");
                        toggleMenu();
                      }}
                    >
                      <img src={cart} title="장바구니" />
                      <h3 className="nav_text">장바구니</h3>
                      <div className="nav_description">장바구니</div>
                    </li>
                    {userInfo.role !== "admin" ? (
                      <>
                        <li
                          onClick={() => {
                            navigate("/mypage");
                            toggleMenu();
                          }}
                        >
                          <img src={magnifier} title="마이페이지" />
                          <h3 className="nav_text">마이페이지</h3>
                          <div className="nav_description">마이페이지</div>
                        </li>
                      </>
                    ) : (
                      <li
                        onClick={() => {
                          navigate("/admin/products");
                          toggleMenu();
                        }}
                      >
                        <img src={managerIcon} title="관리자페이지" />
                        <h3 className="nav_text">관리자페이지</h3>
                        <div className="nav_description">관리자페이지</div>
                      </li>
                    )}
                  </S.Menu>
                </S.MenuBox>
                <div className="logout-icon">
                  <Logout logoutHandler={logoutHandler} />
                </div>
              </>
            )}
          </S.SideBar>
        </>,
        portalElement
      )}
    </>
  );
};

export default HamburgerDropdown;
