import React, { useRef } from "react";
import { useEffect, useState } from "react";

type useDetect = [
  boolean,
  React.MutableRefObject<HTMLDivElement | null>,
  () => void
];

const useDetectClose = (): useDetect => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const toggleHandler = () => setIsOpen(!isOpen);

  const handleClickOutside = (e: React.BaseSyntheticEvent | MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  return [isOpen, ref, toggleHandler];
};

export default useDetectClose;
