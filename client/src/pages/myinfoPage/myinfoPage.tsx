import axios from "axios";
import { getToken } from "@/utils/token";
import * as S from "@/pages/myinfoPage/style";
import { useNavigate } from "react-router-dom";
import { BASE_URL, IMG_URL } from "@/constants/constants";
import { getId, delCookie } from "@/utils/token";
import React, { useEffect, useRef, useState } from "react";
import defaultImage from "@/assets/icons/default_image.png";
import MypageHeader from "@/components/Mypage_header/MypageHeader";

interface MemberData {
  email: string;
  profile: string;
  name: string;
  phone: string;
}

export const MyinfoPage = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [profile, setProfile] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCheckPassword, setCheckShowPassword] = useState<boolean>(false);

  const [nameInput, setNameInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setpasswordCheck] = useState<string>("");

  const [preview, setPreview] = useState<string>("");
  const imgRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const memberID = getId();
  const getMember = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/members/${memberID}`);
      const memberData: MemberData = response.data.data;
      setEmail(memberData.email);
      setName(memberData.name);
      setPhone(memberData.phone);
      setProfile(memberData.profile);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMember();
  });

  const [authorization, refresh] = getToken();

  const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imgFile = e.target.files[0];
      const imgUrl = URL.createObjectURL(imgFile);

      setPreview(imgUrl);

      const formData = new FormData();
      formData.append("multipartFile", imgFile);
      try {
        const response = await axios.patch(
          `${BASE_URL}/members/image/${memberID}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${authorization}`,
              Refresh: `${refresh}`,
            },
          }
        );
        if (response.status === 200) {
          alert("이미지가 변경되었습니다.");
          setPreview(profile);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const uploadImgButton = () => {
    imgRef.current?.click();
  };

  const handleWithdrawa = async () => {
    const confirm = window.confirm("정말 탈퇴하시겠어요?");
    if (confirm === true) {
      try {
        const response = await axios.delete(`${BASE_URL}/members/${memberID}`);
        if (response.status === 204) {
          alert("정상적으로 탈퇴되었습니다.");
          delCookie();
        }
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDuplicateCheckName = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/members/namecheck/${nameInput}`
      );
      if (response.data === false) {
        alert("사용 가능한 닉네임입니다.");
      } else if (response.data === true) {
        alert("이미 사용중인 닉네임입니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const checkPasswordVisibility = () => {
    setCheckShowPassword(!showCheckPassword);
  };

  const handleSubmit = async () => {
    if (password !== passwordCheck) {
      alert("비밀번호를 확인해주세요.");
    } else {
      const data = { name: nameInput, phone: phoneInput, password };
      try {
        const response = await axios.patch(
          `${BASE_URL}/members/${memberID}`,
          data
        );
        if (response.status === 200) {
          alert("회원 정보가 수정되었습니다.");
        }
      } catch (error) {
        alert("입력하신 내용을 확인해주세요.");
        console.log(error);
      }
    }
  };

  return (
    <>
      <MypageHeader title={"회원 정보 수정"} />
      <S.InfoContainer>
        <S.ImgBox>
          <S.ImgPreview
            src={
              profile
                ? `${IMG_URL}/${profile}`
                : preview
                ? preview
                : defaultImage
            }
          />
          <S.ImgContent
            type="file"
            accept="image/*"
            ref={imgRef}
            onChange={uploadImg}
          />
          <S.ImgChangeButton onClick={uploadImgButton}>
            이미지 변경
          </S.ImgChangeButton>
        </S.ImgBox>
        <S.InfoBox>
          <S.InfoContentBox>
            <S.InfoTitle>이메일</S.InfoTitle>
            <S.InfoContent>{email}</S.InfoContent>
            <S.WithdrawalButton onClick={handleWithdrawa}>
              회원탈퇴
            </S.WithdrawalButton>
          </S.InfoContentBox>
          <S.InfoContentBox>
            <S.InfoTitle>닉네임</S.InfoTitle>
            <S.InfoInputbox>
              <S.InfoInput
                type="text"
                value={nameInput}
                placeholder={name}
                onChange={(e) => setNameInput(e.target.name)}
              />
              <S.DuplicateCheck onClick={handleDuplicateCheckName}>
                중복 검사
              </S.DuplicateCheck>
            </S.InfoInputbox>
          </S.InfoContentBox>
          <S.InfoContentBox>
            <S.InfoTitle>전화번호</S.InfoTitle>
            <S.InfoInputbox>
              <S.InfoInput
                type="text"
                value={phoneInput}
                placeholder={phone}
                onChange={(e) => setPhoneInput(e.target.value)}
              />
            </S.InfoInputbox>
          </S.InfoContentBox>
          <S.InfoContentBox>
            <S.InfoTitle>비밀번호</S.InfoTitle>
            <S.InfoInputbox>
              <S.InfoInput
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <S.VisibilityButton onClick={passwordVisibility} />
            </S.InfoInputbox>
          </S.InfoContentBox>
          <S.InfoContentBox>
            <S.InfoTitle>비밀번호 확인</S.InfoTitle>
            <S.InfoInputbox>
              <S.InfoInput
                type={showPassword ? "text" : "password"}
                value={passwordCheck}
                onChange={(e) => setpasswordCheck(e.target.value)}
              />
              <S.VisibilityButton onClick={checkPasswordVisibility} />
            </S.InfoInputbox>
          </S.InfoContentBox>
          <S.InfoContentBox>
            <S.SubmitButton onClick={handleSubmit}>수정하기</S.SubmitButton>
          </S.InfoContentBox>
        </S.InfoBox>
      </S.InfoContainer>
    </>
  );
};

export default MyinfoPage;
