import Closed from "../../assets/icons/Closed";
import Hamburger from "../../assets/icons/Hamburger";
import useDetectClose from "../../hooks/useDetectClose";
import defaultImage from "/images/cat.jpg";
import * as S from "./style";
import Logout from "../../assets/icons/Logout";
import product from "../../assets/product.svg";
import notice from "../../assets/notice.svg";
import clothes from "../../assets/clothes.svg";
import askQuestion from "../../assets/askQuestion.svg";
import magnifier from "../../assets/magnifier.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HamburgerDropdown = () => {
  const [DropdownIsOpen, Ref, DropdownHandler] = useDetectClose();
  const navigate = useNavigate();

  // TODO: 임시 UI 구현용 state
  const [isLogin, setIsLogin] = useState(false);

  console.log(Ref);

  return (
    <>
      <S.Container>
        <>
          {!DropdownIsOpen ? (
            <div className="hamburger-icon" ref={Ref}>
              <Hamburger DropdownHandler={DropdownHandler} />
            </div>
          ) : (
            <>
              <div className="close-icon">
                <Closed DropdownHandler={DropdownHandler} />
              </div>
              <S.SideBar>
                <S.Profile>
                  {!isLogin ? (
                    <>
                      <div className="auth_btn">
                        <button onClick={() => setIsLogin(true)}>로그인</button>
                        <button onClick={() => navigate("/signup")}>
                          회원가입
                        </button>
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
                          <div className="nav_text">상품 보기</div>
                        </li>
                        <li onClick={() => navigate("#")}>
                          <img src={clothes} />
                          <div className="nav_text">수거 요청</div>
                        </li>
                        <li onClick={() => navigate("#")}>
                          <img src={notice} />
                          <div className="nav_text">공지사항</div>
                        </li>
                        <li onClick={() => navigate("#")}>
                          <img src={askQuestion} />
                          <div>
                            <div className="nav_text">Q&A</div>
                          </div>
                        </li>
                        <li onClick={() => navigate("#")}>
                          <img src={magnifier} />
                          <div className="nav_text">마이페이지</div>
                        </li>
                      </S.Menu>
                    </S.MenuBox>
                    <div className="logout-icon">
                      <Logout setIsLogin={setIsLogin} />
                    </div>
                  </>
                )}
              </S.SideBar>
            </>
          )}
        </>
      </S.Container>
    </>
  );
};

export default HamburgerDropdown;
