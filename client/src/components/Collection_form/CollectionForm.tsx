import { useEffect, useState, useRef } from "react";
import ImageIcon from "../../assets/icons/ImageIcon";
import * as S from "./style";
import { ContentsProps } from "../../pages/collectionPage/collectionPage";
import useInput from "../../hooks/useInput";
import SelectBox from "../SelectBox/SelectBox";

interface Props {
  contents: ContentsProps[];
  setContents: React.Dispatch<React.SetStateAction<ContentsProps[]>>;
  itemNumber: number;
}

const CollectionForm = ({ contents, setContents, itemNumber }: Props) => {
  const [preview, setPreview] = useState<string>();
  const [titleValue, titleHandler] = useInput("");
  const [contentValue, contentHandler] = useInput("");
  const [categoryValue, setCategoryValue] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const categoryOptions = ["상의", "하의", "아우터", "기타"];

  const imgInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setContents(
      contents.map(item =>
        item.itemId === itemNumber
          ? {
              ...item,
              itemId: itemNumber,
              itemInfo: {
                name: titleValue,
                content: contentValue,
                category: categoryValue,
              },
              itemImage: imageFile,
            }
          : item
      )
    );
  }, [titleValue, contentValue, categoryValue]);

  /**
   * [이미지 업로드]
   * setPreview : 미리보기 이미지 저장
   * setImageFile : 객체에 이미지 파일 저장
   */
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files;
    if (imageFile && imageFile[0]) {
      const url = URL.createObjectURL(imageFile[0]);

      setPreview(url);
    }

    imageFile && setImageFile(imageFile[0]);
  };

  const uploadBtnClickHandler = () => {
    imgInput.current && imgInput.current.click();
  };

  return (
    <S.FormContainer>
      <S.ContentContainer>
        <S.Imagebox>
          <div className="image_background" onClick={uploadBtnClickHandler}>
            {preview ? <img src={preview} /> : <ImageIcon />}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            ref={imgInput}
            style={{ display: "none" }}
          />
          <button className="upload_btn" onClick={uploadBtnClickHandler}>
            이미지 등록
          </button>
        </S.Imagebox>
        <S.ContentBox>
          <SelectBox
            usage={"카테고리"}
            options={categoryOptions}
            setOption={setCategoryValue}
          />
          <input
            type="text"
            placeholder="상품명을 입력해주세요."
            value={titleValue}
            onChange={titleHandler}
            required
          />
          <textarea
            placeholder="1. 브랜드 2. 컬러 3. 사이즈 등을 상세하게 입력해주세요."
            value={contentValue}
            onChange={contentHandler}
            required
          ></textarea>
        </S.ContentBox>
      </S.ContentContainer>
    </S.FormContainer>
  );
};

export default CollectionForm;
