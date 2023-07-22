import styled from "styled-components";

export const FormContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-gray100);
  animation: fadeInDown 0.5s;

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translate3d(0, -10%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 50px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Imagebox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  align-items: center;

  & > .image_background {
    border-radius: 20px;
    border: 2px solid var(--dark-blue, #2b475c);
    background: var(--color-white);
    width: 292px;
    height: 292px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    @media (min-width: 768px) and (max-width: 1023px) {
      width: 200px;
      height: 200px;
    }
  }

  & img {
    width: 292px;
    height: 292px;
    object-fit: cover;
    border-radius: 20px;
  }

  & > .upload_btn {
    border: 2px solid var(--color-darkblue);
    border-radius: 40px;
    width: 160px;
    height: 35px;
    background-color: var(--color-white);
    /* background: radial-gradient(
      190.97% 141.42% at 100% 100%,
      rgba(247, 247, 247, 0.7) 0%,
      rgba(247, 247, 247, 0.7) 100%
    );
    backdrop-filter: blur(5px); */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    color: var(--color-darkblue);
    font-size: 16px;
    font-weight: 700;

    &:hover {
      background-color: var(--color-darkblue);
      color: var(--color-white);
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      width: 120px;
      height: 30px;
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 400px;

  @media (max-width: 767px) {
    width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 380px;
    font-size: 12px;
  }

  & > input {
    padding: 7px 10px;
    border: 2px solid var(--color-darkblue);
    border-radius: 12px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

    &:focus {
      outline: 1px solid var(--color-darkblue);
    }
  }

  & > textarea {
    border-radius: 12px;
    border: 2px solid var(--color-darkblue);
    resize: none;
    padding: 8px 12px;
    height: 180px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

    @media (min-width: 768px) and (max-width: 1023px) {
      height: 150px;
    }

    &:focus {
      outline: 1px solid var(--color-darkblue);
    }

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--color-darkblue);
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: grey;
      border-radius: 5px;
      box-shadow: inset 0px 0px 5px white;
    }
  }
`;
