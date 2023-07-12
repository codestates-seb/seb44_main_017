import ViewCount from "@/assets/icons/ViewCount";
import * as S from "./style";

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
      </S.ContentBox>
    </S.DetailContainer>
  );
};

export default BoardDetail;
