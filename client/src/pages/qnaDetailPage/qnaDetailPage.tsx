import BoardDetail from "@/components/BoardDetail/BoardDetail";
import { BASE_URL } from "@/constants/constants";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CommentTypes, QnaTypes } from "@/types/shared";
import Comment from "@/components/Comment/Comment";

const QnaDetailPage = () => {
  const { questionId } = useParams();
  const [qnaData, setQnaData] = useState<QnaTypes>();
  const [commentData, setCommentData] = useState<CommentTypes[]>([]);

  useEffect(() => {
    axios
      .get(BASE_URL + `/questions/${questionId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiYWRtaW4zQGdtYWlsLmNvbSIsInN1YiI6ImFkbWluM0BnbWFpbC5jb20iLCJpYXQiOjE2ODkyMTIxMDQsImV4cCI6MTY4OTIxMzkwNH0.oYU1T-5dvAQPAPXhP9WIzub-SHsWRZ-d7vW-ACZFtdfGgseTuumHSK5K8RWa-L3U",
          Refresh:
            "eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJtZW1iZXIiLCJzdWIiOiJhZG1pbjNAZ21haWwuY29tIiwiaWF0IjoxNjg5MjEyMTA0LCJleHAiOjE2ODkyMzczMDR9.epcIh9jeBNEvHu3vStGuk6UhCV075FJgtIvUyWy68zaho0HT7XJKq76suE2eaLjW",
        },
      })
      .then(res => {
        setQnaData(res.data);
        setCommentData(res.data.qcomments);
      });
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
        <Comment comments={commentData} />
      </div>
    </>
  );
};

export default QnaDetailPage;
