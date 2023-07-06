import { useState } from "react";
import * as S from "./style";
import SelectArrow from "../../assets/icons/SelectArrow";
import useDetectClose from "../../hooks/useDetectClose";

interface Props {
  options: string[];
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

const SelectBox = ({ options, setOption }: Props) => {
  const [isSelected, selectRef, selectHandler] = useDetectClose();
  const [viewValue, setViewValue] = useState("정렬");

  const handleSelectValue = (e: any) => {
    const current = e.target.getAttribute("value");
    setViewValue(current);

    switch (current) {
      case "최신순":
        setOption("newest");
        break;
      case "오래된순":
        setOption("oldest");
        break;
      case "좋아요순":
        setOption("mostlike");
        break;
      case "조회수순":
        setOption("mostview");
        break;
      case "가격낮은순":
        setOption("priceasc");
        break;
      case "가격높은순":
        setOption("pricedesc");
        break;
    }
  };

  return (
    <S.SelectBox ref={selectRef} onClick={selectHandler}>
      <S.Label>{viewValue}</S.Label>
      <S.SelectOptions isOpen={isSelected}>
        {options.map(option => (
          <S.Option key={option} value={option} onClick={handleSelectValue}>
            {option}
          </S.Option>
        ))}
      </S.SelectOptions>
      <SelectArrow />
    </S.SelectBox>
  );
};

export default SelectBox;
