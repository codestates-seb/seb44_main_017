import * as S from "./style";
import ConditionImg from "@/assets/icons/Condition.svg";

// import ProductItem from "@/components/Item_product/ProductItem";
// import Comment from "@/components/Comment/Comment";

export const ProductInfoPage = () => {
  return (
    <>
      <S.ProductInfo>
        <S.ProductImage>상품이미지</S.ProductImage>
        <S.ProductDetailContainer>
          <S.ProductUpperPart>
            <S.SalesButton>판매중</S.SalesButton>
            <S.DeleteBtn>삭제</S.DeleteBtn>
          </S.ProductUpperPart>
          <S.ProductMiddlePart>
            <S.CategoryButton>카테고리</S.CategoryButton>
            <h2>맨투맨</h2>
            <S.Condition src={ConditionImg} />
          </S.ProductMiddlePart>
          <S.ProductLowerPart>
            <h2>30,000</h2>
          </S.ProductLowerPart>
        </S.ProductDetailContainer>
        <S.ProductDescription>상품 설명</S.ProductDescription>
        <S.ProductPurchase>구매하기</S.ProductPurchase>
      </S.ProductInfo>
      <S.CommentContainer>코멘트</S.CommentContainer>
    </>
  );
};
