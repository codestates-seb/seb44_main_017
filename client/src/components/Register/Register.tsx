import axios from "axios";
import * as S from "./style";
import { getToken } from "@/utils/token";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "@/constants/constants";

const Register = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorization, refresh] = getToken();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.startsWith("/notice");

  const registerPost = async () => {
    try {
      const res = await axios.post(
        path ? `${BASE_URL}/notify` : `${BASE_URL}/questions`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `${authorization}`,
            Refresh: `${refresh}`,
          },
        }
      );
      console.log("등록 요청 성공:", res.data);
    } catch (e) {
      // 등록 요청이 실패하였을 때 실행할 코드 작성
      console.log("등록 요청 실패:", e);
    }
  };

  const handleSubmit = () => {
    const confirmDelete = window.confirm("게시물을 등록하시겠습니까?");
    if (confirmDelete && path) {
      registerPost();
      alert("등록이 완료되었습니다.");
      navigate("/notice");
    } else if (confirmDelete) {
      registerPost();
      alert("등록이 완료되었습니다.");
      navigate("/questions");
    }
  };

  return (
    <S.Container>
      <S.TitleWrapper>
        <S.InputTitle
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </S.TitleWrapper>
      <S.ContentsWrapper>
        <S.InputContents
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </S.ContentsWrapper>
      <S.BtnWrapper>
        <S.RegisterBtn onClick={handleSubmit}>등록하기</S.RegisterBtn>
      </S.BtnWrapper>
    </S.Container>
  );
};

export default Register;
