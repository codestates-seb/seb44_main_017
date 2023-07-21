import * as S from "./style";
import { getRoles } from "@/utils/token";
import Comment from "@/components/Comment/Comment";
import ConditionImg from "@/assets/icons/Condition.svg";
import { ProductCommentTypes } from "@/types/shared";
import { useNavigate } from "react-router-dom";
import CartIcon from "@/assets/icons/CartIcon";

type ProductProps = {
  name: string;
  content: string;
  price: number;
  category: string;
  imageLink: string;
  handlePayment: () => void;
  handleDeletePost: () => void;
  comments: ProductCommentTypes[];
  setComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductInfo = (props: ProductProps) => {
  const {
    name,
    content,
    price,
    category,
    imageLink,
    handlePayment,
    handleDeletePost,
    comments,
    setComplete,
  } = props;
  const role = getRoles();
  const navigate = useNavigate();

  return (
    <>
      <S.ProductInfo>
        <S.ContetntsWrapper>
          <S.ProductImageBox>
            <S.ProductImage src={imageLink} />
          </S.ProductImageBox>
          <S.ProductDetailContainer>
            <S.ProductUpperPart>
              <S.SalesBox>판매중</S.SalesBox>
              {role === "admin" ? (
                <S.DeleteBtn onClick={handleDeletePost}>삭제</S.DeleteBtn>
              ) : undefined}
            </S.ProductUpperPart>
            <S.ProductMiddlePart>
              <S.LeftWrapper>
                <S.CategoryBox>{category}</S.CategoryBox>
                <h2>{name}</h2>
              </S.LeftWrapper>
              <S.Condition src={ConditionImg} />
            </S.ProductMiddlePart>
            <S.ProductLowerPart>
              <h2>{price}</h2>
            </S.ProductLowerPart>
            <S.ProductDescription>{content}</S.ProductDescription>
          </S.ProductDetailContainer>
        </S.ContetntsWrapper>
        <S.PurchaseButtonWrapper>
          <S.CartBtn>
            <CartIcon />
            <span>장바구니 담기</span>
          </S.CartBtn>
          <S.PaymentBtn onClick={handlePayment}>구매하기</S.PaymentBtn>
        </S.PurchaseButtonWrapper>
        <button className="back_btn" onClick={() => navigate("/productlist")}>
          목록으로
        </button>
      </S.ProductInfo>
      <S.CommentContainer>
        <Comment comments={comments} setComplete={setComplete} />
      </S.CommentContainer>
    </>
  );
};

export default ProductInfo;
