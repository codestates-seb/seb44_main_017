import { useState, useEffect } from "react";
import useInput from "../../hooks/useInput";
import axios from "axios";
import * as S from "./style";
import EditButton from "../../assets/icons/EditButton";
import DeleteButton from "../../assets/icons/DeleteButton";
import elapsedTime from "../../utils/elapsedTime";

interface CommentProps {
  commentId: string;
  content: string;
  createAt: string;
  modifyAt: string;
  writer: {
    memberId: string;
    name: string;
  };
}

// TODO: 수정, 삭제 기능 구현
// TODO:

const Comment = () => {
  const initialValue: CommentProps = {
    commentId: "",
    content: "",
    createAt: "",
    modifyAt: "",
    writer: {
      memberId: "",
      name: "",
    },
  };

  const [commentValue, changeHandler, reset] = useInput("");
  const [commentList, setCommentList] = useState<CommentProps[]>([
    initialValue,
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:5173/src/moks/comment.json")
      .then(res => setCommentList(res.data));
  }, []);

  const handleEditComment = () => {
    alert("수정 기능 구현 예정");
  };

  const handleDeleteComment = () => {
    alert("삭제 기능 구현 예정");
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("commentValue = ", commentValue);
    reset();
  };

  return (
    <S.Container>
      <S.InputLayout onSubmit={submitHandler}>
        <input
          type="text"
          onChange={changeHandler}
          value={commentValue}
          placeholder="Add Comment..."
        />
        <button>댓글 쓰기</button>
      </S.InputLayout>
      <S.CommentsLayout>
        {commentList.length === 1 && commentList[0].commentId === "" ? (
          <div className="none_comment">작성된 댓글이 없습니다.</div>
        ) : (
          commentList.map(e => (
            <S.CommentBox key={e.commentId}>
              <div className="comment_info_box" key={e.commentId}>
                <div className="comment_info">
                  <span>작성자 : {e.writer.name}</span>
                  <span>{elapsedTime(new Date(e.createAt))}</span>
                </div>
                <div className="comment_content">{e.content}</div>
              </div>
              <div className="comment_update_btn">
                <button onClick={handleEditComment}>
                  <EditButton />
                </button>
                <button onClick={handleDeleteComment}>
                  <DeleteButton />
                </button>
              </div>
            </S.CommentBox>
          ))
        )}
      </S.CommentsLayout>
    </S.Container>
  );
};

export default Comment;
