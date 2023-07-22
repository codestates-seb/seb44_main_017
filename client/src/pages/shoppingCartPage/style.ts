import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 36px 0;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  & li {
    list-style: none;
  }

  & .point_icon_price {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--color-darkblue);
    font-size: 20px;

    & svg {
      @media (max-width: 1200px) {
        width: 14px;
        height: 14px;
      }
    }

    & .item_price {
      font-weight: var(--font-weight-700);
    }
  }

  & .point_icon_price_small {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--color-black);

    & svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const CartLayout = styled.article`
  display: flex;
  gap: 36px;
  padding: 36px;

  @media (max-width: 1023px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ItemBox = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 80%;
  min-width: 200px;
  background-color: rgb(250, 250, 250);

  @media (max-width: 1023px) {
    width: 90%;
  }

  & .cart_label {
    padding: 12px;
    border-bottom: 1px solid var(--color-lightivory);

    @media (max-width: 767px) {
      text-align: center;
    }
  }
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 100px;

  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 80px;
  }

  @media (max-width: 767px) {
    padding: 40px 0 20px;
  }

  & li {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 24px;
    border-bottom: 1px solid var(--color-lightivory);
    padding: 12px;

    @media (max-width: 767px) {
      flex-direction: column;
    }
  }

  & img {
    width: 150px;
    height: 150px;
    border: 2px solid var(--color-darkblue);
    border-radius: 16px;
  }
`;

export const ItemInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-weight: var(--font-weight-700);

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 8px;
  }

  & .info_left {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: start;

    @media (max-width: 767px) {
      align-items: center;
    }
  }

  & .info_right {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  & .delete_icon {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  & .info_category {
    border-radius: 10px;
    background-color: var(--color-darkblue);
    padding: 4px 8px;
    color: #fff;
  }
`;

export const OrderInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  position: sticky;
  height: max-content;
  gap: 24px;
  top: 0;

  @media (max-width: 1023px) {
    width: 90%;
  }

  & .order_btn {
    display: flex;
    justify-content: center;

    & button {
      border-radius: 8px;
      width: 150px;
      height: 32px;
      font-weight: var(--font-weight-700);
      margin-right: 16px;
      font-size: var(--font-size-12);
      border: 0;
      background-color: var(--color-darkblue);
      color: var(--color-white);

      &:hover {
        background-color: #355873;
      }
    }
  }
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: rgb(250, 250, 250);
  padding: 40px 20px;
  min-width: 200px;

  & .order_info {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-16);
    font-weight: var(--font-weight-500);

    @media (max-width: 1200px) {
      font-size: 14px;
    }
  }
`;

export const OrderInfoElement = styled.div`
  border-bottom: 1px solid var(--color-black);
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const OrderInfoSum = styled.div`
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RemainPoint = styled.div<{ total: number }>`
  & span {
    font-weight: var(--font-weight-700);
    color: ${props => (props.total < 0 ? "#d84747" : "#2b475c")};

    @media (max-width: 1200px) {
      font-size: 14px;
    }
  }
`;

export const CheckBox = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  &:checked + label {
    background-color: var(--color-darkblue);
    color: var(--color-white);
  }
`;

export const CheckboxLabel = styled.label`
  padding: 4px 7px;
  height: 15px;
  cursor: pointer;
  border-radius: 40px;
  background-color: rgb(224 230 235);
  font-size: var(--font-size-12);
  color: #383838;
`;

export const EmptyCart = styled.div`
  font-size: 24px;
  color: var(--color-darkblue);
  text-align: center;

  @media (max-width: 767px) {
    font-size: var(--font-size-16);
  }
`;
