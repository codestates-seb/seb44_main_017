import styled from "styled-components";

export const CategoryButton = styled.button<{ btnSelect: boolean }>`
  background-color: ${(props) => (props.btnSelect ? "#2b475c" : "white")};
  color: ${(props) => (props.btnSelect ? "#ffffff" : "#2b475c")};
  border: solid 2px #2b475c;
  border-radius: 30px;
  font-weight: 700;
  padding: 4px 0px;
  margin-right: 16px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  @media (max-width: 767px) {
    font-size: 10px;
    width: 52px;
    margin-right: 8px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 12px;
    margin-right: 8px;
    width: 90px;
  }
  @media (min-width: 1024px) {
    font-size: 12px;
    width: 100px;
  }
`;
