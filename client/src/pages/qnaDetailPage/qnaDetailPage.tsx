import BoardDetail from "@/components/BoardDetail/BoardDetail";
import { BASE_URL } from "@/constants/constants";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { QnaTypes } from "@/types/shared";
import Comment from "@/components/Comment/Comment";

const QnaDetailPage = () => {
  const { questionId } = useParams();
  const [qnaData, setQnaData] = useState<QnaTypes>();

  console.log(qnaData);

  useEffect(() => {
    axios
      .get(BASE_URL + `/questions/${questionId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiYWRtaW4yQGdtYWlsLmNvbSIsInN1YiI6ImFkbWluMkBnbWFpbC5jb20iLCJpYXQiOjE2ODkxNTI1NzgsImV4cCI6MTY4OTE1NDM3OH0.7Dah_UaRV7BUe99YXCmJ7_PcKRHWsuHb6oeYCs9kdXELUoN6iTwV_XmkmmDHv1yl",
          Refresh:
            "eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJtZW1iZXIiLCJzdWIiOiJhZG1pbjJAZ21haWwuY29tIiwiaWF0IjoxNjg5MTUyNTc4LCJleHAiOjE2ODkxNzc3Nzh9.zViqGeK0prclMHuxxtfM2lVOYaGC0RPW5lvJmXgDqUhLr9-BjAxBIEhByTuSs0l_",
        },
      })
      .then(res => setQnaData(res.data));
  }, []);

  return (
    <>
      <BoardDetail
        title={qnaData?.title}
        name={qnaData?.writer.name}
        viewCount={qnaData?.view}
        createdAt={qnaData?.createAt.slice(0, 10)}
        content={qnaData?.content}
      />
      <Comment />
    </>
  );
};

export default QnaDetailPage;
