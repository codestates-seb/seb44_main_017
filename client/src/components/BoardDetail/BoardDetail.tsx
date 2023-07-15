import ViewCount from "@/assets/icons/ViewCount";
import * as S from "./style";
import { useNavigate } from "react-router-dom";

interface BoardDetailTypes {
  title: string;
  name: string;
  viewCount: number | string;
  createdAt: string;
  content: string;
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
    <S.Container>
      <S.HeaderBox>
        <h1 className="detail_title">{title}</h1>
        <div className="detail_info">
          <span className="detail_view">
            <ViewCount />
            <span>{viewCount}</span>
          </span>
          <span>
            <span className="detail_name">닉네임 : </span>
            <span>{name}</span>
          </span>
          <span>
            <span className="detail_name">등록일 : </span>
            <span>{createdAt}</span>
          </span>
        </div>
      </S.HeaderBox>
      <S.ContentBox>
        <div>{content}</div>
        <button className="back_btn" onClick={() => navigate(`/${usage}`)}>
          목록으로
        </button>
      </S.ContentBox>
    </S.Container>
  );
};

export default BoardDetail;
