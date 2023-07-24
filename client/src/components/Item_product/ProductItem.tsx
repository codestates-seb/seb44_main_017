import { useNavigate } from "react-router";
import * as S from "./styled";
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants/constants";
import { getToken } from "@/utils/token";
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
      // await axios.post(
      //   `${BASE_URL}/products/${productId}/like`,
      //   {},
      //   {
      //     headers: {
      //       refresh: getToken()[1],
      //     },
      //   }
      // );
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
        navigate(`/products/${productId}`);
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
