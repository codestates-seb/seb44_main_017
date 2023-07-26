import { useNavigate } from "react-router";
import * as S from "./styled";
import React, { useState } from "react";
import { commaNumber } from "@/utils/inssertComma";

interface ProductInfo {
  url: string;
  isSell: boolean;
  like: boolean;
  title: string;
  price: number | string | null;
  productId: number | string;
}

const ProductItem: React.FC<ProductInfo> = ({
  url,
  isSell,
  like,
  title,
  price,
  productId,
}) => {
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(like);
  const [imageError, setImageError] = useState(false);
  const handleLike = async (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    try {
      setIsLike(!isLike);
    } catch (err) {
      console.error("Error updating data", err);
    }
  };
  const handleImageError = () => {
    setImageError(true);
  };
  const productstate =(isSell:any,price:any) =>{
    let res = '';
    if(isSell == true){
      res = "판매완료";
    }
    else if(isSell == false && price != 0){
      res = "판매중";
    }else{
      res = "승인대기";
    }
    return res;
  }
  return (
    <S.ProductContainer
      onClick={() => {
        if(price == 0||isSell == true){
          alert("판매중인 상품이 아닙니다.");
        } else{
          navigate(`/products/${productId}`);
        }
      }}
    >
      <S.ImageContainer>
        {!imageError ? (
          <S.ProdcutImage src={url} onError={handleImageError} />
        ) : (
          <S.ImageErrorIcon />
        )}
        <S.IsSell>{productstate(isSell,price)}</S.IsSell>
      </S.ImageContainer>
      <S.ContentContainer>
        <S.Content>
          <S.Title>{title}</S.Title>
          {isLike ? (
            <S.HeartIcon
              onClick={(ev) => {
                handleLike(ev);
              }}
            />
          ) : (
            <S.HeartIcon_empty
              onClick={(ev) => {
                handleLike(ev);
              }}
            />
          )}
        </S.Content>
        <S.Price>{price ? `${commaNumber(price)} 원` : ""}</S.Price>
      </S.ContentContainer>
    </S.ProductContainer>
  );
};

export default ProductItem;
