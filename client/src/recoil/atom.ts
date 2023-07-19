import { CartItemTypes, LoginUserInfo } from "@/types/shared";
import { atom } from "recoil";

export const cartItemState = atom<CartItemTypes[]>({
  key: "cartItemState",
  default: [
    {
      name: "노랑바지22222",
      price: 1000,
      productId: 2,
      memberId: 5,
      category: "상의",
      title: null,
      content: "안녕안녕",
      imageLink: "ccc2cca4-4503-45e4-b51f-c76a54276bb1.jpg",
      modifyAt: "",
      createAt: "",
      productlike: 0,
      view: 0,
      conditionValue: null,
    },
    {
      name: "하이요",
      price: 1000,
      productId: 4,
      memberId: 5,
      category: "하의",
      title: null,
      content: "방가방가",
      imageLink: "ccc2cca4-4503-45e4-b51f-c76a54276bb1.jpg",
      modifyAt: "",
      createAt: "",
      productlike: 0,
      view: 0,
      conditionValue: null,
    },
  ],
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
