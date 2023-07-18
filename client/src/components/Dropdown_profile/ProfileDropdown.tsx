import useDetectClose from "../../hooks/useDetectClose";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./style";
import defaultImage from "/images/cat.jpg";
import { delCookie, getName, getRoles } from "@/utils/token";

const ProfileDropdown = () => {
  const [DropdownIsOpen, Ref, DropdownHandler] = useDetectClose();
  const navigate = useNavigate();

  const username = getName();
  const role = getRoles();

  const logoutHandler = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      delCookie();
      navigate("/");
    }
  };

  return (
    <>
      <S.ProfileContainer>
        <div ref={Ref} onClick={DropdownHandler}>
          <div className="profile_nickname">{username} 님</div>
          <img src={defaultImage} />
        </div>
        <S.DropDownContainer isDropped={DropdownIsOpen ? true : false}>
          <ul>
            {role === "user" ? (
              <Link to="/mypage" onClick={DropdownHandler}>
                <li>마이페이지</li>
              </Link>
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
