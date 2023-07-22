import styled from "styled-components";

export const SelectBox = styled.div`
  position: relative;
  width: 100px;
  height: 24px;
  flex-shrink: 0;
  border: 2px solid var(--color-darkblue);
  border-radius: 40px;
  background-color: var(--color-white);
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: var(--font-size-12);
  font-weight: 700;
  z-index: 5;

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
  background-color: var(--color-white);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #111;

  & li:not(:last-child) {
    border-bottom: 1px solid var(--color-lightivory);
  }
`;

export const Option = styled.li`
  text-align: center;
  padding: 6px 0;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: var(--color-darkgreen);
  }
`;
