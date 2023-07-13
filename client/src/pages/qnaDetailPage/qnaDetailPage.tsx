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
            "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiYWRtaW4yQGdtYWlsLmNvbSIsInN1YiI6ImFkbWluMkBnbWFpbC5jb20iLCJpYXQiOjE2ODkyMDU3MzYsImV4cCI6MTY4OTIwNzUzNn0.BI4GbSphJZW8LFD0JM49IbL6WIeUV4ZkK9hUlpWt_hpWPQ2TvyPbcda8WBisAfCC",
          Refresh:
            "eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJtZW1iZXIiLCJzdWIiOiJhZG1pbjJAZ21haWwuY29tIiwiaWF0IjoxNjg5MjA1NzM2LCJleHAiOjE2ODkyMzA5MzZ9.95NR8khbMiPGKilSreRZk2VT5VGCD5uRIw8LIlapb3LpUW3iv1IvIAr0UFhnJ1Yj",
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
        usage={"questions"}
      />
      <div style={{ marginTop: "36px" }}>
        <Comment />
      </div>
    </>
  );
};

export default QnaDetailPage;
