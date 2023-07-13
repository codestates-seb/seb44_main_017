import ViewCount from "@/assets/icons/ViewCount";
import * as S from "./style";
import { useNavigate } from "react-router-dom";

interface BoardDetailTypes {
  title: string | undefined;
  name: string | undefined;
  viewCount: number | undefined;
  createdAt: string | undefined;
  content: string | undefined;
  usage: string;
}

/**
 * @ title(제목), name(작성자), viewCount(조회수), createdAt(작성일), content(내용)
 * @ usage: 목록으로 링크 연결을 위한 용도 구분(questions, notify/board)
 */
const BoardDetail = ({
  title,
  name,
  viewCount,
  createdAt,
  content,
  usage,
}: BoardDetailTypes) => {
  const navigate = useNavigate();

  return (
    <S.DetailContainer>
      <S.HeaderBox>
        <h1 className="detail_title">{title}</h1>
        <div className="detail_info">
          <span className="detail_view">
            <ViewCount />
            <span>{viewCount}</span>
          </span>
          <span>닉네임 : {name}</span>
          <span>등록일 : {createdAt}</span>
        </div>
      </S.HeaderBox>
      <S.ContentBox>
        <div>{content}</div>
        <button className="back_btn" onClick={() => navigate(`/${usage}`)}>
          목록으로
        </button>
      </S.ContentBox>
    </S.DetailContainer>
  );
};

export default BoardDetail;
