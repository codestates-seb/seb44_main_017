import styled from "styled-components";

export const CategoryButton = styled.button<{ btnSelect: boolean }>`
  background-color: ${(props) => (props.btnSelect ? "#2b475c" : "#e9e6e1")};
  color: ${(props) => (props.btnSelect ? "#ffffff" : "#2b475c")};
  border: solid 2px #2b475c;
  border-radius: 30px;
  font-weight: 700;
  padding: 4px 0px;
  :nth-child(-n + 4) {
    margin-right: 16px;
  }
  @media (max-width: 767px) {
    font-size: 10px;
    width: 48px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 12px;
    width: 52px;
  }
  @media (min-width: 1024px) {
    font-size: 16px;
    width: 80px;
  }
`;
