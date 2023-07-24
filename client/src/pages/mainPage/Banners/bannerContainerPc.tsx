import * as S from "./styled";
import FadeIn from "@/components/FadeIn/FadeIn";
import { analzy, shopping, shopping_1, sendClothes } from "../../../assets";
import { useNavigate } from "react-router";
interface Props {
  clickCollection: () => void;
}
const BannerContainerPc: React.FC<Props> = ({ clickCollection }) => {
  const navigate = useNavigate();
  return (
    <FadeIn index={1}>
      <S.BannerContainer>
        <S.TitleBanner>
          <div>
            <S.SubTitle>환경을 위하는</S.SubTitle>
            <S.TitleContainer>
              <S.MainTitle>RECLOSET</S.MainTitle>
              <S.RecycleIcon />
            </S.TitleContainer>
            <S.Describe>매입부터 판매까지 한번에 해결해 드립니다.</S.Describe>
          </div>
          <S.BtnContainer>
            <S.CollectionBtn onClick={clickCollection}>
              수거 신청하기
            </S.CollectionBtn>
            <S.ShoppingBtn
              onClick={() => {
                navigate("/productlist/");
              }}
            >
              등록된 상품 보러가기
            </S.ShoppingBtn>
          </S.BtnContainer>
        </S.TitleBanner>
        <S.ImageBanner>
          <div>
            <S.ShoppingIamge src={shopping_1} />
            <S.AnalzyImage src={analzy} />
          </div>
          <div>
            <S.OnlineShoppingIamge src={shopping} />
            <S.SendClothesIamge src={sendClothes} />
          </div>
        </S.ImageBanner>
      </S.BannerContainer>
    </FadeIn>
  );
};

export default BannerContainerPc;
