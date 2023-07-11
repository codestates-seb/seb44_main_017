import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 360px;
  height: 422px;
  background-color: rgba(247, 247, 247, 0.7);
  backdrop-filter: 10px;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const CloseButton = styled(CloseIcon)`
  width: 16px;
  height: 16px;
  position: absolute;
  right: 12px;
  top: 12px;
`;

export const LoginTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginTitle = styled.span`
  font-size: var(--font-size-36);
  font-weight: var(--font-weight-700);
  color: var(--color-darkgreen);
`;

export const Explanation = styled.div`
  color: var(--color-darkblue);
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-700);
  text-align: center;
`;

export const InputBox = styled.input`
  width: 280px;
  height: 24px;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 2px;
  border-color: var(--color-darkblue);
  outline: none;
  background-color: rgba(247, 247, 247, 0.7);
  margin-bottom: 24px;
  ::placeholder {
    color: var(--color-gray200);
    font-weight: var(--font-weight-700);
  }
`;

export const DuplicateCheck = styled.button`
  width: 80px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  background-color: var(--color-darkblue);
  color: var(--color-white);
  border-radius: 16px;
  position: absolute;
  top: 4px;
  right: 0px;
`;

export const PasswordLabel = styled.label`
  display: flex;
  position: relative;
`;

export const VisibilityButton = styled(VisibilityIcon)`
  width: 16px;
  height: 10px;
  color: var(--color-darkblue);
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
`;

export const AdminLabel = styled.label`
  font-weight: var(--font-weight-700);
  font-size: var(--font-size-12);
  color: var(--color-darkblue);
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const LoginButton = styled.button`
  width: 130px;
  height: 50px;
  background-color: var(--color-darkgreen);
  border-radius: 40px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-white);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
`;

export const ButtonTest = styled.button`
  width: 120px;
  height: 48px;
`;
