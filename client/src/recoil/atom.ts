import { CART_ITEMS } from "@/constants/constants";
import { CartItemTypes, LoginUserInfo } from "@/types/shared";
import { atom } from "recoil";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const cartItemState = atom<CartItemTypes[]>({
  key: "cartItemState",
  default: [],
  effects: [localStorageEffect(CART_ITEMS)],
});

export const userInfoState = atom<LoginUserInfo | null>({
  key: "userInfoState",
  default: {
    email: "",
    isBan: false,
    memberId: 0,
    money: 0,
    name: "",
    phone: "",
    profile: "",
    role: "",
  },
});
