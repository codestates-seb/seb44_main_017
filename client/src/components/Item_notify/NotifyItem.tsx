import * as S from "./style";
import View from "@/assets/icons/view.svg";
import { useNavigate } from "react-router-dom";

type NotifyProps = {
  boardId: number;
  title: string;
  contents: string;
  isNew?: boolean;
  regDt: string;
  viewCount: number;
};

const NotifyItem = (props: NotifyProps) => {
  const { boardId, title, contents, isNew, regDt, viewCount } = props;
  const navigate = useNavigate();

  return (
    <S.Notifyitemcard onClick={() => navigate(`/notice/detail/${boardId}`)}>
      <S.NotifyTitle>{title}</S.NotifyTitle>
      <S.NotifyContents>{contents}</S.NotifyContents>
      {isNew && <S.NewBadge>NEW</S.NewBadge>}
      <S.RegInfoWrapper>
        <S.RegDt>{regDt.slice(0, 10)}</S.RegDt>
        <div>
          <S.ViewImg src={View} alt="조회수" />
          <S.ViewCount>{viewCount}</S.ViewCount>
        </div>
      </S.RegInfoWrapper>
    </S.Notifyitemcard>
  );
};

export default NotifyItem;
