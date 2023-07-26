import { useLocation } from "react-router";
import * as S from "./styled";
import subTitleImage from "./subtitle_image.png";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const shouldRenderDiv = location.pathname.startsWith("/admin");
  const navButtonList = [
    { name: "상품 관리", href: "/admin/products" },
    { name: "회원 관리", href: "/admin/users" },
    { name: "승인 관리", href: "/admin/approval" },
  ];
  const list = navButtonList.map(nav => {
    return (
      <S.NavButton
        key={`${nav.name} button`}
        path={nav.href}
        onClick={() => navigate(nav.href)}
      >
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
          <S.SubTitleButton onClick={() => btnLink && navigate(btnLink)}>
            {btnTitle}
          </S.SubTitleButton>
        ) : (
          <></>
        )}
        {shouldRenderDiv ? (
          <S.AdminButtonContainer>{list}</S.AdminButtonContainer>
        ) : (
          <></>
        )}
      </S.SubTitleBox>
      <S.Spacing />
    </S.Container>
  );
};

export default SubTitleBar;
