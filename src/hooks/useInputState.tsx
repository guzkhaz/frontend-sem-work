import { useState } from "react";

const useInputState = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [limitedValue, setLimitedValue] = useState(initialValue);
  const [maxLimitedValue, setMaxLimitedValue] = useState(initialValue);
  const [error, setError] = useState(initialValue);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleLimitedChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (limitedValue.length > 14) {
      setError("Cannot excide 14 characters");
    } else {
      setError("");
    }
    setLimitedValue(e.currentTarget.value);
  };

  const handleMaxLimited = (e: React.FormEvent<HTMLInputElement>) => {
    if (maxLimitedValue.length > 50) {
      setError("Cannot excide 50 characters");
    } else {
      setError("");
    }
    setMaxLimitedValue(e.currentTarget.value);
  };

  const reset = () => {
    setValue("");
  };

  const handleError = (msg: string) => {
    setError(msg);
  };

  return [
    value,
    handleChange,
    limitedValue,
    handleLimitedChange,
    maxLimitedValue,
    handleMaxLimited,
    error,
    handleError,
    reset,
  ] as const;
};

export default useInputState;
