import ViewCount from "@/assets/icons/ViewCount";
import * as S from "./style";

interface BoardDetailTypes {
  title: string;
  name: string;
  viewCount: number;
  createdAt: string;
}

const BoardDetailHeader = ({
  title,
  name,
  viewCount,
  createdAt,
}: BoardDetailTypes) => {
  return (
    <S.HeaderContainer>
      <S.HeaderBox>
        <h1 className="detail_title">{title}</h1>
        <div className="detail_info">
          <span>닉네임 : {name}</span>
          <span className="detail_view">
            <ViewCount />
            <span>{viewCount}</span>
          </span>
          <span>등록일 : {createdAt}</span>
        </div>
      </S.HeaderBox>
    </S.HeaderContainer>
  );
};

export default BoardDetailHeader;
