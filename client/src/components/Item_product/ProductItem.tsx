import "./productitem.css";
import * as S from "./styled";
import React, { useState } from "react";

interface ProductInfo {
  url: string;
  isSell: boolean;
  like: boolean;
  title: string;
  price: string;
}

const ProductItem: React.FC<ProductInfo> = ({
  url,
  isSell,
  like,
  title,
  price,
}) => {
  const [isLike, setIsLike] = useState(like);
  const handleLike = () => setIsLike(!isLike);
  return (
    <S.ProductContainer>
      <S.ImageContainer>
        <S.ProdcutImage src={url} />
        <S.IsSell>{isSell ? "판매완료" : "판매중"}</S.IsSell>
      </S.ImageContainer>
      <S.ContentContainer>
        <S.Content_1>
          <S.Title>{title}</S.Title>
          {isLike ? (
            <S.HeartIcon onClick={handleLike} />
          ) : (
            <S.HeartIcon_empty onClick={handleLike} />
          )}
        </S.Content_1>
        <S.Price>{`${price} 원`}</S.Price>
      </S.ContentContainer>
    </S.ProductContainer>
  );
};

export default ProductItem;
