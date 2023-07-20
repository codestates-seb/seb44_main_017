import { useEffect, useState } from "react";
import * as S from "./styled";
import { Collapse, Dialog, DialogActions, DialogContent } from "@mui/material";
import axios from "axios";
import { IMG_URL } from "@/constants/constants";

interface ApprovalTableProps {
  product: {
    name: string;
    category: string;
    modifyAt: string;
    imageLink: string
  };
  idx: number;
  page: number;
}
const ApprovalTable: React.FC<ApprovalTableProps> = ({
  product,
  idx,
  page,
}) => {
  const [listOpen, setListOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClick = () => setListOpen(!listOpen);
  const handleClose = () => setDialogOpen(false);
  const banclick = () => {
    (async () => {
      try {
      } catch (err) {
        console.error("Error patching ban data", err);
      }
    })();
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
        <S.productsInfo name="phone">{product.modifyAt}</S.productsInfo>
      </S.ProductsTable>
      <Collapse in={listOpen} timeout="auto" unmountOnExit>
        <S.Field>
            <S.ProductImage src={`${IMG_URL}/${product.imageLink}`} />
        </S.Field>
      </Collapse>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogContent>해당 상품을 반송처리 하시겠습니까?</DialogContent>
        <DialogActions>
          <S.CancelBtn onClick={handleClose}>취소</S.CancelBtn>
          <S.AgreeBtn onClick={banclick} autoFocus>
            반송
          </S.AgreeBtn>
        </DialogActions>
      </Dialog>
    </S.Container>
  );
};

export default ApprovalTable;
