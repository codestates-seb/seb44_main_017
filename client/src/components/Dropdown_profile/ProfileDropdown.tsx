import useDetectClose from "../../hooks/useDetectClose";
import { Link } from "react-router-dom";
import * as S from "./style";
import defaultImage from "/images/cat.jpg";

const ProfileDropdown = () => {
  const [DropdownIsOpen, Ref, DropdownHandler] = useDetectClose();

  return (
    <>
      <S.ProfileContainer>
        <div ref={Ref} onClick={DropdownHandler}>
          <div className="profile_nickname">고양이 귀여워 님</div>
          <img src={defaultImage} />
        </div>
        <S.DropDownContainer isDropped={DropdownIsOpen ? true : false}>
          <ul>
            <Link to="#" onClick={DropdownHandler}>
              <li>마이페이지</li>
            </Link>
            <li onClick={() => alert("로그아웃 구현할 예정입니다.")}>LOGOUT</li>
          </ul>
        </S.DropDownContainer>
      </S.ProfileContainer>
    </>
  );
};

export default ProfileDropdown;
