import ViewCount from "@/assets/icons/ViewCount";
import * as S from "./style";
import { useNavigate } from "react-router-dom";

interface BoardDetailTypes {
  title: string | undefined;
  name: string | undefined;
  viewCount: number | undefined;
  createdAt: string | undefined;
  content: string | undefined;
}

const BoardDetail = ({
  title,
  name,
  viewCount,
  createdAt,
  content,
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
        <button className="back_btn" onClick={() => navigate(-1)}>
          목록으로
        </button>
      </S.ContentBox>
    </S.DetailContainer>
  );
};

export default BoardDetail;
