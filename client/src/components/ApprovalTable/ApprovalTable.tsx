import axios from "axios";
import * as S from "./styled";
import { ChangeEvent, useEffect, useState } from "react";
import { BASE_URL, IMG_URL } from "@/constants/constants";
import { Collapse, Dialog, DialogActions } from "@mui/material";
import SelectBox from "../SelectBox/SelectBox";
import { getToken } from "@/utils/token";
import { insertComma } from "@/utils/inssertComma";
import { koreanTime } from "@/utils/koreanTime";

interface ApprovalTableProps {
  product: {
    name: string;
    category: string | any;
    modifyAt: string;
    imageLink: string;
    content: string;
    memberId: number;
    price: string;
    productId: number;
  };
  idx: number;
  page: number;
}
const options = ["상의", "하의", "아우터", "신발", "기타"];
const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 60,
    label: "60",
  },
  {
    value: 80,
    label: "80",
  },
  {
    value: 100,
    label: "100",
  },
];
const ApprovalTable: React.FC<ApprovalTableProps> = ({
  product,
  idx,
  page,
}) => {
  const [listOpen, setListOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [denycontent, setDenycontent] = useState<string>("");
  const [productData, setProductData] = useState({
    name: product.name,
    title: "title",
    content: product.content,
    price: "0",
    category: product.category,
    imageLink: product.imageLink,
    conditionValue: 0,
    pointValue: "0",
  });
  const handleClick = () => setListOpen(!listOpen);
  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);
  const handleProductData = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.name === "price") {
      setProductData({ ...productData, price: insertComma(ev.target.value) });
    } else if (ev.target.name === "pointValue") {
      setProductData({
        ...productData,
        pointValue: insertComma(ev.target.value),
      });
    } else {
      setProductData({ ...productData, [ev.target.name]: ev.target.value });
    }
  };
  const approvalClick = async () => {
    try {
      await axios.patch(
        `${BASE_URL}/products/${product.productId}`,
        productData,
        {
          headers: {
            refresh: getToken()[1],
          },
        }
      );
      window.location.reload();
    } catch (err) {
      console.error("Error uploading product.", err);
    }
  };
  const returnClick = async () => {
    try {
      await axios.post(
        `${BASE_URL}/products/deny/${product.productId}`,
        { denycontent },
        {
          headers: {
            refresh: getToken()[1],
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error posting return reason.", error);
    }
  };
  useEffect(() => {
    setListOpen(false);
  }, [page]);
  return (
    <S.Container>
      <S.ProductsTable key={`user_${idx}`} onClick={handleClick}>
        <S.productsInfo name="idx">{24 * (page - 1) + idx + 1}</S.productsInfo>
        <S.productsInfo name="name">{product.name}</S.productsInfo>
        <S.productsInfo name="category">{product.category}</S.productsInfo>
        <S.productsInfo name="phone">
          {koreanTime(product.modifyAt)}
        </S.productsInfo>
      </S.ProductsTable>
      <Collapse in={listOpen} timeout="auto" unmountOnExit>
        <S.Field>
          <S.Content_1>
            <S.ProductImage src={`${IMG_URL}/${product.imageLink}`} />
            <SelectBox
              usage={"카테고리"}
              options={options}
              setOption={(value) => {
                setProductData({ ...productData, category: value });
              }}
            />
            <S.SliderContainer>
              <S.InfoTitle>상품 컨디션</S.InfoTitle>
              <S.CustomSlider
                defaultValue={0}
                step={null}
                marks={marks}
                onChange={(ev: any) => {
                  setProductData({
                    ...productData,
                    conditionValue: ev.target.value / 10,
                  });
                }}
              />
            </S.SliderContainer>
          </S.Content_1>
          <S.Content_2>
            <S.InfoContainer name={"name"}>
              <S.InfoTitle>제목</S.InfoTitle>
              <S.CustomTextField
                name={"name"}
                value={productData.name}
                onChange={handleProductData}
              />
            </S.InfoContainer>
            <S.InfoContainer name={"price"}>
              <S.InfoTitle>가격</S.InfoTitle>
              <S.PriceContainer>
                <S.CustomTextField
                  name={"price"}
                  value={productData.price}
                  onChange={handleProductData}
                />
                <S.Currency>원</S.Currency>
              </S.PriceContainer>
            </S.InfoContainer>
            <S.InfoContainer name={"pointValue"}>
              <S.InfoTitle>포인트</S.InfoTitle>
              <S.CustomTextField
                name={"pointValue"}
                value={productData.pointValue}
                onChange={handleProductData}
              />
            </S.InfoContainer>
            <S.InfoContainer name={"content"}>
              <S.InfoTitle>세부사항</S.InfoTitle>
              <S.CustomTextField
                name={"content"}
                multiline
                rows={10}
                value={productData.content}
                onChange={handleProductData}
              />
            </S.InfoContainer>
            <S.BtnConatiner>
              <S.ApprovalBtn approval={true} onClick={approvalClick}>
                등록하기
              </S.ApprovalBtn>
              <S.ApprovalBtn approval={false} onClick={handleOpen}>
                반려하기
              </S.ApprovalBtn>
            </S.BtnConatiner>
          </S.Content_2>
        </S.Field>
      </Collapse>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <S.DialogContainer>
          <S.InfoTitle>반송 사유 작성하기</S.InfoTitle>
          <S.ReturnTextField
            multiline
            rows={13}
            value={denycontent}
            onChange={(ev) => {
              setDenycontent(ev.target.value);
            }}
          />
        </S.DialogContainer>
        <DialogActions>
          <S.AgreeBtn onClick={returnClick} autoFocus>
            반송
          </S.AgreeBtn>
          <S.CancelBtn onClick={handleClose}>취소</S.CancelBtn>
        </DialogActions>
      </Dialog>
    </S.Container>
  );
};

export default ApprovalTable;
