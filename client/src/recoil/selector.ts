import { selector } from "recoil";
import { cartItemState, userInfoState } from "./atom";

const userInfoSelector = selector({
  key: "userInfoSelector",
  get: ({ get }) => get(userInfoState),
});

const cartItemsSelector = selector({
  key: "cartItemsSelector",
  get: ({ get }) => get(cartItemState),
});

export { userInfoSelector, cartItemsSelector };
