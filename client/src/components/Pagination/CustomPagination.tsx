import React, { useState } from "react";
import { Pagination } from "@mui/material";

const CustomPagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Pagination
      count={10} // 전체 페이지 수
      page={currentPage} // 현재 페이지
      onChange={handleChangePage} // 페이지 변경 핸들러
      color="primary"
      showFirstButton
      showLastButton
    />
  );
};
export default CustomPagination;
