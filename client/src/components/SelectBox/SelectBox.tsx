import { BaseSyntheticEvent, useState } from "react";
import * as S from "./style";
import SelectArrow from "../../assets/icons/SelectArrow";
import useDetectClose from "../../hooks/useDetectClose";

interface Props {
  usage: "정렬" | "카테고리" | "상태";
  options: string[];
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

const SelectBox = ({ usage, options, setOption }: Props) => {
  const [isSelected, selectRef, selectHandler] = useDetectClose();
  const [viewValue, setViewValue] = useState(usage);
  const replaceValue = {
    정렬: [
      { view: "최신순", replace: "newest" },
      { view: "오래된순", replace: "oldest" },
      { view: "좋아요순", replace: "mostlike" },
      { view: "조회수순", replace: "mostview" },
      { view: "가격낮은순", replace: "priceasc" },
      { view: "가격높은순", replace: "pricedesc" },
    ],
    상태: [
      { view: "판매완료", replace: "productst" },
      { view: "판매중", replace: "productsf" },
      { view: "등록대기", replace: "productwait" },
      { view: "등록거절", replace: "productdeny" },
    ],
    카테고리: [],
  };

  const handleSelectValue = (e: BaseSyntheticEvent) => {
    const current = e.target.getAttribute("value");
    setViewValue(current);

    try {
      if (replaceValue[usage].length > 0) {
        const temp = replaceValue[usage].filter(
          option => option.view === current
        );
        setOption(temp[0].replace);
      } else setOption(current);
    } catch (e) {
      console.error("올바른 옵션인지 확인해주세요", e);
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
