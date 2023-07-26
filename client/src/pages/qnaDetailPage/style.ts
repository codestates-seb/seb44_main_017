import styled from "styled-components";

export const SpeedDialContainer = styled.div`
  position: absolute;
  bottom: 36px;
  right: 112px;

  @media (max-width: 767px) {
    bottom: 80px;
    right: 12px;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    bottom: 60px;
    right: 28px;
  }

  @media (min-width: 1024px) {
    position: absolute;
    bottom: 144px;
    right: 112px;
  }
`;
