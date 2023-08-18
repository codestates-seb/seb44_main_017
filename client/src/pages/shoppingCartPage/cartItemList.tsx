import { IMG_URL } from "@/constants/constants";
import * as S from "./style";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { CartItemTypes } from "@/types/shared";
import { deleteCartItem } from "@/api/cart";

interface CartItemsListProps {
  cartItems: CartItemTypes[];
  checkedItems: number[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemTypes[]>>;
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>;
}

const CartItemList = (props: CartItemsListProps) => {
  const { cartItems, checkedItems, setCartItems, setCheckedItems } = props;

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

  const deleteItem = async (id: number) => {
    try {
      const { status } = await deleteCartItem(id);
      if (status === 204) {
        setCartItems(cartItems.filter(item => item.productId !== id));
        setCheckedItems(checkedItems.filter(item => item !== id));
      }
    } catch (e) {
      console.error("Failed delete item", e);
    }
  };

  return (
    <S.ItemBox>
      <div className="cart_label">
        <S.CheckBox
          type="checkbox"
          id="cart_all"
          checked={checkedItems.length === cartItems.length ? true : false}
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
                checked={checkedItems.includes(item.productId) ? true : false}
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
                    <span className="item_price">
                      {item.price.toLocaleString()} 원
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
  );
};

export default CartItemList;
