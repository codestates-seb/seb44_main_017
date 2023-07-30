import * as S from "./style";
import elapsedTime from "@/utils/elapsedTime";
import { useEffect, useRef } from "react";
import {
  LoginUserInfo,
  ProductCommentTypes,
  QnACommentTypes,
} from "@/types/shared";

interface Props {
  comments: QnACommentTypes[] | ProductCommentTypes[] | any;
  qPath: boolean;
  userInfo: LoginUserInfo | null;
  selectedId: number;
  updateValue: string;
  isEditMode: boolean;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  setUpdateValue: React.Dispatch<React.SetStateAction<string>>;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  updateHandler: (commentId: number) => void;
}

const Comments = (props: Props) => {
  const {
    comments,
    qPath,
    userInfo,
    selectedId,
    updateValue,
    isEditMode,
    setSelectedId,
    setUpdateValue,
    setIsEditMode,
    setIsOpenConfirm,
    updateHandler,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
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
    </S.CommentsLayout>
  );
};

export default Comments;
