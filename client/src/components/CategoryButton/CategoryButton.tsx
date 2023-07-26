import * as S from "./style";

interface Props {
  btnSelect: boolean;
  category: string;
  onClick: (category: string) => void;
}

export const CategoryButton = ({ btnSelect, onClick, category }: Props) => {
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
