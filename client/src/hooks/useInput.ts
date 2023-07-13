import { ChangeEvent, useCallback, useState } from "react";

type UseInputProps<T> = [
  value: T,
  changeHandler: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void,
  reset?: () => void
];

const useInput = <T>(initialValue: T): UseInputProps<T> => {
  const [value, setValue] = useState<T>(initialValue);

  const changeHandler = (e: ChangeEvent<HTMLInputElement> | any) => {
    if (e.target) setValue(e.target.value);
  };

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, changeHandler, reset];
};

export default useInput;
