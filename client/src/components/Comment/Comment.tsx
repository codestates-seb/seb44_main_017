import useInput from "../../hooks/useInput";
import axios from "axios";
import * as S from "./style";
import elapsedTime from "../../utils/elapsedTime";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "@/constants/constants";
import {
  LoginUserInfo,
  ProductCommentTypes,
  QnACommentTypes,
} from "@/types/shared";
import { useEffect, useState, useRef } from "react";
import { getToken } from "@/utils/token";
import { useRecoilValue } from "recoil";
import { userInfoSelector } from "@/recoil/selector";

interface CommentProps {
  comments: QnACommentTypes[] | ProductCommentTypes[] | any;
  setComplete: React.Dispatch<React.SetStateAction<boolean>> | any;
}

const Comment = ({ comments, setComplete }: CommentProps) => {
  const userInfo = useRecoilValue<LoginUserInfo | null>(userInfoSelector);
  const [commentValue, changeHandler, reset] = useInput("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateValue, setUpdateValue] = useState("");
  const [selectedId, setSelectedId] = useState<number | string>(-1);

  const { questionId, productsID } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const qPath = location.pathname.startsWith("/questions");

  const inputRef = useRef<HTMLInputElement>(null);

  const [authorization, refresh] = getToken();

  useEffect(() => {
    comments.map((item: any) => {
      (qPath ? item.commentId : item.productCommentId) === selectedId &&
        setUpdateValue(item.content);
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
        qPath
          ? BASE_URL + `/questions/${questionId}/comments/${commentId}`
          : BASE_URL + `/products/${productsID}/comments/${commentId}`,
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
    } catch (e) {
      console.log("failed update!", e);
    }
  };

  const handleEditComment = (id: number | string) => {
    setSelectedId(id);
    setIsEditMode(true);

    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 0);
  };

  const handleDeleteComment = (commentId: string | number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        axios
          .delete(
            qPath
              ? BASE_URL + `/questions/${questionId}/comments/${commentId}`
              : BASE_URL + `/products/${productsID}/comments/${commentId}`,
            {
              headers: {
                Authorization: `${authorization}`,
                Refresh: `${refresh}`,
              },
            }
          )
          .then(setComplete(true));

        qPath
          ? navigate(`/questions/${questionId}`)
          : navigate(`/products/${productsID}`);
      } catch (e) {
        console.log("failed delete comment", e);
      }
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      axios
        .post(
          qPath
            ? BASE_URL + `/questions/${questionId}/comments`
            : BASE_URL + `/products/${productsID}/comments`,
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
    } catch (e) {
      console.error("failed submit!", e);
    }
  };

  return (
    <S.Container>
      {/**
       * [댓글 작성 레이아웃 보이는 조건]
       * QnA: 관리자인 경우
       * Product: 사용자, 관리자 모두
       */}
      {userInfo?.role === "admin" || !qPath ? (
        <S.InputLayout onSubmit={submitHandler}>
          <input
            type="text"
            onChange={changeHandler}
            value={commentValue}
            placeholder="댓글을 작성해주세요."
          />
          <button>댓글 쓰기</button>
        </S.InputLayout>
      ) : (
        ""
      )}
      <S.CommentsLayout>
        {Array.isArray(comments) && comments.length === 0 ? (
          <div className="none_comment">작성된 댓글이 없습니다.</div>
        ) : (
          comments.map((e: QnACommentTypes | ProductCommentTypes | any) => (
            <S.CommentBox key={qPath ? e.commentId : e.productCommentId}>
              <S.CommentInfoBox>
                <S.CommentInfo
                  isWriter={
                    qPath
                      ? e.writer.adminId === userInfo?.memberId
                      : e.writer.memberId === userInfo?.memberId
                  }
                >
                  <span className="comment_writer">{e.writer.name}</span>
                  <span className="comment_created_at">
                    {elapsedTime(new Date(e.createAt))}
                  </span>
                </S.CommentInfo>
                {isEditMode &&
                (qPath ? e.commentId : e.productCommentId) === selectedId ? (
                  <S.ModifyBox>
                    <input
                      className="comment_modify_form"
                      type="text"
                      value={updateValue}
                      ref={inputRef}
                      onChange={e => setUpdateValue(e.target.value)}
                      onKeyUp={onkeyHandler}
                    />
                    <button
                      className="modify_complete_btn"
                      onClick={() =>
                        updateHandler(qPath ? e.commentId : e.productCommentId)
                      }
                    >
                      수정완료
                    </button>
                  </S.ModifyBox>
                ) : (
                  <div className="comment_content">{e.content}</div>
                )}
              </S.CommentInfoBox>

              {/*
               * [수정, 삭제 버튼 보이는 조건]
               * QnA: 작성한 관리자인 경우
               * Product: 작성한 관리자 & 사용자인 경우
               */}

              {(!isEditMode &&
                qPath &&
                userInfo?.role === "admin" &&
                userInfo?.memberId === e.writer.adminId) ||
              (!isEditMode &&
                userInfo?.role === "user" &&
                userInfo?.memberId === e.writer.memberId) ? (
                <S.UpdateBtnBox>
                  <>
                    <button
                      className="modify_btn"
                      onClick={() =>
                        handleEditComment(
                          qPath ? e.commentId : e.productCommentId
                        )
                      }
                    >
                      수정
                      {/* <EditButton /> */}
                    </button>
                    <button
                      className="delete_btn"
                      onClick={() =>
                        handleDeleteComment(
                          qPath ? e.commentId : e.productCommentId
                        )
                      }
                    >
                      삭제
                      {/* <DeleteButton /> */}
                    </button>
                  </>
                </S.UpdateBtnBox>
              ) : (
                ""
              )}
            </S.CommentBox>
          ))
        )}
      </S.CommentsLayout>
    </S.Container>
  );
};

export default Comment;
