import { BASE_URL } from "@/constants/constants";
import { authFetcher } from ".";

interface RequestProps {
  page: number;
  size: number;
  sortValue: string;
}

export const getCollectedProducts = async (props: RequestProps) => {
  const { page, size, sortValue } = props;
  const response = await authFetcher.get(
    BASE_URL +
      `/members/${sortValue}?page=${page}&size=${size}&sort=${sortValue}`
  );

  return response;
};

export const getPurchasedProducts = async (props: RequestProps) => {
  const { page, size, sortValue } = props;
  const response = await authFetcher.get(
    BASE_URL +
      `/orderproducts/buybucket?page=${page}&size=${size}&sort=${sortValue}`
  );

  return response;
};

export const getMyQnaList = async (props: RequestProps) => {
  const { page, size, sortValue } = props;
  const response = await authFetcher.get(
    BASE_URL + `/members/getqna?page=${page}&size=${size}&sort=${sortValue}`
  );

  return response;
};
