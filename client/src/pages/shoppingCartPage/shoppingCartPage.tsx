import MypageHeader from "@/components/Mypage_header/MypageHeader";
import { BASE_URL } from "@/constants/constants";
import { CartItemTypes, LoginUserInfo, PostCodeTypes } from "@/types/shared";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as S from "./style";
import { cartItemState } from "@/recoil/atom";
import axios from "axios";
import { getToken } from "@/utils/token";
import PointIcon from "@/assets/icons/PointIcon";
import Postcode from "@/components/Postcode/Postcode";
import { userInfoSelector } from "@/recoil/selector";
import useInput from "@/hooks/useInput";
import { useNavigate } from "react-router-dom";
import CartItemList from "./cartItemList";

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue<LoginUserInfo | null>(userInfoSelector);
  const [total, setTotal] = useState({ price: 0, quantity: 0 });
  const [spendPoints, pointChangeHandler] = useInput(0);
  const [postCode, setPostCode] = useState<PostCodeTypes>({
    postnum: "",
    address: "",
    reciver: "",
    reciverphone: "",
    pointspend: 0,
    productlist: "",
  });
  const [cartItems, setCartItems] =
    useRecoilState<CartItemTypes[]>(cartItemState);
  const [checkedItems, setCheckedItems] = useState<number[]>(
    cartItems.map(item => item.productId)
  );
  let paymentList = ",";

  const [authorization, refresh] = getToken();
  const [isOpenPostPopup, setIsOpenPostcode] = useState(false);

  const handlePostCode = () => {
    setIsOpenPostcode(!isOpenPostPopup);
  };

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
    if (postCode.address == "") {
      alert("주소를 입력해 주세요.");
    } else {
      try {
        const { data, status } = await axios.post(
          BASE_URL + "/kakaoPaybucket",
          {
            postnum: postCode.postnum,
            address: postCode.address,
            reciver: userInfo?.name,
            reciverphone: userInfo?.phone,
            pointspend: spendPoints,
            productlist: paymentList,
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
          navigate("/productlist");
        }
      } catch (error: any) {
        if (error.response.status === 409) {
          console.log(error.response);
          if (error.response.data.message == "No products in order") {
            alert("결제할 물품을 선택해 주세요.");
          } else if (error.response.data.message == "point_is_not_enough") {
            alert("포인트가 부족합니다.");
          }
        }
      }
      paymentList = ",";
    }
  };

  const checkedItemsOrderHandler = () => {
    if (cartItems.length !== checkedItems.length) {
      const idList = cartItems.map(item => item.productId);
      const unCheckedList = [];

      for (let i = 0; i < idList.length; i++) {
        if (checkedItems.indexOf(idList[i]) === -1) {
          unCheckedList.push(idList[i]);
        }
      }

      paymentList = unCheckedList.toString();
    }
    orderItems();
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
  }, [, checkedItems, cartItems.length, paymentList]);

  return (
    <>
      <MypageHeader
        title={"장바구니"}
        username={userInfo?.name}
        point={userInfo?.money}
      />
      <S.Section>
        <S.CartLayout>
          <CartItemList
            cartItems={cartItems}
            checkedItems={checkedItems}
            setCartItems={setCartItems}
            setCheckedItems={setCheckedItems}
          />
          <S.InfoContainer>
            <div>
              <S.AddressInfo>
                <h3>배송지 정보</h3>
                <div className="post_address">
                  {postCode.address === "" ? (
                    <span>주소를 등록해주세요.</span>
                  ) : (
                    <span>
                      {postCode.address} ({postCode.postnum})
                    </span>
                  )}
                </div>
                <div className="postcode_btn">
                  <button onClick={handlePostCode}>배송지 입력</button>
                  {isOpenPostPopup && (
                    <Postcode postCode={postCode} setPostCode={setPostCode} />
                  )}
                </div>
              </S.AddressInfo>
            </div>

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

                      <span>{total.price.toLocaleString()} 원</span>
                    </div>

                    <div className="order_info">
                      <span>차감 포인트</span>
                      <S.PointInput
                        type="number"
                        value={Number(spendPoints)}
                        onChange={pointChangeHandler}
                      />
                    </div>
                    <S.RemainPoint
                      className="order_info"
                      total={Number(userInfo?.money) - Number(spendPoints)}
                    >
                      <span>남은 포인트</span>
                      <div className="point_icon_price">
                        {Number(userInfo?.money) - Number(spendPoints) < 0 ? (
                          <PointIcon color={"#d84747"} />
                        ) : (
                          <PointIcon color={"#2b475c"} />
                        )}
                        <span className="item_price">
                          {(
                            Number(userInfo?.money) - Number(spendPoints)
                          ).toLocaleString()}
                        </span>
                      </div>
                    </S.RemainPoint>
                  </S.OrderInfoElement>
                  <S.OrderInfoSum>
                    <div className="order_info">
                      <div className="order_price">결제 예정 금액</div>
                      <div>
                        {(total.price - Number(spendPoints)).toLocaleString()}{" "}
                        원
                      </div>
                    </div>
                  </S.OrderInfoSum>
                </div>
              </S.OrderInfo>
              <div className="order_btn">
                <button onClick={checkedItemsOrderHandler}>주문하기</button>
              </div>
            </S.OrderInfoBox>
          </S.InfoContainer>
        </S.CartLayout>
      </S.Section>
    </>
  );
};

export default ShoppingCartPage;
