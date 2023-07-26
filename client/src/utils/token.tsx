// 토큰 가져오기
type Props = [string | undefined, string | undefined];

export const getToken = (): Props => {
  const cookie: string[] = document.cookie.split(";");
  const authorization: string | undefined = cookie
    .find((c) => c.includes("authorization="))
    ?.replace("authorization=", "");
  const refresh: string | undefined = cookie
    .find((c) => c.includes("refresh="))
    ?.replace(" refresh=", "");

  return [authorization, refresh];
};
