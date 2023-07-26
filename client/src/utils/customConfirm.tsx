import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import styled from "styled-components";

interface CustomConfirmProps {
  content: string;
  isOpenConfirm: boolean;
  setIsOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteComment: (id: number | string) => void;
  id: number | string;
}

const CustomConfirm = ({
  content,
  isOpenConfirm,
  setIsOpenConfirm,
  handleDeleteComment,
  id,
}: CustomConfirmProps) => {
  return (
    <Dialog open={isOpenConfirm}>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <CancelBtn onClick={() => setIsOpenConfirm(false)}>취소</CancelBtn>
        <ConfirmBtn
          onClick={() => {
            handleDeleteComment(id);
            setIsOpenConfirm(false);
          }}
          autoFocus
        >
          확인
        </ConfirmBtn>
      </DialogActions>
    </Dialog>
  );
};

export default CustomConfirm;

const ConfirmBtn = styled.button`
  padding: 8px 20px;
  border: 0;
  border-radius: 16px;
  color: white;
  background-color: #42c45c;
`;

const CancelBtn = styled.button`
  padding: 8px 20px;
  border: 0;
  border-radius: 16px;
  color: black;
`;
