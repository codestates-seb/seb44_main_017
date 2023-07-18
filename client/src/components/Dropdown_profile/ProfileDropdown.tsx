import useDetectClose from "../../hooks/useDetectClose";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./style";
import defaultImage from "/images/cat.jpg";
import { delCookie, getId, getName, getRoles, getToken } from "@/utils/token";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, IMG_URL } from "@/constants/constants";

const ProfileDropdown = () => {
  const [DropdownIsOpen, Ref, DropdownHandler] = useDetectClose();
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  const username = getName();
  const role = getRoles();
  const memberId = getId();

  useEffect(() => {
    if (memberId) {
      const [authorization, refresh] = getToken();

      axios
        .get(BASE_URL + `/members/${memberId}`, {
          headers: {
            Authorization: authorization,
            Refresh: refresh,
          },
        })
        .then(res => setProfileImage(res.data.data.profile));
    } else {
      setProfileImage("");
    }
  }, []);

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
          {memberId ? (
            <img src={IMG_URL + "/" + { profileImage }} />
          ) : (
            <img src={defaultImage} />
          )}
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
