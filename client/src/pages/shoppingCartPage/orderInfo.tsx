import * as S from "./style";
import { ChangeEvent } from "react";
import PointIcon from "@/assets/icons/PointIcon";
import { LoginUserInfo } from "@/types/shared";

interface OrderInfoProps {
  total: { price: number; quantity: number };
  spendPoints: number;
  pointChangeHandler: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  userInfo: LoginUserInfo | null;
}

const OrderInfo = (props: OrderInfoProps) => {
  const { total, spendPoints, pointChangeHandler, userInfo } = props;

  return (
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
            <div>{(total.price - Number(spendPoints)).toLocaleString()} 원</div>
          </div>
        </S.OrderInfoSum>
      </div>
    </S.OrderInfo>
  );
};

export default OrderInfo;
