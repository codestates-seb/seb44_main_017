import axios from "axios";
import NotifyItem from "@/components/Item_notify/NotifyItem";
import CustomPagination from "@/components/Pagination/CustomPagination";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants/constants";

type ItemType = {
  title: string;
  content: string;
  createAt: string;
  view: number;
  admin: { adminId: number; name: string };
  boardId: number;
  modifyAt: string;
};

// interface DataProps {
//   name: string;
// }

const NoticePage = () => {
  const [data, setData] = useState<ItemType[]>([]);
  const [page, setPage] = useState<any>(1);
  const sort = "newest";
  // const [sort, setSort] = useState("newest");

  //* 실제 페이지 변경될 때 실행되는 데이터 받아오기 함수
  const getUser = async () => {
    console.log("함수 실행");
    try {
      getUser;
      //* 보통 백엔드 api가 아래처럼 ?page={4} 이런식으로 만드는 게 정석
      const { data, status } = await axios.get(
        `${BASE_URL}/notify/board?page=${page}&size=2&sort=${sort}`
      );

      //* 데이터가 있을 때만 setData에다가 담아주기
      if (data && status === 200) {
        console.log(data);
        setData(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //* useEffect를 통해 page가 변경 될 떄마다 getUser 함수 실행
  useEffect(() => {
    getUser();

    //* page가 변경될 떄 마다 실행
  }, [page]);

  console.log(page);

  return (
    <div>
      {data.map((e: ItemType) => (
        <NotifyItem
          key={e.boardId}
          title={e.title}
          contents={e.content}
          isNew={true}
          regDt={e.createAt}
          viewCount={e.view}
        />
      ))}
      <CustomPagination pageCount={5} page={page} setPage={setPage} />
      {/* pageCount={totalPage} <- 처럼 구현해야 함 */}
    </div>
  );
};

export default NoticePage;
