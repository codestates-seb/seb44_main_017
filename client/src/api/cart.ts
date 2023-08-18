import { BASE_URL } from "@/constants/constants";
import { authFetcher } from ".";

export const deleteCartItem = async (id: number) => {
  const response = await authFetcher.delete(BASE_URL + `/orderproducts/${id}`);

  return response;
};
