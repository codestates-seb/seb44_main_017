import React from "react";
import { Pagination } from "@mui/material";

type Props = {
  pageCount: number;
  page: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const CustomPagination = ({ pageCount, page, setPage }: Props) => {
  //* 페이지네이션을 클릭해서 페이지를 변경하면 이 함수 실행
  //* 여기서 _event는 사용되지 않고 2번 째 파라미터인 page만 사용됩니다.
  const handleChangePage = (_event: any, page: number) => {
    console.log("page 클릭시 나오는 page 값", page);
    setPage(page);
  };

  return (
    <Pagination
      sx={{
        "& button": {
          backgroundColor: "#2b475c", // 버튼 색상
          color: "white", // 버튼 텍스트 색상
          "&:hover": {
            backgroundColor: "#385c78;", // 호버 시 버튼 색상
            opacity: 1, // 호버 시 투명도 조정 (원하는 값으로 변경)
          },
        },
        "& .MuiPaginationItem-root.Mui-selected": {
          backgroundColor: "#385c78", // 현재 선택된 페이지 버튼 색상
          color: "white", // 현재 선택된 페이지 버튼 텍스트 색상
        },
        "& .MuiPaginationItem-root.Mui-disabled": {
          color: "white", // 비활성화된 페이지 버튼 색상
          opacity: 100,
        },
      }}
      count={pageCount} // 전체 페이지 수
      page={page} // 현재 페이지
      onChange={handleChangePage} // 페이지 변경 핸들러
      // showFirstButton
      // showLastButton
    />
  );
};

export default CustomPagination;
