import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HideImageIcon from "@mui/icons-material/HideImage";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface ImageProps {
  src: string;
}

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;
export const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  padding: 0px 6px 0px 8px;
  @media (max-width: 767px) {
    margin-top: 4px;
  }
`;
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ProdcutImage = styled.img<ImageProps>`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border: 2px solid var(--color-darkblue);
  border-radius: 16px;
  @media (max-width: 767px) {
    width: 156px;
    height: 156px;
    object-fit: cover;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 184px;
    height: 184px;
    object-fit: cover;
  }
`;
export const ImageErrorIcon = styled(HideImageIcon)`
  font-size: 40px !important;
  color: var(--color-darkblue);
  padding: 80px;
  border: 2px solid var(--color-darkblue);
  border-radius: 16px;
  @media (max-width: 767px) {
    padding: 58px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 72px;
  }
`;
export const IsSell = styled.span`
  position: absolute;
  font-size: var(--font-size-12);
  top: 10px;
  left: 10px;
  border-radius: 10px;
  background-color: var(--color-orange);
  padding: 4px 8px;
  color: #fff;
`;
export const Title = styled.span`
  font-size: var(--font-size-16);
  width: 170px;
  font-weight: var(--font-weight-700);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: 767px) {
    width: 132px;
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 120px;
    font-size: 14px;
  }
`;
export const Price = styled.span`
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-500);
  margin-top: 4px;
  @media (max-width: 767px) {
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 14px;
  }
`;

export const HeartIcon = styled(FavoriteIcon)`
  font-size: 20px !important;
  color: red;
  @media (max-width: 767px) {
    font-size: 16px !important;
  }
`;
export const HeartIcon_empty = styled(FavoriteBorderIcon)`
  font-size: 20px !important;
  @media (max-width: 767px) {
    font-size: 16px !important;
  }
`;
