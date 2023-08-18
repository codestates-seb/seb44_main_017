import * as S from "./style";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useInput from "@/hooks/useInput";
import { cartItemState } from "@/recoil/atom";
import { userInfoSelector } from "@/recoil/selector";
import { useRecoilState, useRecoilValue } from "recoil";
import { CartItemTypes, LoginUserInfo, PostCodeTypes } from "@/types/shared";
import { getCartItemList, orderCheckedCartItems } from "@/api/cart";
import MypageHeader from "@/components/Mypage_header/MypageHeader";
import CartItemList from "./cartItemList";
import AddressInfo from "./addressInfo";
import OrderInfo from "./orderInfo";

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue<LoginUserInfo | null>(userInfoSelector);
  const [total, setTotal] = useState({ price: 0, quantity: 0 });
  const [paymentList, setPaymentList] = useState(",");
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

  const getCartItems = async () => {
    const { data, status } = await getCartItemList();
    if (data && status === 200) {
      setCartItems(data.data);
    }
  };

  const orderItems = async () => {
    if (postCode.address == "") {
      alert("주소를 입력해 주세요.");
    } else {
      try {
        const { data, status } = await orderCheckedCartItems({
          postnum: postCode.postnum,
          address: postCode.address,
          reciver: userInfo?.name,
          reciverphone: userInfo?.phone,
          pointspend: spendPoints,
          productlist: paymentList,
        });

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
      setPaymentList(",");
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
      setPaymentList(unCheckedList.toString());
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
            <AddressInfo postCode={postCode} setPostCode={setPostCode} />
            <S.OrderInfoBox>
              <OrderInfo
                total={total}
                spendPoints={spendPoints}
                pointChangeHandler={pointChangeHandler}
                userInfo={userInfo}
              />
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
