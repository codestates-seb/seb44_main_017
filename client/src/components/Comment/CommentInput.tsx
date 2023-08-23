import * as S from "./style";
import { LoginUserInfo } from "@/types/shared";

interface Props {
  userInfo: LoginUserInfo | null;
  qPath: boolean;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  commentRef: React.RefObject<HTMLInputElement>;
}

const CommentInput = (props: Props) => {
  const { userInfo, qPath, submitHandler, commentRef } = props;

  return (
    <>
      {/**
       * [댓글 작성 레이아웃 보이는 조건]
       * QnA: 관리자인 경우
       * Product: 사용자, 관리자 모두
       */}
      {(userInfo?.role === "admin" || (!qPath && userInfo)) && (
        <S.InputLayout onSubmit={submitHandler}>
          <input
            type="text"
            ref={commentRef}
            placeholder="댓글을 작성해주세요."
          />
          <button>댓글 쓰기</button>
        </S.InputLayout>
      )}
    </>
  );
};

export default CommentInput;
