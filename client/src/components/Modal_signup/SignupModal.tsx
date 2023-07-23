import axios from "axios";
import * as S from "./style";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../assets/logoSimple";
import { BASE_URL } from "@/constants/constants";

interface Props {
  closeModal: any;
}
interface Input {
  email: string;
  name: string;
  password: string;
  checkPassword: string;
  phone: string;
}
const SignupModal = ({ closeModal }: Props) => {
  // 인풋 값
  const [inputs, setInputs] = useState<Input>({
    email: "",
    name: "",
    password: "",
    checkPassword: "",
    phone: "",
  });

  // 유효성 검사
  const [emailError, setEmailError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [duplicateCheckName, setDuplicateCheckName] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [checkPasswordError, setCheckPasswordError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  // 비밀번호 표시
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCheckPassword, setCheckShowPassword] = useState<boolean>(false);
  // 관리자 여부
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const navigate = useNavigate();

  // 비밀번호 확인 아이콘
  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const checkPasswordVisibility = () => {
    setCheckShowPassword(!showCheckPassword);
  };

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    let formattedValue = value;

    if (name === "phone") {
      formattedValue = formattedValue.replace(/-/g, "");
      formattedValue = formattedValue
        .replace(/^(\d{0,3})-?(\d{0,4})-?(\d{0,4}).*$/, "$1-$2-$3")
        .replace(/^(.{13}).*$/, "$1");
    }
    setInputs({
      ...inputs,
      [name]: formattedValue,
    });
  };

  // 닉네임 중복 여부 체크
  const handleDuplicateCheckName = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/members/namecheck/${inputs.name}`
      );
      if (response.data === false) {
        alert("사용 가능한 닉네임입니다.");
        setDuplicateCheckName(true);
      } else if (response.data === true) {
        alert("이미 사용중인 닉네임입니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/;
    const phoneReg = /^010-\d{4}-\d{4}$/;

    !inputs.email.includes("@") ? setEmailError(true) : setEmailError(false);
    inputs.name === "" ? setNameError(true) : setNameError(false);
    !passwordReg.test(inputs.password)
      ? setPasswordError(true)
      : setPasswordError(false);
    inputs.password !== inputs.checkPassword
      ? setCheckPasswordError(true)
      : setCheckPasswordError(false);
    !phoneReg.test(inputs.phone) ? setPhoneError(true) : setPhoneError(false);
    !duplicateCheckName ? alert("닉네임 중복 검사를 진행해주세요.") : "";

    if (
      !emailError &&
      !nameError &&
      !passwordError &&
      !phoneError &&
      !isAdmin
    ) {
      try {
        const data = {
          email: inputs.email,
          name: inputs.name,
          password: inputs.password,
          phone: inputs.phone,
        };
        console.log(data);
        const response = await axios.post(`${BASE_URL}/members`, data);
        if (response.status === 201) {
          alert("회원가입을 축하합니다!");
          closeModal();
          navigate("/");
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
        const data = {
          email: inputs.email,
          name: inputs.name,
          password: inputs.password,
          phone: inputs.phone,
        };

        const response = await axios.post(`${BASE_URL}/admin`, data);
        if (response.status === 201) {
          alert("회원가입을 축하합니다!");
          closeModal();
          navigate("/");
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
      <S.Content onClick={(e) => e.stopPropagation()}>
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
          name="email"
          value={inputs.email}
          placeholder="이메일을 입력해주세요."
          onChange={inputOnChange}
        />
        <S.NameLabel>
          <S.InputBox
            type="text"
            name="name"
            value={inputs.name}
            placeholder="닉네임을 입력해주세요."
            onChange={inputOnChange}
          />
          <S.DuplicateCheck onClick={handleDuplicateCheckName}>
            중복 검사
          </S.DuplicateCheck>
        </S.NameLabel>
        <S.PasswordLabel>
          <S.InputBox
            type={showPassword ? "text" : "password"}
            name="password"
            value={inputs.password}
            placeholder="비밀번호를 입력해주세요."
            onChange={inputOnChange}
          />
          <S.VisibilityButton onClick={passwordVisibility} />
        </S.PasswordLabel>
        <S.PasswordLabel>
          <S.InputBox
            type={showCheckPassword ? "text" : "password"}
            name="checkPassword"
            value={inputs.checkPassword}
            placeholder="비밀번호를 확인합니다."
            onChange={inputOnChange}
          />
          <S.VisibilityButton onClick={checkPasswordVisibility} />
        </S.PasswordLabel>
        <S.InputBox
          style={{ marginBottom: "16px" }}
          placeholder="핸드폰 번호를 입력해주세요."
          name="phone"
          value={inputs.phone}
          onChange={inputOnChange}
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
            onChange={(e) => setIsAdmin(e.target.checked)}
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
