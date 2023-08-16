import { BASE_URL } from "@/constants/constants";
import { RequestProps } from "./mypage";
import { authFetcher } from ".";

export const getList = async (props: RequestProps) => {
  const { page, size, sortValue } = props;
  const response = await authFetcher.get(
    BASE_URL + `/questions/board?page=${page}&size=${size}&sort=${sortValue}`
  );

  return response;
};
