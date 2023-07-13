import styled from "styled-components";

export const Container = styled.article`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 40px 0;
  min-width: 320px;
`;

export const InputLayout = styled.form`
  display: flex;
  border: 1px solid var(--color-lightivory);
  width: 100%;
  max-width: 1264px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 24px;
  background-color: #fff;
  color: var(--color-black);
  border-radius: 5px;
  justify-content: space-evenly;
  gap: 10px;

  & > input {
    width: 100%;
    padding: 7px 10px;
    border: 1px solid var(--color-gray100);
    border-radius: 5px;

    &:focus {
      outline: 2px solid var(--color-darkblue);
    }
  }

  & > button {
    border-radius: 16px;
    width: 96px;
    height: 32px;
    font-weight: var(--font-weight-700);
    font-size: var(--font-size-12);
    border: 0;
    background-color: var(--color-darkblue);
    color: var(--color-white);

    &:hover {
      background-color: #507c9d;
    }
  }
`;

export const CommentsLayout = styled.div`
  display: flex;
  width: 100%;
  max-width: 1264px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
  border: 1px solid var(--color-lightivory);
  padding: 24px;
  border-radius: 5px;
  gap: 10px;

  & .none_comment {
    text-align: center;
  }
`;

export const CommentBox = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-lightivory);
  justify-content: space-between;
  width: 100%;

  & .comment_info {
    font-size: 12px;
    display: flex;
    gap: 20px;
    line-height: 10px;

    @media (max-width: 767px) {
      flex-direction: column;
    }
  }

  & > .comment_update_btn {
    display: flex;
    align-items: center;
    gap: 5px;

    & button {
      background: none;
      border: none;
    }
  }

  & .comment_content {
    padding: 12px 30px 12px 0;

    @media (max-width: 767px) {
      font-size: var(--font-size-12);
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      font-size: 14px;
    }
  }
`;
