import * as S from "./styled";
import { mobileBannerImage } from "../../../assets";
interface Props {
  clickCollection: () => void;
}
const BannerContainerMobile: React.FC<Props> = ({ clickCollection }) => {
  return (
    <S.BannerContainerMobile>
      <S.MobileBannerImage src={mobileBannerImage} />
      <S.TitleContainerMobile>
        <S.SubTitle>환경을 위하는</S.SubTitle>
        <S.TitleContainer>
          <S.MainTitle>RECLOSET</S.MainTitle>
          <S.RecycleIcon />
        </S.TitleContainer>
        <S.CollectionBtn onClick={clickCollection}>
          수거 신청하기
        </S.CollectionBtn>
      </S.TitleContainerMobile>
    </S.BannerContainerMobile>
  );
};

export default BannerContainerMobile;
