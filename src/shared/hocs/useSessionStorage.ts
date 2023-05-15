import { useState, useEffect } from 'react';

function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const storedValue: T | null = JSON.parse(sessionStorage.getItem(key) || 'null');
  const [value, setValue] = useState<T>(storedValue || initialValue);

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const updateValue = (newValue: T): void => {
    setValue(newValue);
  };

  return [value, updateValue];
}

export default useSessionStorage;