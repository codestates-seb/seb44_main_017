import styled from "styled-components";

export const Container = styled.article`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputLayout = styled.form`
  display: flex;
  border: 1px solid var(--color-lightivory);
  min-width: 65%;
  padding: 24px;
  background-color: #fff;
  color: var(--color-black);
  border-radius: 5px;
  justify-content: space-evenly;
  gap: 10px;

  & > input {
    width: 100%;
    padding: 7px;
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
