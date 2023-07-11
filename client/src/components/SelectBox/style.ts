import styled from "styled-components";

export const SelectBox = styled.div`
  position: relative;
  width: 100px;
  height: 24px;
  flex-shrink: 0;
  border: 2px solid var(--color-darkblue);
  border-radius: 40px;
  background: radial-gradient(
    190.97% 141.42% at 100% 100%,
    rgba(247, 247, 247, 0.7) 0%,
    rgba(247, 247, 247, 0.7) 100%
  );
  /* margin: 0 10px 12px 0; */
  backdrop-filter: blur(5px);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: var(--font-size-12);
  font-weight: 700;
  /* left: 10px;
  top: 10px; */

  & svg {
    position: absolute;
    right: 3px;

    @media (max-width: 767px) {
      right: 0;
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 767px) {
    width: 80px;
    height: 20px;
    border: 2px solid var(--color-darkblue);
    font-weight: 500;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 90px;
    height: 22px;
    border: 2px solid var(--color-darkblue);
  }
`;

export const Label = styled.span`
  width: 90%;
  text-align: center;
`;

export const SelectOptions = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 34px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: max-content;
  max-height: ${props => (props.isOpen ? "none" : "0")};
  padding: 0;
  border: ${props =>
    props.isOpen ? "2px solid var(--color-darkblue)" : "none"};
  border-radius: 8px;
  background: radial-gradient(
    190.97% 141.42% at 100% 100%,
    rgba(247, 247, 247, 1) 0%,
    rgba(247, 247, 247, 1) 100%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #111;
  appearance: none;
  z-index: 10;
`;

export const Option = styled.li`
  text-align: center;
  padding: 6px 0;
  transition: background-color 0.2s ease-in;
  border-bottom: 1px solid var(--color-lightivory);

  &:hover {
    background-color: var(--color-darkgreen);
  }
`;
