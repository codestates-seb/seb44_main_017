import * as S from "./style";
import Logout from "../../assets/icons/Logout";
import product from "../../assets/product.svg";
import notice from "../../assets/notice.svg";
import clothes from "../../assets/clothes.svg";
import askQuestion from "../../assets/askQuestion.svg";
import magnifier from "../../assets/magnifier.svg";
import cart from "@/assets/cart.svg";
import managerIcon from "@/assets/managerIcon.svg";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import LoginModal from "../Modal_login/LoginModal";
import SignupModal from "../Modal_signup/SignupModal";
import { delCookie } from "@/utils/token";
import { LoginUserInfo } from "@/types/shared";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/recoil/atom";
import Profile from "./Profile";
import SidebarMenu from "./SidebarMenu";

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
  const path = useLocation().pathname;
  const barRef = useRef<HTMLDivElement | null>(null);
  const portalElement = document.getElementById("modal") as HTMLElement;
  const userInfo = useRecoilValue<LoginUserInfo | null>(userInfoState);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModallOpen, setSignupModalOpen] = useState(false);
  const Menus = [
    {
      url: "/productlist",
      imgSrc: product,
      title: "상품 보기",
      role: ["admin", "user"],
    },
    { url: "/collecton", imgSrc: clothes, title: "수거 요청", role: ["user"] },
    {
      url: "/notice",
      imgSrc: notice,
      title: "공지사항",
      role: ["admin", "user"],
    },
    {
      url: "/questions",
      imgSrc: askQuestion,
      title: "Q & A",
      role: ["admin", "user"],
    },
    { url: "/cart", imgSrc: cart, title: "장바구니", role: ["admin", "user"] },
    { url: "/mypage", imgSrc: magnifier, title: "마이페이지", role: ["user"] },
    {
      url: "/admin/products",
      imgSrc: managerIcon,
      title: "관리자페이지",
      role: ["admin"],
    },
  ];

  const logoutHandler = async () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      toggleMenu();
      await delCookie();
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
            <Profile
              userInfo={userInfo}
              setIsOpen={setIsOpen}
              setLoginModalOpen={setLoginModalOpen}
              setSignupModalOpen={setSignupModalOpen}
            />
            {userInfo && (
              <>
                <S.MenuBox>
                  <S.Menu>
                    {Menus.filter(m =>
                      m.role.includes(
                        userInfo.role === "admin" ? "admin" : "user"
                      )
                    ).map(menu => (
                      <SidebarMenu
                        url={menu.url}
                        imgSrc={menu.imgSrc}
                        title={menu.title}
                        toggleMenu={toggleMenu}
                      />
                    ))}
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
