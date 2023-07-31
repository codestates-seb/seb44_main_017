import * as S from "./style";
import * as H from "../Header/styled";
import { LoginUserInfo } from "@/types/shared";
import { IMG_URL } from "@/constants/constants";
import defaultImage from "@/assets/icons/default_image.png";

interface ProfileProps {
  userInfo: LoginUserInfo | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSignupModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile = (props: ProfileProps) => {
  const { userInfo, setIsOpen, setLoginModalOpen, setSignupModalOpen } = props;
  return (
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
  );
};

export default Profile;
