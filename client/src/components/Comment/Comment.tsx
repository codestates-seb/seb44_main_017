import { useState, useEffect } from "react";
import useInput from "../../hooks/useInput";
import axios from "axios";
import * as S from "./style";
import EditButton from "../../assets/icons/EditButton";
import DeleteButton from "../../assets/icons/DeleteButton";

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
  console.log("commentValue = ", commentValue);
  console.log("list = ", commentList);

  useEffect(() => {
    axios
      .get("http://localhost:5173/src/moks/comment.json")
      .then(res => setCommentList(res.data));
  }, []);

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
        {commentList.length > 0 &&
          commentList.map(e => (
            <S.CommentBox>
              <div className="comment_info_box" key={e.commentId}>
                <div className="comment_info">
                  <span>작성자 : {e.writer.name}</span>
                  <span>작성일 : {e.createAt}</span>
                </div>
                <div className="comment_content">{e.content}</div>
              </div>
              <div className="comment_update_btn">
                <EditButton />
                <DeleteButton />
              </div>
            </S.CommentBox>
          ))}
      </S.CommentsLayout>
    </S.Container>
  );
};

export default Comment;
