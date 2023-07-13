import useInput from "../../hooks/useInput";
import axios from "axios";
import * as S from "./style";
import EditButton from "../../assets/icons/EditButton";
import DeleteButton from "../../assets/icons/DeleteButton";
import elapsedTime from "../../utils/elapsedTime";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "@/constants/constants";
import { CommentTypes } from "@/types/shared";

// TODO: 수정, 삭제 기능 구현
// TODO: API 연동하기

interface CommentProps {
  comments: CommentTypes[] | any;
  setComplete: React.Dispatch<React.SetStateAction<boolean>> | any;
}

const Comment = ({ comments, setComplete }: CommentProps) => {
  const [commentValue, changeHandler, reset] = useInput("");
  const navigate = useNavigate();
  const { questionId } = useParams();

  const handleEditComment = () => {
    alert("수정 기능 구현 예정");
  };

  const handleDeleteComment = (commentId: string | number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        axios.delete(
          BASE_URL + `/questions/${questionId}/comments/${commentId}`
        );
        navigate(`/questions/${questionId}`);
      } catch {
        console.log("error!");
      }
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        BASE_URL + `/questions/${questionId}/comments`,
        { content: commentValue },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzM4NCJ9.eyJhZG1pbm5hbWUiOiJhZG1pbjEyM0BnbWFpbC5jb20iLCJhZG1pbklkIjo2LCJzdWIiOiJhZG1pbjEyM0BnbWFpbC5jb20iLCJpYXQiOjE2ODkyMTQyMjcsImV4cCI6MTY4OTIxNjAyN30.tPBTKTOni7ecbzca_GvbWoLAdI6o2mFq3Xd9NJeCysunTiZgpIhTA1oKdOZTf3TA",
            Refresh:
              "eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJhZG1pbiIsInN1YiI6ImFkbWluMTIzQGdtYWlsLmNvbSIsImlhdCI6MTY4OTIxNDIyNywiZXhwIjoxNjg5MjM5NDI3fQ.Na4xZk2WKAIUyOStcZwy0zwjo9bURsUMfGZ2dcy-RdwbX7XJCsaR_lqQv8Ls5AM3",
          },
        }
      )
      .then(setComplete(true));

    reset && reset();
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
        {comments.length === 0 ? (
          <div className="none_comment">작성된 댓글이 없습니다.</div>
        ) : (
          comments.map((e: CommentTypes) => (
            <S.CommentBox key={e.commentId}>
              <div className="comment_info_box">
                <div className="comment_info">
                  <span>작성자 : {e.admin.name}</span>
                  <span>{elapsedTime(new Date(e.createAt))}</span>
                </div>
                <div className="comment_content">{e.content}</div>
              </div>
              <div className="comment_update_btn">
                <button onClick={handleEditComment}>
                  <EditButton />
                </button>
                <button onClick={() => handleDeleteComment(e.commentId)}>
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
