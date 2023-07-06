import { useState, useEffect } from "react";
import useInput from "../../hooks/useInput";
import axios from "axios";
import * as S from "./style";

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
      <div>
        {commentList.length > 0 &&
          commentList.map(e => (
            <>
              <div key={e.commentId}>
                <div>
                  <span>{e.writer.name}</span>
                  <span>{e.createAt}</span>
                </div>
                <div>{e.content}</div>
              </div>
              // 오른쪽
              <div>
                <button>수정</button>
                <button>삭제</button>
              </div>
            </>
          ))}
      </div>
    </S.Container>
  );
};

export default Comment;
