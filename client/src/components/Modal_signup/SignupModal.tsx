import axios from "axios";
import * as yup from "yup";
import * as S from "./style";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../assets/logoSimple";
import { BASE_URL } from "@/constants/constants";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  closeModal: () => void;
}
interface Input {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  phone: string;
}
const schema = yup.object({
  email: yup
    .string()
    .email("이메일은 '@'이 포함되어야합니다.")
    .required("이메일을 입력해주세요."),
  name: yup.string().required("닉네임을 입력해주세요."),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      "비밀번호는 문자, 숫자 포함 8~40자로 입력해주세요."
    )
    .required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호를 다시 확인해주세요."),
  phone: yup
    .string()
    .matches(
      /^010-\d{4}-\d{4}$/,
      "핸드폰 번호는 11자리 숫자와 '-'로 구성되어야 합니다."
    )
    .required("핸드폰 번호를 입력해주세요."),
});

const SignupModal = ({ closeModal }: Props) => {
  const [name, setName] = useState<String>("");
  const [duplicateCheckName, setDuplicateCheckName] = useState<boolean>(false);
  const [formattedPhone, setFormattedPhone] = useState<string>("");
  // 비밀번호 표시
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  // 관리자 여부
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const navigate = useNavigate();

  // 비밀번호 확인 아이콘
  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const passwordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  // 닉네임 중복 여부 체크
  const handleDuplicateCheckName = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/members/namecheck/${name}`,
        { headers: { "ngrok-skip-browser-warning": true } }
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
  // 핸드폰 하이픈 자동 추가
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = event.target.value.replace(/[^0-9]/g, "");
    const formattedPhoneNumber = inputPhoneNumber.replace(
      /^(\d{3})(\d{4})(\d{4})$/,
      "$1-$2-$3"
    );
    setFormattedPhone(formattedPhoneNumber);
  };
  // 훅폼
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: Input) => {
    const requestData = {
      email: data.email,
      name: data.name,
      password: data.password,
      phone: data.phone,
    };
    if (!duplicateCheckName) {
      alert("닉네임 중복 검사를 진행해주세요.");
    } else {
      if (!isAdmin && duplicateCheckName) {
        try {
          const response = await axios.post(
            `${BASE_URL}/members`,
            requestData,
            {
              headers: {
                "ngrok-skip-browser-warning": true,
              },
            }
          );
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
      } else if (isAdmin && duplicateCheckName) {
        try {
          const response = await axios.post(`${BASE_URL}/admin`, requestData, {
            headers: {
              "ngrok-skip-browser-warning": true,
            },
          });
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
    }
  };
  return (
    <S.Container onClick={closeModal}>
      <S.Content
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
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
          {...register("email", { required: true })}
          placeholder="이메일을 입력해주세요."
        />
        <S.NameLabel>
          <S.InputBox
            type="text"
            {...register("name", { required: true })}
            onChange={(e) => setName(e.target.value)}
            placeholder="닉네임을 입력해주세요."
          />
          <S.DuplicateCheck onClick={handleDuplicateCheckName}>
            중복 검사
          </S.DuplicateCheck>
        </S.NameLabel>
        <S.PasswordLabel>
          <S.InputBox
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            placeholder="비밀번호를 입력해주세요."
            autoComplete="off"
          />
          <S.VisibilityButton onClick={passwordVisibility} />
        </S.PasswordLabel>
        <S.PasswordLabel>
          <S.InputBox
            type={showPasswordConfirm ? "text" : "password"}
            {...register("passwordConfirm", { required: true })}
            placeholder="비밀번호를 확인합니다."
            autoComplete="off"
          />
          <S.VisibilityButton onClick={passwordConfirmVisibility} />
        </S.PasswordLabel>
        <S.InputBox
          style={{ marginBottom: "16px" }}
          {...register("phone", { required: true })}
          value={formattedPhone}
          onChange={handlePhoneChange}
          placeholder="핸드폰 번호를 입력해주세요."
        />
        {errors.email && <S.ErrorMsg>{errors.email.message}</S.ErrorMsg>}
        {errors.name && <S.ErrorMsg>{errors.name.message}</S.ErrorMsg>}
        {errors.password && <S.ErrorMsg>{errors.password.message}</S.ErrorMsg>}
        {errors.passwordConfirm && (
          <S.ErrorMsg>{errors.passwordConfirm.message}</S.ErrorMsg>
        )}
        {errors.phone && <S.ErrorMsg>{errors.phone.message}</S.ErrorMsg>}
        <S.AdminLabel>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            style={{ cursor: "pointer", marginRight: "8px" }}
          />
          관리자로 회원가입하기
        </S.AdminLabel>
        <S.SignupButton type="submit">SIGNUP</S.SignupButton>
      </S.Content>
    </S.Container>
  );
};

export default SignupModal;
