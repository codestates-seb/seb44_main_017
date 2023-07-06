import { useState } from "react";
import * as S from "./style";
import SelectArrow from "../../assets/icons/SelectArrow";

const SelectBox = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  console.log(value);

  const handleSelectValue = (e: any) => {
    setValue(e.target.getAttribute("value"));
  };

  return (
    <S.SelectBox onClick={() => setIsOpen(!isOpen)}>
      <S.Label>{value}</S.Label>
      <S.SelectOptions isOpen={isOpen}>
        <S.Option value="최신순" onClick={handleSelectValue}>
          최신순
        </S.Option>
        <S.Option value="좋아요순" onClick={handleSelectValue}>
          좋아요순
        </S.Option>
        <S.Option value="컨디션순" onClick={handleSelectValue}>
          컨디션순
        </S.Option>
      </S.SelectOptions>
      <SelectArrow />
    </S.SelectBox>
  );
};

export default SelectBox;
