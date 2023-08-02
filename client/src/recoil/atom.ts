import { CartItemTypes, LoginUserInfo } from "@/types/shared";
import { atom } from "recoil";

export const cartItemState = atom<CartItemTypes[]>({
  key: "cartItemState",
  default: [],
});

export const userInfoState = atom<LoginUserInfo | null>({
  key: "userInfoState",
  default: null,
});
