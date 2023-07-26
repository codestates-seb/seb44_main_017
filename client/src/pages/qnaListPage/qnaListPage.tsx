import { BASE_URL } from "@/constants/constants";
import { QnaTypes } from "@/types/shared";
import axios from "axios";
import { useState, useEffect } from "react";
import { getToken } from "@/utils/token";
import QnaListComponent from "@/components/Qna_list/qnaListComponent";
import SubTitleBar from "@/components/SubTItleBar/SubTitleBar";
import styled from "styled-components";

const QnaListPage = () => {
  const PAGE_LIMIT = 7;

  const [sortOption, setSortOption] = useState("newest");
  const [qnaList, setQnaList] = useState<QnaTypes[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const title = "질문 받아요";

  const [authorization, refresh] = getToken();

  const getQnaList = async () => {
    try {
      const { data, status } = await axios.get(
        BASE_URL +
          `/questions/board?page=${page}&size=${PAGE_LIMIT}&sort=${sortOption}`,
        {
          headers: {
            Authorization: `${authorization}`,
            Refresh: `${refresh}`,
          },
        }
      );

      if (data && status === 200) {
        setTotalPage(Math.ceil(data.pageInfo.totalElements / PAGE_LIMIT));
        setQnaList(data.data);
      }
    } catch (e) {
      console.error("Failed fetching data", e);
    }
  };

  useEffect(() => {
    getQnaList();
  }, [, sortOption, page]);

  return (
    <>
      <SubTitleBarBox>
        <SubTitleBar
          title={title}
          isButton={true}
          btnTitle="질문하기"
          btnLink={"/question_register"}
        />
      </SubTitleBarBox>
      <QnaListComponent
        data={qnaList}
        setPage={setPage}
        setSortOption={setSortOption}
        page={page}
        totalPage={totalPage}
      />
    </>
  );
};

export default QnaListPage;

const SubTitleBarBox = styled.section`
  width: 100%;
  @media (max-width: 767px) {
    margin-bottom: 16px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-bottom: 62px;
  }
  @media (min-width: 1024px) {
    margin-bottom: 60px;
  }
`;
