import MypageHeader from "@/components/Mypage_header/MypageHeader";
import { BASE_URL, IMG_URL } from "@/constants/constants";
import { CartItemTypes, LoginUserInfo } from "@/types/shared";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import * as S from "./style";
import { userInfoSelector } from "@/recoil/selector";
import { cartItemState } from "@/recoil/atom";
import axios from "axios";
import { getToken } from "@/utils/token";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import PointIcon from "@/assets/icons/PointIcon";

const ShoppingCartPage = () => {
  const userInfo = useRecoilValue<LoginUserInfo | null>(userInfoSelector);
  const [total, setTotal] = useState({ price: 0, quantity: 0 });
  const [cartItems, setCartItems] =
    useRecoilState<CartItemTypes[]>(cartItemState);
  const [checkedItems, setCheckedItems] = useState<number[]>(
    cartItems.map(item => item.productId)
  );

  const [authorization, refresh] = getToken();

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
      window.open(data);
      return data;
    }
  };

  const deleteItem = (id: number) => {
    try {
      axios.delete(BASE_URL + `/orderproducts/${id}`, {
        headers: {
          Authorization: authorization,
          Refresh: refresh,
        },
      });
      setCartItems(cartItems.filter(item => item.productId !== id));
      setCheckedItems(checkedItems.filter(item => item !== id));
    } catch (e) {
      console.error("Failed delete item", e);
    }
  };

  const checkedItemsOrderHandler = () => {
    if (cartItems.length !== checkedItems.length) {
      const idList = cartItems.map(item => item.productId);

      for (let i = 0; i < idList.length; i++) {
        if (checkedItems.indexOf(idList[i]) === -1) {
          deleteItem(idList[i]);
        }
      }
    }
    orderItems();
  };

  const removeCartItemHandler = (id: number) => {
    if (confirm("장바구니에서 삭제하시겠습니까?")) {
      deleteItem(id);
    }
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

  const getTotal = () => {
    let total = {
      price: 0,
      quantity: 0,
    };
    for (let i = 0; i < cartItems.length; i++) {
      if (checkedItems.indexOf(cartItems[i].productId) > -1) {
        total.price += cartItems[i].price;
        total.quantity++;
      }
    }
    return total;
  };

  useEffect(() => {
    setTotal(getTotal());
    getCartItems();
  }, [, checkedItems, cartItems.length]);

  return (
    <>
      <MypageHeader
        title={"장바구니"}
        username={userInfo?.name}
        point={userInfo?.money}
      />
      <S.Section>
        <S.CartLayout>
          <S.ItemBox>
            <div className="cart_label">
              <S.CheckBox
                type="checkbox"
                id="cart_all"
                checked={
                  checkedItems.length === cartItems.length ? true : false
                }
                onChange={e => handleAllCheck(e.target.checked)}
              ></S.CheckBox>
              <S.CheckboxLabel htmlFor="cart_all">전체 선택</S.CheckboxLabel>
            </div>
            <S.CartItems isEmpty={cartItems.length === 0}>
              {Array.isArray(cartItems) && cartItems.length > 0 ? (
                cartItems.map(item => (
                  <li key={item.productId}>
                    <S.CheckBox
                      type="checkbox"
                      id={"cart_" + item.productId}
                      checked={
                        checkedItems.includes(item.productId) ? true : false
                      }
                      onChange={e =>
                        handleCheckHandler(e.target.checked, item.productId)
                      }
                    />
                    <S.CheckboxLabel htmlFor={"cart_" + item.productId}>
                      ✔
                    </S.CheckboxLabel>
                    <div className="cart_image">
                      <img src={`${IMG_URL}/${item.imageLink}`} />
                    </div>
                    <S.ItemInfo>
                      <div className="info_left">
                        <span className="info_category">{item.category}</span>
                        <span>{item.name}</span>
                      </div>
                      <div className="info_right">
                        <div className="point_icon_price">
                          <PointIcon color={"#2b475c"} />
                          <span className="item_price">
                            {item.price.toLocaleString()}
                          </span>
                        </div>
                        <div
                          className="delete_icon"
                          onClick={() => removeCartItemHandler(item.productId)}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    </S.ItemInfo>
                  </li>
                ))
              ) : (
                <S.EmptyCart>장바구니에 상품이 없습니다.</S.EmptyCart>
              )}
            </S.CartItems>
          </S.ItemBox>

          <S.OrderInfoBox>
            <S.OrderInfo>
              <h3>주문 내역</h3>
              <div>
                <S.OrderInfoElement>
                  <div className="order_info">
                    <span>상품 개수</span>
                    <span>{total.quantity}개</span>
                  </div>
                  <div className="order_info">
                    <span>주문 금액</span>

                    <span>{total.price.toLocaleString()}</span>
                  </div>
                  <div className="order_info">
                    <span>배송비</span>
                    <span>무료</span>
                  </div>
                </S.OrderInfoElement>
                <S.OrderInfoSum>
                  <div className="order_info">
                    <span>결제 예정 포인트</span>
                    <span>{total.price.toLocaleString()}</span>
                  </div>
                  <S.RemainPoint
                    className="order_info"
                    total={Number(userInfo?.money) - total.price}
                  >
                    <span>남은 포인트</span>
                    <div className="point_icon_price">
                      {Number(userInfo?.money) - total.price < 0 ? (
                        <PointIcon color={"#d84747"} />
                      ) : (
                        <PointIcon color={"#2b475c"} />
                      )}
                      <span className="item_price">
                        {(
                          Number(userInfo?.money) - total.price
                        ).toLocaleString()}
                      </span>
                    </div>
                  </S.RemainPoint>
                </S.OrderInfoSum>
              </div>
            </S.OrderInfo>
            <div className="order_btn">
              <button onClick={checkedItemsOrderHandler}>주문하기</button>
            </div>
          </S.OrderInfoBox>
        </S.CartLayout>
      </S.Section>
    </>
  );
};

export default ShoppingCartPage;
