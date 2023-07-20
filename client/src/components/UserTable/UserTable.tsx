import { Collapse, Dialog, DialogActions, DialogContent } from "@mui/material";
import * as S from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants/constants";
import { getToken } from "@/utils/token";

interface UserTableProps {
  user: {
    email: string;
    name: string;
    phone: string;
    isban: boolean;
    memberId: number;
  };
  idx: number;
  page: number;
}
const UserTable: React.FC<UserTableProps> = ({ user, idx, page }) => {
  
  const [banState, setBanState] = useState<boolean>(user.isban);
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
  const banclick = () => {
    (async () => {
      
      try {
        await axios.patch(
          `${BASE_URL}/members/ban/${user.memberId}`,
          {
            isban: !banState,
          },
          {
            headers: {
              refresh: getToken()[1],
            },
          }
        );
        setBanState(!banState);
        setDialogOpen(false);
      } catch (err) {
        console.error("Error patching ban data", err);
      }
    })();
  };
  useEffect(() => {
    setBanState(user.isban);
  }, [user.isban]);
  useEffect(() => {
    setListOpen(false);
  }, [page]);
  return (
    <S.Container>
      <S.userTable key={`user_${idx}`} onClick={handleClick}>
        <S.userInfo name="idx">{24 * (page - 1) + idx + 1}</S.userInfo>
        <S.userInfo name="email">{user.email}</S.userInfo>
        <S.userInfo name="name">{user.name}</S.userInfo>
        <S.userInfo name="phone">{user.phone}</S.userInfo>
        <S.BanBtn
          isban={banState}
          onClick={(ev) => {
            clickBanBtn(ev);
          }}
        >
          {banState ? "차단" : "활성화"}
        </S.BanBtn>
      </S.userTable>
      <Collapse in={listOpen} timeout="auto" unmountOnExit>
        <S.Field>
          <S.FieldUserInfo>전화번호 : {user.phone}</S.FieldUserInfo>
          <S.FieldUserInfo>이메일 : {user.email}</S.FieldUserInfo>
        </S.Field>
      </Collapse>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogContent>
          {banState
            ? "해당 유저의 계정을 활성화 하시겠습니까?"
            : "해당 유저의 계정을 차단 하시겠습니까?"}
        </DialogContent>
        <DialogActions>
          <S.CancelBtn onClick={handleClose}>취소</S.CancelBtn>
          <S.AgreeBtn banState={banState} onClick={banclick} autoFocus>
            {banState ? "활성화" : "차단"}
          </S.AgreeBtn>
        </DialogActions>
      </Dialog>
    </S.Container>
  );
};

export default UserTable;
