import BoardDetail from "@/components/BoardDetail/BoardDetail";
import { BASE_URL } from "@/constants/constants";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CommentTypes, QnaTypes } from "@/types/shared";
import Comment from "@/components/Comment/Comment";

const initialValue: QnaTypes = {
  questionId: "",
  title: "",
  content: "",
  createAt: "",
  modifyAt: "",
  view: "",
  writer: {
    adminId: "",
    name: "",
  },
  qcomments: [
    {
      commentId: "",
      content: "",
      createAt: "",
      modifyAt: "",
      writer: {
        adminId: "",
        name: "",
      },
    },
  ],
};

const QnaDetailPage = () => {
  const { questionId } = useParams();
  const [qnaData, setQnaData] = useState<QnaTypes>(initialValue);
  const [commentData, setCommentData] = useState<CommentTypes[]>([]);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    axios
      .get(BASE_URL + `/questions/${questionId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzM4NCJ9.eyJhZG1pbm5hbWUiOiJhZG1pbjEwMEBnbWFpbC5jb20iLCJhZG1pbklkIjoxLCJzdWIiOiJhZG1pbjEwMEBnbWFpbC5jb20iLCJpYXQiOjE2ODkyMzg3ODUsImV4cCI6MTY4OTI0MDU4NX0.54aijTx2gNH14of4D3VOfWxKuX-zQl_OPl_mlDRL1XcTsfFNcDUWFu-qTChzC0HE",
          Refresh:
            "eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJhZG1pbiIsInN1YiI6ImFkbWluMTAwQGdtYWlsLmNvbSIsImlhdCI6MTY4OTIzODc4NSwiZXhwIjoxNjg5MjYzOTg1fQ.3hdFw6W6B-QbTatxpptkuSiZDE1kYKCvTbuOIJEurlTsffmIXqCDgwZwbWIKGkbr",
        },
      })
      .then(res => {
        setQnaData(res.data);
        setCommentData(res.data.qcomments);
        setComplete(false);
      });
  }, [complete]);

  return (
    <>
      <BoardDetail
        title={qnaData.title}
        name={qnaData.writer.name}
        viewCount={qnaData.view}
        createdAt={qnaData.createAt.slice(0, 10)}
        content={qnaData.content}
        usage={"questions"}
      />
      <div style={{ marginTop: "36px" }}>
        <Comment comments={commentData} setComplete={setComplete} />
      </div>
    </>
  );
};

export default QnaDetailPage;
