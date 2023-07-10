import { useLocation } from "react-router";
import * as S from "./styled";
import subTitleImage from "./subtitle_image.png";

interface SubTitleProps {
  title: string;
  isButton: boolean;
  btnTitle?: string;
  btnLink?: string;
}
const SubTitleBar: React.FC<SubTitleProps> = ({
  title,
  isButton,
  btnTitle,
  btnLink,
}) => {
  const location = useLocation();
  const shouldRenderDiv = location.pathname.startsWith("/admin");
  const navButtonList = [
    { name: "회원 관리", href: "/admin/members" },
    { name: "상품 관리", href: "/admin/products" },
    { name: "승인 관리", href: "/admin/approval" },
  ];
  const list = navButtonList.map((nav) => {
    return (
      <S.NavButton key={`${nav.name} button`} href={nav.href}>
        {nav.name}
      </S.NavButton>
    );
  });
  return (
    <S.Container>
      <S.SubTitleImage alt="sub title image" src={subTitleImage} />
      <S.SubTitleBox>
        <S.SubTitle>{title}</S.SubTitle>
        {isButton ? (
          <S.SubTitleButton href={btnLink}>{btnTitle}</S.SubTitleButton>
        ) : (
          <></>
        )}
        {shouldRenderDiv ? (
          <S.AdmitButtonContainer>{list}</S.AdmitButtonContainer>
        ) : (
          <></>
        )}
      </S.SubTitleBox>
      <S.Spacing />
    </S.Container>
  );
};

export default SubTitleBar;
