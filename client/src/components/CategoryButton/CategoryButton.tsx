import React from "react";
import * as S from "./style";

interface Props {
  onClick: (category: string) => void;
  btnSelect: boolean;
  category: string;
}

export const CategoryButton = ({ onClick, btnSelect, category }: Props) => {
  const handleClick = () => {
    onClick(category);
  };

  return (
    <div>
      <S.CategoryButton onClick={handleClick} btnSelect={btnSelect}>
        {category}
      </S.CategoryButton>
    </div>
  );
};

export default CategoryButton;
