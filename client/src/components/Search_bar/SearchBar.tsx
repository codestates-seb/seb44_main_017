import SearchIcon from "@/assets/icons/SearchIcon";
import { useState } from "react";
import styled from "styled-components";

interface SearchBarProps {
  searchValue: string;
  changeHandler: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  searchHandler: (e: React.FormEvent) => void;
}

const SearchBar = ({
  searchValue,
  changeHandler,
  searchHandler,
}: SearchBarProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Form isFocus={isFocus}>
      <SearchElement>
        <input
          type="text"
          value={searchValue}
          placeholder="어떤 상품을 찾고 있나요?"
          onChange={changeHandler}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <SearchIcon onClick={searchHandler} />
      </SearchElement>
    </Form>
  );
};

export default SearchBar;

const Form = styled.form<{ isFocus: boolean }>`
  display: flex;
  align-items: center;
  max-width: 800px;
  width: 90%;
  border: ${(props) =>
    props.isFocus
      ? "2px solid var(--color-black)"
      : "1px solid var(--color-gray100)"};
  border-radius: 20px;
  background-color: var(--color-white);
  margin: 0 auto;
  @media (max-width: 767px) {
    padding: 4px 8px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 8px 8px;
  }
  @media (min-width: 1024px) {
    padding: 12px 12px;
  }

  & svg {
    outline: none;
  }
`;

const SearchElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & input {
    border: none;
    border-radius: 4px;
    width: 80%;
    font-size: 16px;
    outline: none;
    @media (max-width: 767px) {
      font-size: 10px;
    }
  }

  & button {
    border-radius: 8px;
    width: 60px;
    height: 24px;
    font-weight: var(--font-weight-700);
    font-size: var(--font-size-12);
    border: 0;
    background-color: var(--color-darkblue);
    color: var(--color-white);
    margin-right: 8px;
  }
`;
