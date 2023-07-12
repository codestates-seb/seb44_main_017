import React from "react";
import { Pagination } from "@mui/material";

type Props = {
  pageCount: number;
  page: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

//* 페이지네이션 컴포넌트
//* page, setPage를 props로 전달하는 이유는 모든 곳에서 이 컴포넌트를 사용하기 위해
const CustomPagination = ({ pageCount, page, setPage }: Props) => {
  //* 페이지네이션을 클릭해서 페이지를 변경하면 이 함수 실행
  //* 여기서 _event는 사용되지 않고 2번 째 파라미터인 page만 사용됩니다.
  const handleChangePage = (_event: any, page: number) => {
    console.log("page 클릭시 나오는 page 값", page);
    setPage(page);
  };

  return (
    <Pagination
      count={pageCount} // 전체 페이지 수
      page={page} // 현재 페이지
      onChange={handleChangePage} // 페이지 변경 핸들러
      color="primary"
      showFirstButton
      showLastButton
    />
  );
};

// 공지사항 조회, QA 목록 조회, 내가 등록한 상품 조회
export default CustomPagination;
