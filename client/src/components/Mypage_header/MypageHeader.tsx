import PointIcon from "@/assets/icons/PointIcon";
import * as S from "./style";
import defaultImage from "@/assets/icons/default_image.png";

interface MypageHeaderProps {
  username?: string;
  title: string;
  point?: number;
}

const MypageHeader = ({ username, title, point }: MypageHeaderProps) => {
  const navButtonList = [
    { name: "상품 관리", href: "/mypage" },
    { name: "질문 관리", href: "/mypage/posts" },
    { name: "나의 정보", href: "/mypage/info" },
  ];

  const list = navButtonList.map(nav => {
    return (
      <S.NavButton key={`${nav.name} button`} href={nav.href}>
        {nav.name}
      </S.NavButton>
    );
  });

  return (
    <S.Container>
      <S.ProfileImage alt="profile_image" src={defaultImage} />
      <S.InfoBox>
        <S.ProfileInfo>
          {username ? (
            <>
              <div className="profile_username">
                {username} 의 {title}
              </div>
              <S.PointInfo>
                <PointIcon />
                <span className="profile_point">{point}</span>
              </S.PointInfo>
            </>
          ) : (
            <div className="mypage_title">{title}</div>
          )}
        </S.ProfileInfo>
        <S.NavBox>{list}</S.NavBox>
      </S.InfoBox>
      <S.Spacing />
    </S.Container>
  );
};

export default MypageHeader;
