import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { Logo } from "../../assets/logoSimple";
import axios from "axios";
import { BASE_URL } from "@/constants/constants";

interface Props {
  closeModal: any;
}

const LoginModal = ({ closeModal }: Props) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // 유효성 검사
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  // 비밀번호 표시
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // 관리자 여부
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const navigate = useNavigate();

  // 비밀번호 확인 아이콘
  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const googleLoginRequestHandler = () => {
    window.location.assign(
      "http://ec2-43-200-107-103.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google"
    );
  };

  const kakaoLoginRequestHandler = () => {
    window.location.assign(
      "http://ec2-43-200-107-103.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao"
    );
  };

  const handleLogin = async () => {
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/;

    !userName.includes("@") ? setUserNameError(true) : setUserNameError(false);
    !passwordReg.test(password)
      ? setPasswordError(true)
      : setPasswordError(false);

    if (!userNameError && !passwordError && !isAdmin) {
      try {
        const data = { username: userName, password };

        const response: any = await axios.post(`${BASE_URL}/user/login`, data);
        if (response.status === 200) {
          navigate("/");
          closeModal(false);
          const authorization = response.headers.get("authorization");
          const refresh = response.headers.get("refresh");
          document.cookie = `authorization=${authorization}; path=/;`;
          document.cookie = `refresh=${refresh}; path=/; SameSite=none; Secure`;
        }
      } catch (error: any) {
        if (error.response.status === 404 || error.response.status === 500) {
          alert("회원 정보를 확인해주세요.");
        }
      }
    } else if (!userNameError && !passwordError && isAdmin) {
      try {
        const data = { email: userName, password };
        const response: any = await axios.post(`${BASE_URL}/admin/login`, data);
        if (response.status === 200) {
          navigate("/");
          closeModal(false);
          const authorization = response.headers.get("authorization");
          const refresh = response.headers.get("refresh");
          document.cookie = `authorization=${authorization}; path=/;`;
          document.cookie = `refresh=${refresh}; path=/; SameSite=none; Secure`;
        }
      } catch (error: any) {
        if (error.response.status === 404 || error.response.status === 500) {
          alert("회원 정보를 확인해주세요.");
        }
      }
    }
  };
  return (
    <S.Container onClick={closeModal}>
      <S.Content onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={closeModal} />
        <S.LoginTitleContainer>
          <Logo width="40px" height="24px" />
          <S.LoginTitle>LOGIN</S.LoginTitle>
        </S.LoginTitleContainer>
        <S.Explanation>Recloset 로그인 페이지 입니다.</S.Explanation>
        <S.Explanation style={{ marginBottom: "44px" }}>
          계정이 없으시다면 회원을 등록해주세요.
        </S.Explanation>
        <S.InputBox
          type="text"
          value={userName}
          placeholder="이메일을 입력해주세요."
          onChange={(e) => setUserName(e.target.value)}
          style={{ marginBottom: "48px" }}
        />
        <S.PasswordLabel>
          <S.InputBox
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="비밀번호를 입력해주세요."
            onChange={(e) => setPassword(e.target.value)}
          />
          <S.VisibilityButton onClick={passwordVisibility} />
        </S.PasswordLabel>
        {userNameError && (
          <S.ErrorMsg>이메일은 '@'이 포함되어야합니다.</S.ErrorMsg>
        )}
        {passwordError && (
          <S.ErrorMsg style={{ marginBottom: "16px" }}>
            비밀번호는 문자, 숫자 포함 8~40자로 입력해주세요.
          </S.ErrorMsg>
        )}
        <S.AdminLabel>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            style={{ cursor: "pointer", marginRight: "8px" }}
          />
          관리자로 로그인하기
        </S.AdminLabel>
        <S.LoginButton onClick={handleLogin}>LOGIN</S.LoginButton>
        <S.ButtonTest onClick={googleLoginRequestHandler}>구글</S.ButtonTest>
        <S.ButtonTest onClick={kakaoLoginRequestHandler}>카카오</S.ButtonTest>
      </S.Content>
    </S.Container>
  );
};

export default LoginModal;
