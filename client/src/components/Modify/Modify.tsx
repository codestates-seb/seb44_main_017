import axios from "axios";
import * as S from "./style";
import { getToken } from "@/utils/token";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { BASE_URL } from "@/constants/constants";

type ModifyProps = {
  originalTitle: string;
  originalContents: string;
};

const Modify = (props: ModifyProps) => {
  const { originalTitle, originalContents } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorization, refresh] = getToken();
  const { questionId, boardId } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const path = location.pathname.startsWith("/notice");

  const modifyPost = async () => {
    try {
      const res = await axios.patch(
        path
          ? `${BASE_URL}/notify/${boardId}`
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
      modifyPost();
      alert("수정이 완료되었습니다.");
      navigate("/notice");
    } else if (confirmDelete) {
      modifyPost();
      alert("수정이 완료되었습니다.");
      navigate("/questions");
    }
  };
  useEffect(() => {
    setTitle(originalTitle);
    setContent(originalContents);
  }, [originalTitle, originalContents]);

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
