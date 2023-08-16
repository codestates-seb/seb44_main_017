import BoardDetail from "@/components/BoardDetail/BoardDetail";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { LoginUserInfo, QnACommentTypes, QnaTypes } from "@/types/shared";
import Comment from "@/components/Comment/Comment";
import { getDetail } from "@/api/qna";
import { useRecoilValue } from "recoil";
import { userInfoSelector } from "@/recoil/selector";

const QnaDetailPage = () => {
  const { questionId } = useParams();
  const userInfo = useRecoilValue<LoginUserInfo | null>(userInfoSelector);
  const [qnaData, setQnaData] = useState<QnaTypes>();
  const [commentData, setCommentData] = useState<QnACommentTypes[]>([]);
  const [complete, setComplete] = useState(false);

  const getDetailData = async () => {
    try {
      const { data, status } = await getDetail({
        questionId,
        userInfo: userInfo || undefined,
      });

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
        title={qnaData?.title}
        name={qnaData?.writer?.name}
        viewCount={qnaData?.view}
        createdAt={qnaData?.createAt.slice(0, 10)}
        content={qnaData?.content}
      />
      <div style={{ paddingTop: "36px" }}>
        <Comment comments={commentData} setComplete={setComplete} />
      </div>
    </>
  );
};

export default QnaDetailPage;
