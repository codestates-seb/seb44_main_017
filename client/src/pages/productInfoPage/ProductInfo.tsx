import * as S from "./style";
import ConditionImg from "@/assets/icons/Condition.svg";

type ProductProps = {
  //   productId: string;
  name: string;
  //   title: string;
  content: string;
  price: number;
  category: string;
  //   memberId: number;
  //   productLike: boolean;
  imageLink: string;
  //   issell: boolean;
  //   createdAt: string;
  //   modifiedAt: string;
  //   conditionValue: "condition integer value";
  //   pointValue: "point integer value";
  // comments: [
  //   {
  //     content: "댓글 내용",
  //     created-at: "YYYY-MM-DD hh-mm-ss";
  //     modified-at: "YYYY-MM-DD hh-mm-ss";
  //   }
  // ];
};

const ProductInfo = (props: ProductProps) => {
  const { name, content, price, category, imageLink } = props;
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
              <S.CategoryBox>{category}</S.CategoryBox>
              <h2>{name}</h2>
              <S.Condition src={ConditionImg} />
            </S.ProductMiddlePart>
            <S.ProductLowerPart>
              <h2>{price}</h2>
            </S.ProductLowerPart>
            <S.ProductDescription>{content}</S.ProductDescription>
          </S.ProductDetailContainer>
        </S.ContetntsWrapper>
        <S.PurchaseButtonWrapper>
          <S.ProductPurchase>구매하기</S.ProductPurchase>
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
