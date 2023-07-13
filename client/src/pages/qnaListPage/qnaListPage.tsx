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
  const [sortOption, setSortOption] = useState("newest");
  const [qnaList, setQnaList] = useState<QnaProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const pageLimit = 7;

  useEffect(() => {
    axios
      .get(
        BASE_URL +
          `/questions/board?page=${page}&size=${pageLimit}&sort=${sortOption}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiYWRtaW4yQGdtYWlsLmNvbSIsInN1YiI6ImFkbWluMkBnbWFpbC5jb20iLCJpYXQiOjE2ODkyMDU3MzYsImV4cCI6MTY4OTIwNzUzNn0.BI4GbSphJZW8LFD0JM49IbL6WIeUV4ZkK9hUlpWt_hpWPQ2TvyPbcda8WBisAfCC",
            Refresh:
              "eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJtZW1iZXIiLCJzdWIiOiJhZG1pbjJAZ21haWwuY29tIiwiaWF0IjoxNjg5MjA1NzM2LCJleHAiOjE2ODkyMzA5MzZ9.95NR8khbMiPGKilSreRZk2VT5VGCD5uRIw8LIlapb3LpUW3iv1IvIAr0UFhnJ1Yj",
          },
        }
      )
      .then(res => {
        setTotalPage(Math.ceil(res.data.pageInfo.totalElements / pageLimit));
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
              {qnaList.map(item => (
                <tr key={item.questionId}>
                  <td>{item.questionId}</td>
                  <td>
                    <Link to={`/questions/${item.questionId}`}>
                      {item.title}
                    </Link>
                  </td>
                  <S.ViewBox>
                    <ViewCount />
                    <span>{item.view}</span>
                  </S.ViewBox>
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
