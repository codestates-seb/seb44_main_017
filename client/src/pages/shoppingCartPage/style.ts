import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 36px 16px 8px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  & li {
    list-style: none;
  }
`;

export const SubHeader = styled.header`
  border-bottom: 2px solid var(--color-black);
  padding: 36px 16px 8px;
`;

export const CartLayout = styled.article`
  display: flex;
`;

export const ItemBox = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 80%;

  & .cart_label {
    padding: 12px;
    border-bottom: 1px solid var(--color-black);
  }
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & li {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 16px;
    border-bottom: 1px solid var(--color-lightivory);
    padding: 12px;
  }

  & img {
    width: 150px;
    height: 150px;
  }
`;

export const ItemInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-weight: var(--font-weight-700);

  & .info_left {
    display: flex;
    gap: 16px;
    align-items: center;
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
`;

export const OrderInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 20%;
  border: 1px solid red;

  & .order_btn {
    display: flex;
    justify-content: center;

    & button {
      border-radius: 16px;
      width: 96px;
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
  width: 100%;
  flex-direction: column;
  border: 1px solid blue;
  gap: 16px;
  background-color: rgb(250, 250, 250);

  & .order_info {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-16);
    font-weight: var(--font-weight-500);
  }
`;
