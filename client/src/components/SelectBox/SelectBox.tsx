import { useState } from "react";
import * as S from "./style";
import SelectArrow from "../../assets/icons/SelectArrow";
import useDetectClose from "../../hooks/useDetectClose";

/**
 * @usage: "정렬" or "카테고리"
 * @options: 정렬 = ["최신순", "오래된순", "좋아요순", "조회수순", "가격낮은순", "가격높은순"], 카테고리 = 제한없음
 * @setOption: state의 set 함수
 */
interface Props {
  usage: "정렬" | "카테고리";
  options: string[];
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

const SelectBox = ({ usage, options, setOption }: Props) => {
  const [isSelected, selectRef, selectHandler] = useDetectClose();
  const [viewValue, setViewValue] = useState(usage);

  const handleSelectValue = (e: any) => {
    const current = e.target.getAttribute("value");
    setViewValue(current);

    if (usage === "정렬") {
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
    } else {
      setOption(current);
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
