import { useEffect, useState } from 'react';

type TUseLocalStorageOutput = [string, (value: string) => void];

const useLocalStorage = (key: string, initialValue: string = ''): TUseLocalStorageOutput => {
  const [value, setValue] = useState<string>(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
