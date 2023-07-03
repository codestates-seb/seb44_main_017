import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

export const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 360px;
  height: 422px;
  background-color: rgba(247, 247, 247, 0.7);
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
  justify-content: center;
`;

export const CloseButton = styled.button`
  width: 16px;
  height: 16px;
`;
export const Close = styled(CloseIcon)`
  width: 100%;
  height: 16px;
  /* position: absolute;
  right: 10px; */
`;
