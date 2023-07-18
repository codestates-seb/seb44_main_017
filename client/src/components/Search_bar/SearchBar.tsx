import SearchIcon from "@/assets/icons/SearchIcon";
import { useState } from "react";
import styled from "styled-components";

interface SearchBarProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  submitHandler: () => void;
}

const SearchBar = ({
  searchValue,
  setSearchValue,
  submitHandler,
}: SearchBarProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Form isFocus={isFocus}>
      <SearchIcon />
      <SearchElement>
        <input
          type="text"
          value={searchValue}
          placeholder="Search..."
          onChange={e => setSearchValue(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <button onClick={submitHandler}>검색</button>
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
  border: ${props =>
    props.isFocus
      ? "2px solid var(--color-black)"
      : "1px solid var(--color-gray100)"};
  border-radius: 4px;
  padding: 4px;
  background-color: var(--color-white);
  margin: 0 auto;

  position: relative;
  top: 50px;
  left: 50px;

  & svg {
    outline: none;
    padding: 4px;
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
    padding: 8px 16px 8px 8px;
    width: 80%;
    font-size: 14px;
    outline: none;
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
