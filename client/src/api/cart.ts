import { BASE_URL } from "@/constants/constants";
import { authFetcher } from ".";
import { PostCodeTypes } from "@/types/shared";

export const getCartItemList = async () => {
  const response = await authFetcher.get(
    BASE_URL + "/orderproducts/bucket?page=1&size=100&sort=newest"
  );

  return response;
};

export const deleteCartItem = async (id: number) => {
  const response = await authFetcher.delete(BASE_URL + `/orderproducts/${id}`);

  return response;
};

export const orderCheckedCartItems = async (data: PostCodeTypes) => {
  const response = await authFetcher.post(BASE_URL + "/kakaoPaybucket", data);

  return response;
};
