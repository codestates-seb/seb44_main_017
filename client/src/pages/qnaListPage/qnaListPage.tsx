import SelectBox from "@/components/SelectBox/SelectBox";
import SubTitleBar from "@/components/SubTItleBar/SubTitleBar";
import { BASE_URL } from "@/constants/constants";
import { CommentTypes, WriterTypes } from "@/types/shared";
import axios from "axios";
import { useState, useEffect } from "react";
import View from "@/assets/icons/view.svg";

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

  useEffect(() => {
    axios
      .get(BASE_URL + `/questions/board?page=1&size=10&sort=${sortOption}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiYWRtaW4yQGdtYWlsLmNvbSIsInN1YiI6ImFkbWluMkBnbWFpbC5jb20iLCJpYXQiOjE2ODkxMjg3OTAsImV4cCI6MTY4OTEzMDU5MH0.urGcZpxBU0T8P8a25EpMVWmpHuSoNt1mtVg-XNwAC1V_gf0UmJFC2t8MVuiExbYm",
          Refresh:
            "eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJtZW1iZXIiLCJzdWIiOiJhZG1pbjJAZ21haWwuY29tIiwiaWF0IjoxNjg5MTI4NzkwLCJleHAiOjE2ODkxNTM5OTB9.SVvmHmQmJ8NVRL0EHfDTRHuHX3VK6pJPewbL65kTzqJYJ07mFBa2GHvDbONvwGIE",
        },
      })
      .then(res => setQnaList(res.data.data));
  });

  return (
    <>
      <div>
        <SubTitleBar title={title} isButton={false} />
        <button>질문하기</button>
      </div>
      <SelectBox usage={"정렬"} options={options} setOption={setSortOption} />
      <table>
        <thead>
          <tr>
            <td>No</td>
            <td>제목</td>
            <td>조회수</td>
            <td>등록일</td>
            <td>작성자</td>
          </tr>
        </thead>
        <tbody>
          {qnaList.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.view}</td>
              <td>{item.createAt.slice(0, 10)}</td>
              <td>{item.writer.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default QnaListPage;
