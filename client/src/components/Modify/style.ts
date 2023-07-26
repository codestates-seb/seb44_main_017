import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* max-width: 1200px; */
  width: 100%;
  margin-top: 40px;
  /* border: 4px solid red; */
`;

export const TitleWrapper = styled.div`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  /* max-width: 1200px; */
  border-bottom: 4px solid black;
`;

export const InputTitle = styled.input`
  width: 100%;
  text-align: center;
  border: none;
  outline: none;
  font-size: 2.25rem;
  color: var(--gray200);
  @media (max-width: 767px) {
    font-size: 1rem;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.5rem;
  }
  @media (min-width: 1024px) {
  }
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 16px;
  width: 90%;
  height: 100%;
  margin-top: 24px;
  /* border: 4px solid red; */
  min-height: 500px;
  max-width: 1264px;

  /* @media (max-width: 767px) {
    flex-direction: row;
  } */
`;

export const InputContents = styled.textarea`
  width: 100%;
  resize: vertical;
  max-width: 1264px;
  min-height: 500px;
  border: none;
  outline: none;
  color: var(--gray200);
  @media (max-width: 767px) {
    font-size: 0.5rem;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.75rem;
  }
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
  margin-bottom: 16px;
  font-size: var(--font-size-24);
  border: 0;
  color: white;
  font-family: "Roboto";
  background-color: var(--color-darkblue);

  @media (max-width: 767px) {
    font-size: 0.75rem;
    max-width: 100px;
    height: 32px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    max-width: 120px;
    font-size: 1rem;
    height: 36px;
  }
  @media (min-width: 1024px) {
  }
`;
