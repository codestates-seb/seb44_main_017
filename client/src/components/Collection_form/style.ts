import styled from "styled-components";

export const FormContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-gray100);
`;

export const ContentContainer = styled.div`
  display: flex;
`;

export const Imagebox = styled.div`
  display: flex;
  flex-direction: column;

  & > .image_background {
    border: 1px solid var(--color-gray100);
    padding: 4px;
  }

  & img {
    width: 292px;
    height: 292px;
    object-fit: cover;
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;
