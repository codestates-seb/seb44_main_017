import useInput from "../../hooks/useInput";
import * as S from "./style";
import { useLocation, useParams } from "react-router-dom";
import {
  LoginUserInfo,
  ProductCommentTypes,
  QnACommentTypes,
} from "@/types/shared";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userInfoSelector } from "@/recoil/selector";
import CustomConfirm from "@/utils/customConfirm";
import { createComment, deleteComment, updateComment } from "@/api/comment";
import CommentInput from "./CommentInput";
import Comments from "./Comments";

interface CommentProps {
  comments: QnACommentTypes[] | ProductCommentTypes[] | any;
  setComplete: React.Dispatch<React.SetStateAction<boolean>> | any;
}

const Comment = ({ comments, setComplete }: CommentProps) => {
  const location = useLocation();
  const qPath = location.pathname.startsWith("/questions");

  const [commentValue, changeHandler, reset] = useInput("");
  const [selectedId, setSelectedId] = useState<number>(-1);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateValue, setUpdateValue] = useState("");

  const { questionId, productsID } = useParams();
  const userInfo = useRecoilValue<LoginUserInfo | null>(userInfoSelector);

  // 댓글 수정 API
  const updateHandler = async (commentId: number) => {
    try {
      const id = qPath ? questionId : productsID;
      const props = {
        id,
        commentId,
        qPath,
        value: updateValue,
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
        value: commentValue,
      };
      const { status } = await createComment(props);
      if (status === 201) {
        setComplete(true);
        reset && reset();
      }
    } catch (e) {
      console.error("failed submit!", e);
    }
  };

  return (
    <S.Container>
      <CommentInput
        userInfo={userInfo}
        qPath={qPath}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        commentValue={commentValue}
      />
      <Comments
        comments={comments}
        qPath={qPath}
        userInfo={userInfo}
        selectedId={selectedId}
        updateValue={updateValue}
        isEditMode={isEditMode}
        setSelectedId={setSelectedId}
        setUpdateValue={setUpdateValue}
        setIsEditMode={setIsEditMode}
        setIsOpenConfirm={setIsOpenConfirm}
        updateHandler={updateHandler}
      />
      {isOpenConfirm && (
        <CustomConfirm
          content={"정말 삭제하시겠습니까?"}
          isOpenConfirm={isOpenConfirm}
          setIsOpenConfirm={setIsOpenConfirm}
          handleDeleteComment={handleDeleteComment}
          id={selectedId}
        />
      )}
    </S.Container>
  );
};

export default Comment;
