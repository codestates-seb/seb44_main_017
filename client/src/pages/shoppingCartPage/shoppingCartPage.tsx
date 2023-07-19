import MypageHeader from "@/components/Mypage_header/MypageHeader";
import { BASE_URL, IMG_URL } from "@/constants/constants";
import { CartItemTypes, LoginUserInfo } from "@/types/shared";
import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import * as S from "./style";
import { userInfoSelector } from "@/recoil/selector";
import { cartItemState } from "@/recoil/atom";
import axios from "axios";
import { getToken } from "@/utils/token";

const ShoppingCartPage = () => {
  const userInfo = useRecoilValue<LoginUserInfo | null>(userInfoSelector);
  const [cartItems, setCartItems] =
    useRecoilState<CartItemTypes[]>(cartItemState);
  const [checkedItems, setCheckedItems] = useState<number[]>(
    cartItems.map(item => item.productId)
  );

  const [authorization, refresh] = getToken();

  const orderItems = async () => {
    const { data, status } = await axios.post(
      BASE_URL + "/kakaoPaybucket",
      {
        postnum: "06276",
        address: "선릉로221",
        reciver: "박준용",
        reciverphone: "010-1234-1234",
        pointspend: 0,
      },
      {
        headers: {
          Authorization: authorization,
          Refresh: refresh,
        },
      }
    );

    if ((data && status === 200) || 201) {
      console.log(data);
      window.open(data);
      return data;
    }
  };

  const addToCart = (productId: number) => {
    axios.post(
      BASE_URL + `/orderproducts/${productId}`,
      {},
      {
        headers: {
          Authorization: authorization,
          Refresh: refresh,
        },
      }
    );
  };

  const checkedItemsOrderHandler = () => {
    for (let i = 0; i < checkedItems.length; i++) {
      addToCart(checkedItems[i]);
    }
    orderItems();
  };

  const allItemsOrderHandler = () => {
    for (let i = 0; i < cartItems.length; i++) {
      addToCart(cartItems[i].productId);
    }
    orderItems();
  };

  const removeCartItemHandler = (id: number) => {
    setCartItems(cartItems.filter(item => item.productId !== id));
    setCheckedItems(checkedItems.filter(item => item !== id));
  };

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      setCheckedItems(cartItems.map(item => item.productId));
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckHandler = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter(item => item !== id));
    }
  };

  return (
    <>
      <MypageHeader
        title={"장바구니"}
        username={userInfo?.name}
        point={userInfo?.money}
      />
      <S.Section>
        <S.ItemLayout>
          <S.SubHeader>
            <h2>장바구니 내역</h2>
          </S.SubHeader>
          <S.ItemBox>
            <div className="cart_label">
              <input
                type="checkbox"
                checked={
                  checkedItems.length === cartItems.length ? true : false
                }
                onChange={e => handleAllCheck(e.target.checked)}
              ></input>
              <label>전체 선택</label>
            </div>
            <S.CartItems>
              {cartItems.map(item => (
                <li key={item.productId}>
                  <input
                    type="checkbox"
                    checked={
                      checkedItems.includes(item.productId) ? true : false
                    }
                    onChange={e =>
                      handleCheckHandler(e.target.checked, item.productId)
                    }
                  />
                  <div className="cart_image">
                    <img src={`${IMG_URL}/${item.imageLink}`} />
                  </div>
                  <div className="cart_info">
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                  </div>
                  <div>
                    <button
                      onClick={() => removeCartItemHandler(item.productId)}
                    >
                      삭제
                    </button>
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
              <div>
                <button onClick={checkedItemsOrderHandler}>
                  체크 상품 주문
                </button>
                <button onClick={allItemsOrderHandler}>전체 상품 주문</button>
              </div>
            </div>
          </S.InfoBox>
        </S.InfoLayout>
      </S.Section>
    </>
  );
};

export default ShoppingCartPage;
