import * as S from "./styled";
import FadeIn from "@/components/FadeIn/FadeIn";
import { analzy, shopping, shopping_1, sendClothes } from "../../../assets";
import { useNavigate } from "react-router";

const BannerContainerPc = () => {
  const navigate = useNavigate();
  return (
    <S.BannerContainer>
      <S.TitleBanner>
        <div>
          <FadeIn index={1}>
            <S.SubTitle>환경을 위하는</S.SubTitle>
          </FadeIn>
          <FadeIn index={1}>
            <S.TitleContainer>
              <S.MainTitle>RECLOSET</S.MainTitle>
              <S.RecycleIcon />
            </S.TitleContainer>
          </FadeIn>
          <FadeIn index={1}>
            <S.Describe>매입부터 판매까지 한번에 해결해 드립니다.</S.Describe>
          </FadeIn>
        </div>
        <S.BtnContainer>
          <FadeIn index={2}>
            <S.CollectionBtn
              onClick={() => {
                navigate("/collection");
              }}
            >
              수거 신청하기
            </S.CollectionBtn>
          </FadeIn>
          <FadeIn index={2}>
            <S.ShoppingBtn
              onClick={() => {
                navigate("/productlist/");
              }}
            >
              등록된 상품 보러가기
            </S.ShoppingBtn>
          </FadeIn>
        </S.BtnContainer>
      </S.TitleBanner>
      <S.ImageBanner>
        <FadeIn index={1}>
          <div>
            <S.ShoppingIamge src={shopping_1} />
            <S.AnalzyImage src={analzy} />
          </div>
        </FadeIn>
        <FadeIn index={2}>
          <div>
            <S.OnlineShoppingIamge src={shopping} />
            <S.SendClothesIamge src={sendClothes} />
          </div>
        </FadeIn>
      </S.ImageBanner>
    </S.BannerContainer>
  );
};

export default BannerContainerPc;
