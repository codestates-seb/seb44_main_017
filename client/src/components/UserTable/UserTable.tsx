import { Collapse, Dialog, DialogActions, DialogContent } from "@mui/material";
import * as S from "./styled";
import { useState } from "react";
interface UserTableProps {
  user: {
    email: string;
    name: string;
    phone: string;
    isban: boolean;
  };
  idx: number;
}
const UserTable: React.FC<UserTableProps> = ({ user, idx }) => {
  const [listOpen, setListOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClick = () => setListOpen(!listOpen);
  const clickBanBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setDialogOpen(true);
  };
  const handleClose = () => setDialogOpen(false);
  const banclick = () => {};
  return (
    <S.Container>
      <S.userTable key={`user_${idx}`} onClick={handleClick}>
        <S.userInfo name="idx">{idx + 1}</S.userInfo>
        <S.userInfo name="email">{user.email}</S.userInfo>
        <S.userInfo name="name">{user.name}</S.userInfo>
        <S.userInfo name="phone">{user.phone}</S.userInfo>
        <S.BanBtn
          isban={user.isban}
          onClick={(ev) => {
            clickBanBtn(ev);
          }}
        >
          {user.isban ? "차단" : "활성화"}
        </S.BanBtn>
      </S.userTable>
      <Collapse in={listOpen} timeout="auto" unmountOnExit>
        <S.Field>
          <S.FieldUserInfo>전화번호 : {user.phone}</S.FieldUserInfo>
          <S.FieldUserInfo>이메일 : {user.email}</S.FieldUserInfo>
        </S.Field>
      </Collapse>
      <Dialog open={dialogOpen} onClose={handleClose} sx={{padding:"0px",margin:"0px"}}>
        <DialogContent>해당 유저의 계정을 차단 하시겠습니까?</DialogContent>
        <DialogActions>
          <S.CancelBtn onClick={handleClose}>취소</S.CancelBtn>
          <S.AgreeBtn onClick={banclick} autoFocus>
            차단
          </S.AgreeBtn>
        </DialogActions>
      </Dialog>
    </S.Container>
  );
};

export default UserTable;
