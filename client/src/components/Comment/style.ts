import styled from "styled-components";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: 40px 0;
`;

export const InputLayout = styled.form`
  display: flex;
  border: 1px solid var(--color-lightivory);
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  background-color: #fff;
  color: var(--color-black);
  border-radius: 5px;
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
  flex-direction: column;
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  border: 1px solid var(--color-lightivory);
  padding: 16px 24px;
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
  padding-top: 8px;

  & .comment_info_box {
    width: 100%;
  }

  & .comment_info {
    font-size: 14px;
    display: flex;
    gap: 20px;
    line-height: 10px;

    @media (max-width: 767px) {
      flex-direction: column;
      font-size: var(--font-size-12);
    }
  }

  & .modify_box {
    padding-right: 24px;
    max-width: 800px;
    width: 100%;
  }

  & .comment_modify_form {
    padding: 5px 10px;
    border: 1px solid var(--color-gray100);
    border-radius: 5px;
    margin: 12px 0;
    font-size: var(--font-size-16);
    width: 90%;

    @media (max-width: 767px) {
      flex-direction: column;
      font-size: var(--font-size-12);
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      font-size: 14px;
    }
  }

  & > .comment_update_btn {
    display: flex;
    gap: 5px;
    align-items: center;

    & button {
      background: none;
      border: none;
    }

    & svg:hover {
      transform: scale(1.1);
    }

    & > .comment_modify_btn {
      border-radius: 8px;
      font-weight: var(--font-weight-700);
      font-size: var(--font-size-12);
      border: 0;
      color: var(--color-white);
      margin: 0;
      width: 70px;
      height: 30px;
      background-color: var(--color-lightred);
      padding: 4px;

      &:hover {
        background-color: #e35757;
      }
    }
  }

  & .comment_content {
    padding: 12px 30px 12px 5px;

    @media (max-width: 767px) {
      font-size: var(--font-size-12);
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      font-size: 14px;
    }
  }
`;
