import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
export const Content_1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ProdcutImage = styled.img<ImageProps>`
  width: 13vw;
  height: 13vw;
  border: 2px solid var(--color-darkblue);
  border-radius: 16px;
  @media (max-width: 767px) {
    width: 28vw;
    height: 28vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 20vw;
    height: 20vw;
  }
`;
export const IsSell = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 10px;
  background-color: var(--color-orange);
  padding: 4px 8px;
  color: #fff;
  font-size: 0.8vw;
  @media (max-width: 767px) {
    font-size: 2vw;
    padding: 2px 4px;
    top: 5px;
    left: 5px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.3vw;
  }
`;
export const Title = styled.span`
  font-size: 1vw;
  width: 10vw;
  font-weight: var(--font-weight-700);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: 767px) {
    width: 22vw;
    font-size: 2.2vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 16vw;
    font-size: 1.7vw;
  }
`;
export const Price = styled.span`
  font-size: 0.9vw;
  font-weight: var(--font-weight-500);
  margin-top: 4px;
  @media (max-width: 767px) {
    font-size: 2vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.3vw;
  }
`;

export const HeartIcon = styled(FavoriteIcon)`
  font-size: 1.3vw !important;
  color: red;
  @media (max-width: 767px) {
    font-size: 3.5vw !important;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 2vw !important;
  }
`;
export const HeartIcon_empty = styled(FavoriteBorderIcon)`
  font-size: 1.3vw !important;
  @media (max-width: 767px) {
    font-size: 3.5vw !important;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 2vw !important;
  }
`;
