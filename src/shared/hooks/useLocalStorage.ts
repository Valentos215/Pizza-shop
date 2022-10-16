import { useEffect, useState } from "react";

type useLStOutput = [string, React.Dispatch<React.SetStateAction<string>>];

const useLocalStorage = (
  key: string,
  initialValue: string = ""
): useLStOutput => {
  const [value, setValue] = useState<string>(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
