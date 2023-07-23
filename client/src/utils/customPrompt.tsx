import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { PostCodeTypes } from "@/types/shared";

interface CustomPromptProps {
  promptElement: { title: string; content: string; label: string };
  isOpenPrompt: boolean;
  setIsOpenPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  detailValue: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  selectDetailAddress: () => void;
  postCode: PostCodeTypes;
}

const CustomPrompt = ({
  promptElement,
  isOpenPrompt,
  setIsOpenPrompt,
  detailValue,
  setValue,
  selectDetailAddress,
  postCode,
}: CustomPromptProps) => {
  return (
    <div>
      <Dialog open={isOpenPrompt} onClose={() => setIsOpenPrompt(false)}>
        <DialogTitle>{promptElement.title}</DialogTitle>
        <DialogContent
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <DialogContentText>{postCode.address}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={promptElement.label}
            type="text"
            fullWidth
            variant="outlined"
            value={detailValue}
            onChange={e => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions style={{ padding: "8px 24px" }}>
          <CancelBtn onClick={() => setIsOpenPrompt(false)}>취소</CancelBtn>
          <ConfirmBtn onClick={selectDetailAddress}>확인</ConfirmBtn>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomPrompt;

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
