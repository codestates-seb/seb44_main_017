import { BASE_URL } from "@/constants/constants";
import { QnaTypes } from "@/types/shared";
import axios from "axios";
import { useState, useEffect } from "react";
import { getToken } from "@/utils/token";
import QnaListComponent from "@/components/Qna_list/qnaListComponent";
import SubTitleBar from "@/components/SubTItleBar/SubTitleBar";
import SearchBar from "@/components/Search_bar/SearchBar";

const QnaListPage = () => {
  const PAGE_LIMIT = 7;

  const [sortOption, setSortOption] = useState("newest");
  const [qnaList, setQnaList] = useState<QnaTypes[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const title = "무엇이 궁금한가요?";

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
      <SubTitleBar
        title={title}
        isButton={true}
        btnTitle={"질문하기"}
        btnLink={"/questions"}
      />
      <SearchBar />
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
