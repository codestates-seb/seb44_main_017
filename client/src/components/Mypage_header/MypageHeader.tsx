import PointIcon from "@/assets/icons/PointIcon";
import * as S from "./style";
import defaultImage from "@/assets/icons/default_image.png";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LoginUserInfo } from "@/types/shared";
import { userInfoSelector } from "@/recoil/selector";
import { IMG_URL } from "@/constants/constants";

interface MypageHeaderProps {
  username?: string;
  title: string;
  point?: number;
}

const MypageHeader = ({ username, title, point }: MypageHeaderProps) => {
  const location = useLocation();
  const shouldRenderDiv = location.pathname.startsWith("/mypage");
  const userInfo = useRecoilValue<LoginUserInfo | null>(userInfoSelector);

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
      <S.ProfileImage
        alt="profile_image"
        src={
          userInfo?.profile ? IMG_URL + "/" + userInfo.profile : defaultImage
        }
      />
      <S.InfoBox>
        <S.ProfileInfo>
          {username ? (
            <>
              <div className="profile_username">
                {username} 의 {title}
              </div>
              <S.PointInfo>
                <PointIcon color={"white"} />
                <span className="profile_point">{point}</span>
              </S.PointInfo>
            </>
          ) : (
            <div className="mypage_title">{title}</div>
          )}
        </S.ProfileInfo>
        {shouldRenderDiv && <S.NavBox>{list}</S.NavBox>}
      </S.InfoBox>
      <S.Spacing />
    </S.Container>
  );
};

export default MypageHeader;
