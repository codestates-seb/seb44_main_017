import SelectBox from "@/components/SelectBox/SelectBox";
import SubTitleBar from "@/components/SubTItleBar/SubTitleBar";
import { BASE_URL } from "@/constants/constants";
import { CommentTypes, WriterTypes } from "@/types/shared";
import axios from "axios";
import { useState, useEffect } from "react";
import * as S from "./style";
import { Link } from "react-router-dom";
import ViewCount from "@/assets/icons/ViewCount";
import CustomPagination from "@/components/Pagination/CustomPagination";
import { getToken } from "@/utils/token";

interface QnaProps {
  questionId: number;
  title: string;
  content: string;
  createAt: string;
  modifyAt: string;
  view: number;
  writer: WriterTypes;
  qcomments: CommentTypes[];
}

const QnaListPage = () => {
  const title = "무엇이 궁금한가요?";
  const options = ["최신순", "오래된순", "좋아요순", "조회수순"];
  const PAGE_LIMIT = 7;
  const TITLE_MAX_LENGTH = 40;

  const [sortOption, setSortOption] = useState("newest");
  const [qnaList, setQnaList] = useState<QnaProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [authorization, refresh] = getToken();

  useEffect(() => {
    axios
      .get(
        BASE_URL +
          `/questions/board?page=${page}&size=${PAGE_LIMIT}&sort=${sortOption}`,
        {
          headers: {
            Authorization: `${authorization}`,
            Refresh: `${refresh}`,
          },
        }
      )
      .then((res) => {
        setTotalPage(Math.ceil(res.data.pageInfo.totalElements / PAGE_LIMIT));
        setQnaList(res.data.data);
      });
  }, [, sortOption, page]);

  return (
    <>
      <SubTitleBar
        title={title}
        isButton={true}
        btnTitle={"질문하기"}
        btnLink={"/questions"}
      />
      <S.Section>
        <S.QnaContainer>
          <S.SortBox>
            <SelectBox
              usage={"정렬"}
              options={options}
              setOption={setSortOption}
            />
          </S.SortBox>
          <S.BoardContainer>
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "50%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>No</th>
                <th>제목</th>
                <th>조회수</th>
                <th>등록일</th>
                <th>작성자</th>
              </tr>
            </thead>
            <tbody>
              {qnaList.map((item) => (
                <tr key={item.questionId}>
                  <td>{item.questionId}</td>
                  <td title={item.title}>
                    <Link to={`/questions/${item.questionId}`}>
                      {item.title.length > TITLE_MAX_LENGTH
                        ? item.title.slice(0, TITLE_MAX_LENGTH).concat("...")
                        : item.title}
                    </Link>
                  </td>
                  <td>
                    <S.ViewBox>
                      <ViewCount />
                      <span>{item.view}</span>
                    </S.ViewBox>
                  </td>

                  <td>{item.createAt.slice(0, 10)}</td>
                  <td>{item.writer.name}</td>
                </tr>
              ))}
            </tbody>
          </S.BoardContainer>
        </S.QnaContainer>
        <S.PagenationBox>
          <CustomPagination
            pageCount={totalPage}
            page={page}
            setPage={setPage}
          />
        </S.PagenationBox>
      </S.Section>
    </>
  );
};

export default QnaListPage;
