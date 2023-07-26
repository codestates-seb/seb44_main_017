import BoardDetail from "@/components/BoardDetail/BoardDetail";
import { BASE_URL } from "@/constants/constants";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CommentTypes, QnaTypes } from "@/types/shared";
import Comment from "@/components/Comment/Comment";
import { getToken } from "@/utils/token";

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

  const [authorization, refresh] = getToken();

  useEffect(() => {
    axios
      .get(BASE_URL + `/questions/${questionId}`, {
        headers: {
          Authorization: `${authorization}`,
          Refresh: `${refresh}`,
        },
      })
      .then((res) => {
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
      <div style={{ paddingTop: "36px" }}>
        <Comment comments={commentData} setComplete={setComplete} />
      </div>
    </>
  );
};

export default QnaDetailPage;
