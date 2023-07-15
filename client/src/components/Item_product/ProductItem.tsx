import { useNavigate } from "react-router";
import * as S from "./styled";
import React, { useState } from "react";
import axios from "axios";

interface ProductInfo {
  url: string;
  isSell: boolean;
  like: boolean;
  title: string;
  price: string;
  product_id: number | string;
}

const ProductItem: React.FC<ProductInfo> = ({
  url,
  isSell,
  like,
  title,
  price,
  product_id,
}) => {
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(like);
  const [imageError, setImageError] = useState(false);
  const handleLike = async () => {
    try {
      await axios({
        method: "PATCH",
        url: "",
      });
      setIsLike(!isLike);
    } catch (err) {
      console.error("Error updating data", err);
    }
  };
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <S.ProductContainer
      onClick={() => {
        navigate(`/products/${product_id}`);
      }}
    >
      <S.ImageContainer>
        {!imageError ? (
          <S.ProdcutImage src={url} onError={handleImageError} />
        ) : (
          <S.ImageErrorIcon />
        )}
        <S.IsSell>{isSell ? "판매완료" : "판매중"}</S.IsSell>
      </S.ImageContainer>
      <S.ContentContainer>
        <S.Content>
          <S.Title>{title}</S.Title>
          {isLike ? (
            <S.HeartIcon onClick={handleLike} />
          ) : (
            <S.HeartIcon_empty onClick={handleLike} />
          )}
        </S.Content>
        <S.Price>{`${price} 원`}</S.Price>
      </S.ContentContainer>
    </S.ProductContainer>
  );
};

export default ProductItem;
