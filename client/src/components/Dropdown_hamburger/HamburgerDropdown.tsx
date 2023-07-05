import defaultImage from "/images/cat.jpg";
import * as S from "./style";
import * as H from "../Header/styled";
import Logout from "../../assets/icons/Logout";
import product from "../../assets/product.svg";
import notice from "../../assets/notice.svg";
import clothes from "../../assets/clothes.svg";
import askQuestion from "../../assets/askQuestion.svg";
import magnifier from "../../assets/magnifier.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Backdrop from "./backdrop";

// TODO: 로그인, 회원가입 버튼 중앙으로 옮기기
// TODO: nav list 글자 정렬(Q&A)
// TODO: 드롭다운 UI 손보기

interface Props {
  isOpen: boolean;
  toggleMenu: () => void;
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const HamburgerDropdown = ({ isOpen, toggleMenu, headerRef }: Props) => {
  const portalElement = document.getElementById("modal") as HTMLElement;
  const navigate = useNavigate();

  const barRef = useRef<HTMLDivElement | null>(null);

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

  // 임시 UI 구현용 state
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      {createPortal(
        <>
          {isOpen && <Backdrop />}
          <S.SideBar isOpen={isOpen} ref={barRef}>
            <S.Profile>
              {!isLogin ? (
                <>
                  <div className="auth_btn">
                    <H.LoginBtn onClick={() => setIsLogin(true)}>
                      LOGIN
                    </H.LoginBtn>
                    <H.SignupBtn onClick={() => navigate("/signup")}>
                      SIGN UP
                    </H.SignupBtn>
                  </div>
                </>
              ) : (
                <>
                  <img src={defaultImage} />
                  <div className="profile_text">고양이 귀여워 님</div>
                  <div></div>
                </>
              )}
            </S.Profile>
            {isLogin && (
              <>
                <S.MenuBox>
                  <S.Menu>
                    <li onClick={() => navigate("#")}>
                      <img src={product} />
                      <h3 className="nav_text">상품 보기</h3>
                    </li>
                    <li onClick={() => navigate("#")}>
                      <img src={clothes} />
                      <h3 className="nav_text">수거 요청</h3>
                    </li>
                    <li onClick={() => navigate("#")}>
                      <img src={notice} />
                      <h3 className="nav_text">공지사항</h3>
                    </li>
                    <li onClick={() => navigate("#")}>
                      <img src={askQuestion} />
                      <div>
                        <h3 className="nav_text">Q & A</h3>
                      </div>
                    </li>
                    <li onClick={() => navigate("#")}>
                      <img src={magnifier} />
                      <h3 className="nav_text">마이페이지</h3>
                    </li>
                  </S.Menu>
                </S.MenuBox>
                <div className="logout-icon">
                  <Logout setIsLogin={setIsLogin} />
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
