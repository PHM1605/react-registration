import { useState, useEffect } from "react";

// can be used with a function e.g. getLocalValue('meanVal', generateRandomNumber)
const getLocalValue = (key, initValue) => {
  // Server-side React i.e. Next.js
  if (typeof window === 'undefined') return initValue;

  // if a value is already stored
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;
  // return result of a function
  if (initValue instanceof Function) return initValue();
  return initValue;
}

const useLocalStorage = (key, initValue) => {
  // useState can be used with a function
  const [value, setValue] = useState(
    () => { return getLocalValue(key, initValue) }
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value])

  return [value, setValue];
}

export default useLocalStorage;