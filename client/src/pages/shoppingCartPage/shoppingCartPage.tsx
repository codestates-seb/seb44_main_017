import MypageHeader from "@/components/Mypage_header/MypageHeader";
import { BASE_URL, CART_ITEMS, IMG_URL } from "@/constants/constants";
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

  const init = () => {
    const initialValues = [
      {
        name: "노랑바지22222",
        price: 1000,
        productId: 2,
        memberId: 5,
        category: "상의",
        title: null,
        content:
          "이 상품은 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 상품은 4일 안에 당신 곁을 떠나야 하는",
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
    ];

    if (localStorage.getItem(CART_ITEMS)) {
      localStorage.removeItem(CART_ITEMS);
    }

    localStorage.setItem(CART_ITEMS, JSON.stringify(initialValues));
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
      localStorage.removeItem(CART_ITEMS);
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
    init();
  }, [, checkedItems]);

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
              ))}
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
