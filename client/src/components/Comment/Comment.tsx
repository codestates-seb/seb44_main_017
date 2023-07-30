import useInput from "../../hooks/useInput";
import * as S from "./style";
import elapsedTime from "../../utils/elapsedTime";
import { useLocation, useParams } from "react-router-dom";
import {
  LoginUserInfo,
  ProductCommentTypes,
  QnACommentTypes,
} from "@/types/shared";
import { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { userInfoSelector } from "@/recoil/selector";
import CustomConfirm from "@/utils/customConfirm";
import { createComment, deleteComment, updateComment } from "@/api/comment";

interface CommentProps {
  comments: QnACommentTypes[] | ProductCommentTypes[] | any;
  setComplete: React.Dispatch<React.SetStateAction<boolean>> | any;
}

const Comment = ({ comments, setComplete }: CommentProps) => {
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const qPath = location.pathname.startsWith("/questions");

  const [commentValue, changeHandler, reset] = useInput("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateValue, setUpdateValue] = useState("");
  const [selectedId, setSelectedId] = useState<number>(-1);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const { questionId, productsID } = useParams();
  const userInfo = useRecoilValue<LoginUserInfo | null>(userInfoSelector);

  // 선택된 댓글의 content 값으로 updateValue를 초기화
  useEffect(() => {
    comments.map((item: any) => {
      (qPath ? item.commentId : item.productCommentId) === selectedId &&
        setUpdateValue(item.content);
    });
  }, [selectedId]);

  // 엔터를 눌렀을 때 '수정완료'
  const onkeyHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      updateHandler(selectedId);
    }
  };

  // 댓글 수정 폼 + input창 focus
  const handleEditComment = (id: number) => {
    setSelectedId(id);
    setIsEditMode(true);

    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 0);
  };

  // 댓글 수정 API
  const updateHandler = async (commentId: number) => {
    try {
      const id = qPath ? questionId : productsID;
      const props = {
        id,
        commentId,
        qPath,
        updateValue,
      };
      const { data, status } = await updateComment(props);
      if (data && status === 200) {
        setComplete(true);
        setIsEditMode(false);
      }
    } catch (e) {
      console.log("failed update comment", e);
    }
  };

  // 댓글 삭제 API
  const handleDeleteComment = async (commentId: number) => {
    try {
      const id = qPath ? questionId : productsID;
      const props = {
        id,
        commentId,
        qPath,
      };
      const { status } = await deleteComment(props);
      if (status === 204) {
        setComplete(true);
      }
    } catch (e) {
      console.log("failed delete comment", e);
    }
  };

  // 댓글 작성 API
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (commentValue === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      const id = qPath ? questionId : productsID;
      const props = {
        id,
        qPath,
        commentValue,
      };
      const { data, status } = await createComment(props);
      if (data && status === 200) {
        setComplete(true);
        reset && reset();
      }
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
      {userInfo?.role === "admin" || (!qPath && userInfo) ? (
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
                    </button>
                    <button
                      className="delete_btn"
                      onClick={() => {
                        setIsOpenConfirm(true);
                        setSelectedId(qPath ? e.commentId : e.productCommentId);
                      }}
                    >
                      삭제
                    </button>
                  </>
                </S.UpdateBtnBox>
              ) : (
                ""
              )}
            </S.CommentBox>
          ))
        )}
        {isOpenConfirm && (
          <CustomConfirm
            content={"정말 삭제하시겠습니까?"}
            isOpenConfirm={isOpenConfirm}
            setIsOpenConfirm={setIsOpenConfirm}
            handleDeleteComment={handleDeleteComment}
            id={selectedId}
          />
        )}
      </S.CommentsLayout>
    </S.Container>
  );
};

export default Comment;
