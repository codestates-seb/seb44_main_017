import useDetectClose from "../../hooks/useDetectClose";
import { Link, useLocation } from "react-router-dom";
import * as S from "./style";
import defaultImage from "/images/cat.jpg";
import { delCookie } from "@/utils/token";
import { IMG_URL } from "@/constants/constants";
import { useRecoilValue } from "recoil";
import { LoginUserInfo } from "@/types/shared";
import { userInfoSelector } from "@/recoil/selector";

const ProfileDropdown = () => {
  const path = useLocation().pathname;
  const [DropdownIsOpen, Ref, DropdownHandler] = useDetectClose();
  const userInfo = useRecoilValue<LoginUserInfo | null>(userInfoSelector);
  const logoutHandler = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      delCookie();
      if (path === "/") {
        window.location.reload();
      } else {
        window.location.href = "/";
      }
    }
  };
  return (
    <>
      <S.ProfileContainer>
        <div ref={Ref} onClick={DropdownHandler}>
          <div className="profile_nickname">{userInfo?.name}</div>
          {userInfo?.profile ? (
            <img src={IMG_URL + "/" + userInfo.profile} />
          ) : (
            <img src={defaultImage} />
          )}
        </div>
        <S.DropDownContainer isDropped={DropdownIsOpen ? true : false}>
          <ul>
            <Link to="/cart" onClick={DropdownHandler}>
              <li>장바구니</li>
            </Link>
            {userInfo?.role === "user" ? (
              <>
                <Link to="/mypage" onClick={DropdownHandler}>
                  <li>마이페이지</li>
                </Link>
              </>
            ) : (
              <Link to="/admin/products" onClick={DropdownHandler}>
                <li>관리자페이지</li>
              </Link>
            )}
            <li onClick={logoutHandler}>LOGOUT</li>
          </ul>
        </S.DropDownContainer>
      </S.ProfileContainer>
    </>
  );
};

export default ProfileDropdown;
