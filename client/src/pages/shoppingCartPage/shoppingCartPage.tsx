import MypageHeader from "@/components/Mypage_header/MypageHeader";
import { BASE_URL, IMG_URL } from "@/constants/constants";
import { cartItemState } from "@/recoil/atom";
import { CartItemTypes, UserInfoTypes } from "@/types/shared";
import { getId, getName, getToken } from "@/utils/token";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import * as S from "./style";

const ShoppingCartPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfoTypes>();
  const [cartItems, setCartItems] =
    useRecoilState<CartItemTypes[]>(cartItemState);
  const memberId = getId();
  const username = getName();

  const [authorization, refresh] = getToken();

  console.log(document.cookie);

  const getCartItems = () => {
    axios
      .get(BASE_URL + "/orderproducts/bucket?page=1&size=100&sort=newest", {
        headers: {
          Authorization: authorization,
          Refresh: refresh,
        },
      })
      .then(res => setCartItems(res.data.data));
  };

  const getUserInfo = () => {
    axios
      .get(BASE_URL + `/members/${memberId}`, {
        headers: {
          Authorization: authorization,
          Refresh: refresh,
        },
      })
      .then(res => setUserInfo(res.data.data));
  };

  useEffect(() => {
    getUserInfo();
    getCartItems();
  }, []);

  return (
    <>
      <MypageHeader
        title={"장바구니"}
        username={username}
        point={userInfo?.money}
      />
      <S.Section>
        <S.ItemLayout>
          <S.SubHeader>
            <h2>장바구니 내역</h2>
          </S.SubHeader>
          <S.ItemBox>
            <div className="cart_label">
              <input type="checkbox"></input>
              <label>전체 선택</label>
            </div>
            <S.CartItems>
              {cartItems.map(item => (
                <li key={item.productId}>
                  <input type="checkbox" />
                  <div className="cart_image">
                    <img src={`${IMG_URL}/${item.imageLink}`} />
                  </div>
                  <div className="cart_info">
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                  </div>
                </li>
              ))}
            </S.CartItems>
          </S.ItemBox>
        </S.ItemLayout>

        <S.InfoLayout>
          <S.InfoBox>
            <div>
              <h3>주문 합계</h3>
              <div>
                <span>총 아이템 개수 : </span>
                <span>{cartItems.length}개</span>
              </div>
              <div>
                <span>합계 : </span>
                <span>
                  {cartItems
                    .reduce((sum, item) => sum + item.price, 0)
                    .toLocaleString()}
                  원
                </span>
              </div>
            </div>
          </S.InfoBox>
        </S.InfoLayout>
      </S.Section>
    </>
  );
};

export default ShoppingCartPage;
