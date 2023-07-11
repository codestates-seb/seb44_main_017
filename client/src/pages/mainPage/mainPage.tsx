import * as S from "./styled";
import BannerContainerPc from "./bannerContainerPc";
import BannerContainerMobile from "./bannerContainerMobile";
export const MainPage = () => {
  return (
    <S.MainPageContainer>
      <BannerContainerPc />
      <BannerContainerMobile />
      <div>의류 리스트</div>
    </S.MainPageContainer>
  );
};
