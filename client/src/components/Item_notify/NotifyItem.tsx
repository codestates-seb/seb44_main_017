import * as S from "./style";
import View from "@/assets/icons/view.svg";
import Post from "@/assets/icons/Post.svg";

type NotifyProps = {
  title: string;
  contents: string;
  isNew?: boolean;
  regDt: string;
  viewCount: number;
};

const NotifyItem = (props: NotifyProps) => {
  const { title, contents, isNew, regDt, viewCount } = props;
  return (
    <S.Notifyitemcard>
      <S.NotifyTitle>{title}</S.NotifyTitle>
      <div>
        <S.PostIt src={Post} alt="포스트잇 이미지" />
      </div>
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
