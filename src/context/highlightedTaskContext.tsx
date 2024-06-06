import React, { createContext, useContext, useState, useEffect } from "react";
import { HighlightedTaskInterface } from "../interfaces/HighlightedTaskInterface";

export const HighlightedTaskContext = createContext<HighlightedTaskInterface[]>(
  []
);

export const SetHTContext = createContext<
  React.Dispatch<React.SetStateAction<HighlightedTaskInterface[]>> | undefined
>(undefined);

export const useSetHT = () => {
  const setHT = useContext(SetHTContext);

  if (!setHT) {
    throw new Error("Called outside setHT provider");
  }
  return setHT;
};

export const HTProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highlightedTask, setHighlightedTask] = useState<
    HighlightedTaskInterface[]
  >([]);

  useEffect(() => {
    const highlights = window.localStorage.getItem("highlights");

    if (highlights) {
      setHighlightedTask(JSON.parse(highlights));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("highlights", JSON.stringify(highlightedTask));
  }, [highlightedTask]);

  return (
    <HighlightedTaskContext.Provider value={highlightedTask}>
      <SetHTContext.Provider value={setHighlightedTask}>
        {children}
      </SetHTContext.Provider>
    </HighlightedTaskContext.Provider>
  );
};
