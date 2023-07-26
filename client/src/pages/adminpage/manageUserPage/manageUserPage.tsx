import axios from "axios";
import * as S from "./styled";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants/constants";
import SubTitleBar from "@/components/SubTItleBar/SubTitleBar";
import CustomPagination from "@/components/Pagination/CustomPagination";
import UserTable from "@/components/UserTable/UserTable";

interface UserData {
  email: string;
  name: string;
  phone: string;
  isban: boolean;
  memberId: number;
}

const ManageUserPage = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const userList = users.map((user, idx) => {
    return <UserTable key={`user_${idx}`} user={user} idx={idx} page={page} />;
  });
  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `${BASE_URL}/members?page=${page}&size=24`,
        });
        setUsers(res.data.data);
        if (res.data.pageInfo.totalPages) {
          setTotalPage(res.data.pageInfo.totalPages);
        }
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("Error getting users data.", err);
      }
    })();
  }, [page]);
  return (
    <S.Container>
      <SubTitleBar title="회원 관리" isButton={false} />
      <S.ContentContainer>
        <S.Title>회원 관리</S.Title>
        <S.CustomDivider />
        <S.TableNameContainer>
          <S.TableName name="idx">번호</S.TableName>
          <S.TableName name="email">이메일</S.TableName>
          <S.TableName name="name">닉네임</S.TableName>
          <S.TableName name="phone">전화번호</S.TableName>
          <S.TableName name="isban">활동상태</S.TableName>
        </S.TableNameContainer>
        <S.CustomDivider />
        <S.UserListContainer>
          {users.length ? (
            userList
          ) : (
            <S.EmptyList>
              <S.EmptyContent>회원 정보가 비었습니다.</S.EmptyContent>
            </S.EmptyList>
          )}
        </S.UserListContainer>
      </S.ContentContainer>
      <CustomPagination pageCount={totalPage} page={page} setPage={setPage} />
    </S.Container>
  );
};

export default ManageUserPage;
