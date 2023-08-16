import { BASE_URL } from "@/constants/constants";
import { RequestProps } from "./mypage";
import { authFetcher, fetcher } from "./index";
import { LoginUserInfo } from "@/types/shared";

export const getList = async (props: RequestProps) => {
  const { page, size, sortValue } = props;
  const response = await fetcher.get(
    BASE_URL + `/questions/board?page=${page}&size=${size}&sort=${sortValue}`
  );

  return response;
};

export const getDetail = async (props: {
  questionId: string | undefined;
  userInfo?: LoginUserInfo;
}) => {
  const { questionId, userInfo } = props;
  const response = userInfo
    ? authFetcher.get(BASE_URL + `/questions/${questionId}`)
    : fetcher.get(BASE_URL + `/questions/${questionId}`);

  return response;
};
