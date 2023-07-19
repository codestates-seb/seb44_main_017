import * as S from "./style";
import ConditionImg from "@/assets/icons/Condition.svg";

type ProductProps = {
  name: string;
  content: string;
  price: number;
  category: string;
  imageLink: string;
  handlePayment: () => void;
};

const ProductInfo = (props: ProductProps) => {
  const { name, content, price, category, imageLink, handlePayment } = props;

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
              <S.DeleteBtn>삭제</S.DeleteBtn>
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
          <S.PaymentBtn onClick={handlePayment}>구매하기</S.PaymentBtn>
        </S.PurchaseButtonWrapper>
      </S.ProductInfo>
      <S.CommentContainer>
        코멘트
        {/* <Comment comments={commentData} setComplete={setCommentData} /> */}
      </S.CommentContainer>
    </>
  );
};

export default ProductInfo;
