import * as S from "./style";
import { getRoles } from "@/utils/token";
import Comment from "@/components/Comment/Comment";
import { useNavigate } from "react-router-dom";
import { ProductType } from "./productInfoPage";
import { IMG_URL } from "@/constants/constants";
import elapsedTime from "./../../utils/elapsedTime";

type ProductProps = {
  productData: ProductType;
  handlePayment: () => void;
  handleDeletePost: () => void;
  setComplete: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: () => void;
};

const ProductInfo = (props: ProductProps) => {
  const {
    productData,
    handlePayment,
    handleDeletePost,
    setComplete,
    addToCart,
  } = props;
  const role = getRoles();
  const navigate = useNavigate();

  return (
    <div>
      <S.ProductInfo>
        <S.ContetntsWrapper>
          <S.ProductImageBox>
            <S.ProductImage src={IMG_URL + "/" + productData.imageLink} />
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
                {/* <h2>{productData.category}</h2> */}
                <h2>{productData.name}</h2>
              </S.LeftWrapper>
              <S.CustomSlider
                defaultValue={productData.conditionValue}
                marks={true}
                step={2}
                min={0}
                max={10}
                disabled
                sx={{
                  width: 100,
                  "& .MuiSlider-thumb": {
                    width: 15,
                    height: 15,
                  },
                }}
              />
            </S.ProductMiddlePart>
            <S.ProductLowerPart>
              <h2>{productData.price} 원</h2>
            </S.ProductLowerPart>
            <S.PostInfo>
              <span className="post_created_at">
                {elapsedTime(new Date(productData.createAt))}
              </span>
              <span className="post_dot">·</span>
              <span className="post_view">조회 {productData.view}</span>
            </S.PostInfo>
            <S.ProductDescription>{productData.content}</S.ProductDescription>
          </S.ProductDetailContainer>
        </S.ContetntsWrapper>
        <S.PurchaseButtonWrapper>
          <S.CartBtn onClick={addToCart}>장바구니</S.CartBtn>
          <S.PaymentBtn onClick={handlePayment}>구매하기</S.PaymentBtn>
        </S.PurchaseButtonWrapper>
        <button className="back_btn" onClick={() => navigate("/productlist")}>
          목록으로
        </button>
      </S.ProductInfo>
      <S.CommentContainer>
        <Comment comments={productData.comments} setComplete={setComplete} />
      </S.CommentContainer>
    </div>
  );
};

export default ProductInfo;
