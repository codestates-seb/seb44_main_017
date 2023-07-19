import axios from "axios";
import * as S from "./styled";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants/constants";
import SubTitleBar from "@/components/SubTItleBar/SubTitleBar";
import CustomPagination from "@/components/Pagination/CustomPagination";
import ApprovalTable from "@/components/ApprovalTable/ApprovalTable";

const ManageApprovalPage = () => {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const ApprovalList = products.map((product, idx) => {
    return (
      <ApprovalTable
        key={`user_${idx}`}
        product={product}
        idx={idx}
        page={page}
      />
    );
  });
  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `${BASE_URL}/admin/productwait?page=${page}&size=24&sort=oldest`,
        });
        setProducts(res.data.data);
        setTotalPage(res.data.pageInfo.totalPages);
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
        <S.Title>승인 관리</S.Title>
        <S.CustomDivider />
        <S.TableNameContainer>
          <S.TableName name="idx">번호</S.TableName>
          <S.TableName name="name">제목</S.TableName>
          <S.TableName name="category">품목</S.TableName>
          <S.TableName name="created_at">등록날짜</S.TableName>
        </S.TableNameContainer>
        <S.CustomDivider />
        <S.ProductListContainer>
          {products.length ? (
            ApprovalList
          ) : (
            <S.EmptyList>
              <S.EmptyContent>등록 대기중인 물품이 없습니다.</S.EmptyContent>
            </S.EmptyList>
          )}
        </S.ProductListContainer>
      </S.ContentContainer>
      <CustomPagination pageCount={totalPage} page={page} setPage={setPage} />
    </S.Container>
  );
};

export default ManageApprovalPage;
