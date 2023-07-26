import * as S from "./NotifyItem.styles";
import { NotifyProps } from "./NotifyItem.type";
import View from "@/assets/icons/view.svg";
import Post from "@/assets/icons/Post.svg";

const NotifyItem = (props: NotifyProps) => {
  const { title, contents, isNew, regDt, viewCount } = props;
  return (
    <S.Notifyitemcard>
      <S.NotifyTitle>{title}</S.NotifyTitle>
      <div>
        <S.PostIt src={Post} alt="" />
      </div>
      <S.NotifyContents>{contents}</S.NotifyContents>
      {isNew && <S.NewBadge>NEW</S.NewBadge>}
      <S.RegInfoWrapper>
        <small>{regDt}</small>
        <div>
          <S.ViewImg src={View} alt="조회수" />
          <small>{viewCount}</small>
        </div>
      </S.RegInfoWrapper>
    </S.Notifyitemcard>
  );
};

export default NotifyItem;
