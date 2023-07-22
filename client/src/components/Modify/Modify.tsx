import axios from "axios";
import * as S from "./style";
import { getToken } from "@/utils/token";
import { useState, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { BASE_URL } from "@/constants/constants";

const Modify = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorization, refresh] = getToken();
  const { questionId, noticeID } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const path = location.pathname.startsWith("/notice");

  console.log(location.pathname);
  const registerPost = async () => {
    try {
      const res = await axios.patch(
        path
          ? `${BASE_URL}/notify/${noticeID}`
          : `${BASE_URL}/questions/${questionId}`,
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

  const handleWrapperClick = () => {
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    const confirmDelete = window.confirm("게시물을 수정하시겠습니까?");
    if (confirmDelete && path) {
      registerPost();
      alert("수정이 완료되었습니다.");
      navigate("/notice");
    } else {
      registerPost();
      alert("수정이 완료되었습니다.");
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
      <S.ContentsWrapper onClick={handleWrapperClick}>
        <S.InputContents
          ref={inputRef}
          type="text"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </S.ContentsWrapper>
      <S.BtnWrapper>
        <S.RegisterBtn onClick={handleSubmit}>수정하기</S.RegisterBtn>
      </S.BtnWrapper>
    </S.Container>
  );
};

export default Modify;
