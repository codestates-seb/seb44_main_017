import useInput from "../../hooks/useInput";
import axios from "axios";
import * as S from "./style";
import EditButton from "../../assets/icons/EditButton";
import DeleteButton from "../../assets/icons/DeleteButton";
import elapsedTime from "../../utils/elapsedTime";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "@/constants/constants";
import { CommentTypes } from "@/types/shared";
import { useEffect, useState, useRef } from "react";
import { getToken } from "@/utils/token";

interface CommentProps {
  comments: CommentTypes[];
  setComplete: React.Dispatch<React.SetStateAction<boolean>> | any;
}

const Comment = ({ comments, setComplete }: CommentProps) => {
  const [commentValue, changeHandler, reset] = useInput("");
  const { questionId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateValue, setUpdateValue] = useState("");
  const [selectedId, setSelectedId] = useState<number | string>(-1);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [authorization, refresh] = getToken();

  useEffect(() => {
    comments.map((item) => {
      item.commentId === selectedId && setUpdateValue(item.content);
    });
  }, [selectedId]);

  const onkeyHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      updateHandler(selectedId);
    }
  };

  const updateHandler = (commentId: number | string) => {
    try {
      axios.patch(
        BASE_URL + `/questions/${questionId}/comments/${commentId}`,
        {
          content: updateValue,
        },
        {
          headers: {
            Authorization: `${authorization}`,
            Refresh: `${refresh}`,
          },
        }
      );
      setComplete(true);
      setIsEditMode(false);
    } catch {
      console.log("error!");
    }
  };

  const handleEditComment = (id: number | string) => {
    setIsEditMode(true);
    setSelectedId(id);

    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 0);
  };

  const handleDeleteComment = (commentId: string | number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        axios
          .delete(BASE_URL + `/questions/${questionId}/comments/${commentId}`, {
            headers: {
              Authorization: `${authorization}`,
              Refresh: `${refresh}`,
            },
          })
          .then(setComplete(true));
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
            Authorization: `${authorization}`,
            Refresh: `${refresh}`,
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
                  <span>작성자 : {e.writer.name}</span>
                  <span>{elapsedTime(new Date(e.createAt))}</span>
                </div>
                {isEditMode && e.commentId === selectedId ? (
                  <div className="modify_box">
                    <input
                      className="comment_modify_form"
                      type="text"
                      value={updateValue}
                      ref={inputRef}
                      onChange={(e) => setUpdateValue(e.target.value)}
                      onKeyUp={onkeyHandler}
                    />
                  </div>
                ) : (
                  <div className="comment_content">{e.content}</div>
                )}
              </div>
              <div className="comment_update_btn">
                {isEditMode && e.commentId === selectedId ? (
                  <button
                    className="comment_modify_btn"
                    onClick={() => updateHandler(e.commentId)}
                  >
                    수정완료
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEditComment(e.commentId)}>
                      <EditButton />
                    </button>
                    <button onClick={() => handleDeleteComment(e.commentId)}>
                      <DeleteButton />
                    </button>
                  </>
                )}
              </div>
            </S.CommentBox>
          ))
        )}
      </S.CommentsLayout>
    </S.Container>
  );
};

export default Comment;
