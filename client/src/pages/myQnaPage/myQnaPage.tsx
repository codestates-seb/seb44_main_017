import MypageHeader from "@/components/Mypage_header/MypageHeader";
import QnaListComponent from "@/components/Qna_list/qnaListComponent";
import { BASE_URL } from "@/constants/constants";
import { QnaTypes } from "@/types/shared";
import { getToken } from "@/utils/token";
import axios from "axios";
import { useEffect, useState } from "react";

const MyQnaPage = () => {
  const PAGE_LIMIT = 7;

  const [sortOption, setSortOption] = useState("newest");
  const [qnaList, setQnaList] = useState<QnaTypes[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [authorization, refresh] = getToken();

  const getQnaList = async () => {
    try {
      const { data, status } = await axios.get(
        BASE_URL +
          `/members/getqna?page=${page}&size=${PAGE_LIMIT}&sort=${sortOption}`,
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
      <MypageHeader title="나의 Q&A" />
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

export default MyQnaPage;
