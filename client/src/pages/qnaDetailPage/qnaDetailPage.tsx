import BoardDetail from "@/components/BoardDetail/BoardDetail";
import { BASE_URL } from "@/constants/constants";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { QnACommentTypes, QnaTypes } from "@/types/shared";
import Comment from "@/components/Comment/Comment";
import { getToken } from "@/utils/token";
import * as S from "@/pages/qnaDetailPage/style";
import SpeedDialCustom from "@/components/SpeedDialCustom/SpeedDialCustom";

const initialValue: QnaTypes = {
  questionId: "",
  title: "",
  content: "",
  createAt: "",
  modifyAt: "",
  view: "",
  writer: {
    memberId: "",
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
  const [commentData, setCommentData] = useState<QnACommentTypes[]>([]);
  const [complete, setComplete] = useState(false);

  const [authorization, refresh] = getToken();

  const getDetailData = async () => {
    try {
      const { data, status } = await axios.get(
        BASE_URL + `/questions/${questionId}`,
        {
          headers: authorization
            ? {
                Authorization: `${authorization}`,
                Refresh: `${refresh}`,
              }
            : {},
        }
      );

      if (data && status === 200) {
        setQnaData(data);
        setCommentData(data.qcomments);
        setComplete(false);
      }
    } catch (e) {
      console.error("Failed fetching data", e);
    }
  };

  useEffect(() => {
    getDetailData();
  }, [complete]);

  return (
    <>
      <BoardDetail
        title={qnaData.title}
        name={qnaData.writer?.name}
        viewCount={qnaData.view}
        createdAt={qnaData.createAt.slice(0, 10)}
        content={qnaData.content}
      />
      <S.SpeedDialContainer>
        <SpeedDialCustom />
      </S.SpeedDialContainer>
      <div style={{ paddingTop: "36px" }}>
        <Comment comments={commentData} setComplete={setComplete} />
      </div>
    </>
  );
};

export default QnaDetailPage;
