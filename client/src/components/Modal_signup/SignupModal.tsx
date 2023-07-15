import { useState } from "react";
import axios from "axios";
import * as S from "./style";
import { Logo } from "../../assets/logoSimple";
import { BASE_URL } from "@/constants/constants";

interface Props {
  closeModal: any;
}
const SignupModal = ({ closeModal }: Props) => {
  // 인풋 값
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  // 유효성 검사
  const [emailError, setEmailError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [checkPasswordError, setCheckPasswordError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  // 비밀번호 표시
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCheckPassword, setCheckShowPassword] = useState<boolean>(false);
  // 관리자 여부
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // 비밀번호 확인 아이콘
  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const checkPasswordVisibility = () => {
    setCheckShowPassword(!showCheckPassword);
  };

  const handleSignup = async () => {
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/;
    const phoneReg = /^010-\d{4}-\d{4}$/;

    !email.includes("@") ? setEmailError(true) : setEmailError(false);
    name === "" ? setNameError(true) : setNameError(false);
    !passwordReg.test(password)
      ? setPasswordError(true)
      : setPasswordError(false);
    password !== checkPassword
      ? setCheckPasswordError(true)
      : setCheckPasswordError(false);
    !phoneReg.test(phone) ? setPhoneError(true) : setPhoneError(false);

    if (
      !emailError &&
      !nameError &&
      !passwordError &&
      !phoneError &&
      !isAdmin
    ) {
      try {
        const data = { email, name, password, phone };

        const response = await axios.post(`${BASE_URL}/members`, data);
        if (response.status === 201) {
          alert("회원가입을 축하합니다!");
        }
      } catch (error: any) {
        if (error.response.status === 409) {
          alert("이미 가입된 회원입니다.");
        }
      }
    } else if (
      !emailError &&
      !nameError &&
      !passwordError &&
      !phoneError &&
      isAdmin
    ) {
      try {
        const data = { email, name, password, phone };

        const response = await axios.post(`${BASE_URL}/admin`, data);
        if (response.status === 201) {
          alert("회원가입을 축하합니다!");
        }
      } catch (error: any) {
        if (error.response.status === 409) {
          alert("이미 가입된 회원입니다.");
        }
      }
    }
  };
  return (
    <S.Container onClick={closeModal}>
      <S.Content onClick={e => e.stopPropagation()}>
        <S.CloseButton onClick={closeModal} />
        <S.SignupTitleContainer>
          <Logo width="40px" height="24px" />
          <S.SignupTitle>SIGNUP</S.SignupTitle>
        </S.SignupTitleContainer>
        <S.Explanation>Recloset회원가입 페이지입니다.</S.Explanation>
        <S.Explanation style={{ marginBottom: "16px" }}>
          계정이 없으시다면 회원을 등록해주세요.
        </S.Explanation>
        <S.InputBox
          type="text"
          value={email}
          placeholder="이메일을 입력해주세요."
          onChange={e => setEmail(e.target.value)}
        />
        <S.NameLabel>
          <S.InputBox
            type="text"
            value={name}
            placeholder="닉네임을 입력해주세요."
            onChange={e => setName(e.target.value)}
          />
          <S.DuplicateCheck>중복 검사</S.DuplicateCheck>
        </S.NameLabel>
        <S.PasswordLabel>
          <S.InputBox
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="비밀번호를 입력해주세요."
            onChange={e => setPassword(e.target.value)}
          />
          <S.VisibilityButton onClick={passwordVisibility} />
        </S.PasswordLabel>
        <S.PasswordLabel>
          <S.InputBox
            type={showCheckPassword ? "text" : "password"}
            value={checkPassword}
            placeholder="비밀번호를 확인합니다."
            onChange={e => setCheckPassword(e.target.value)}
          />
          <S.VisibilityButton onClick={checkPasswordVisibility} />
        </S.PasswordLabel>
        <S.InputBox
          style={{ marginBottom: "4px" }}
          placeholder="핸드폰 번호를 입력해주세요."
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        {emailError && (
          <S.ErrorMsg>이메일은 '@'이 포함되어야합니다.</S.ErrorMsg>
        )}
        {nameError && <S.ErrorMsg>닉네임을 입력해주세요.</S.ErrorMsg>}
        {passwordError && (
          <S.ErrorMsg>
            비밀번호는 문자, 숫자 포함 8~40자로 입력해주세요.
          </S.ErrorMsg>
        )}
        {checkPasswordError && (
          <S.ErrorMsg>비밀번호를 다시 확인해주세요.</S.ErrorMsg>
        )}
        {phoneError && (
          <S.ErrorMsg>
            핸드폰 번호는 11자리 숫자와 '-'로 구성되어야 합니다.
          </S.ErrorMsg>
        )}
        <S.AdminLabel>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={e => setIsAdmin(e.target.checked)}
            style={{ cursor: "pointer", marginRight: "8px" }}
          />
          관리자로 회원가입하기
        </S.AdminLabel>
        <S.SignupButton onClick={handleSignup}>SIGNUP</S.SignupButton>
      </S.Content>
    </S.Container>
  );
};

export default SignupModal;
