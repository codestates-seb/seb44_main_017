import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  /* border: 4px solid red; */
`;

export const TitleWrapper = styled.div`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1264px;
  border-bottom: 4px solid black;
`;

export const InputTitle = styled.input`
  width: 100%;
  margin-left: 476px;
  border: none;
  outline: none;
  font-size: 2.25rem;
  color: var(--gray200);
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 16px;
  width: 100%;
  height: 100%;
  margin-top: 24px;
  /* border: 4px solid red; */
  min-height: 500px;
  max-width: 1264px;

  /* @media (max-width: 767px) {
    flex-direction: row;
  } */
`;

export const InputContents = styled.input`
  width: 100%;
  max-width: 1264px;
  min-height: 16px;
  border: none;
  outline: none;
  color: var(--gray200);
`;

export const BtnWrapper = styled.div`
  width: 86%;
  display: flex;
  justify-content: flex-end;
  /* border: 4px solid blue; */
`;

export const RegisterBtn = styled.button`
  width: 100%;
  max-width: 160px;
  height: 48px;
  border-radius: 20px;
  font-weight: var(--font-weight-700);
  margin-top: 16px;
  font-size: var(--font-size-24);
  border: 0;
  color: white;
  font-family: "Roboto";
  background-color: var(--color-darkblue);
`;
