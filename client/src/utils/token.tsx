// 토큰 가져오기
type Props = [string | undefined, string | undefined];

export const getToken = (): Props => {
  const cookie: string[] = document.cookie.split(";");
  const authorization: string | undefined = cookie
    .find(c => c.includes("authorization="))
    ?.replace("authorization=", "");
  const refresh: string | undefined = cookie
    .find(c => c.includes("refresh="))
    ?.replace(" refresh=", "");

  return [authorization, refresh];
};

// 사용자, 관리자 닉네임 가져오기
export const getName = () => {
  const cookie: string[] = document.cookie.split(";");
  const name: string | undefined = cookie
    .find(c => c.includes("name="))
    ?.replace(" name=", "");
  return name;
};

// 사용자, 관리자 Id 가져오기
export const getId = () => {
  const cookie: string[] = document.cookie.split(";");
  const id: string | undefined = cookie
    .find(c => c.includes("id="))
    ?.replace(" id=", "");
  return id;
};

// 사용자, 관리자 구분 값 (roles)
// 사용자인 경우 = user
// 관리자인 경우 = admin
export const getRoles = () => {
  const cookie: string[] = document.cookie.split(";");
  const roles: string | undefined = cookie
    .find(c => c.includes("roles="))
    ?.replace(" roles=", "");
  return roles;
};

// 쿠키에 저장된 정보 삭제
// 로그아웃, 회원탈퇴 시 활용
export const delCookie = () => {
  const cookie: string[] = document.cookie.split(";");
  const expiration = "Sat, 01 Jan 1972 00:00:00 GMT";

  let i = 0;
  if (document.cookie) {
    for (i = 0; i < cookie.length; i++) {
      document.cookie = cookie[i].split("=")[0] + "=; expires=" + expiration;
    }
  }
};
