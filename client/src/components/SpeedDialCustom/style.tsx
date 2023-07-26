import styled from "styled-components";
import { PiNotePencilLight } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";

export const CloseIcon = styled(AiOutlineClose)`
  width: 24px;
  height: 24px;
  @media (max-width: 767px) {
    width: 12px;
    height: 12px;
  }
`;
export const ModifyIcon = styled(PiNotePencilLight)`
  width: 24px;
  height: 24px;
  @media (max-width: 767px) {
    width: 12px;
    height: 12px;
  }
`;
export const DeleteIcon = styled(RiDeleteBin6Line)`
  width: 24px;
  height: 24px;
  @media (max-width: 767px) {
    width: 16px;
    height: 16px;
  }
`;
export const Modify = styled(SpeedDialIcon)`
  .MuiSpeedDial-fab {
    background-color: var(--color-darkblue);
    @media (max-width: 767px) {
      width: 32px;
      height: 32px;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      width: 48px;
      height: 48px;
    }
    @media (min-width: 1024px) {
      width: 60px;
      height: 60px;
    }
  }
  .MuiSpeedDial-fab > span {
    width: 24px;
    height: 24px;
    @media (max-width: 767px) {
      width: 16px;
      height: 16px;
    }
  }
`;
export const SpeedDialBox = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: var(--color-darkblue);
    @media (max-width: 767px) {
      width: 32px;
      height: 32px;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      width: 48px;
      height: 48px;
    }
    @media (min-width: 1024px) {
      width: 60px;
      height: 60px;
    }
  }
  .MuiSpeedDial-fab:active {
    background-color: var(--color-darkblue);
  }
  .MuiSpeedDial-fab:hover {
    background-color: #2b475ce6;
  }
  div > button {
    background-color: var(--color-gray100);
    color: #545454;
    @media (max-width: 767px) {
      width: 24px;
      height: 24px;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      width: 36px;
      height: 36px;
    }
    @media (min-width: 1024px) {
      width: 48px;
      height: 48px;
    }
  }
`;
export const SpeedDialActionBox = styled(SpeedDialAction)``;
