import React, { createContext, useContext, useState, useEffect } from "react";
import { RecentlyViewedInterface } from "../interfaces/RecentlyViewedInterface";

export const RecentlyViewedContext = createContext<RecentlyViewedInterface[]>(
  []
);

export const SetRWContext = createContext<
  React.Dispatch<React.SetStateAction<RecentlyViewedInterface[]>> | undefined
>(undefined);

export const useSetRW = () => {
  const setRW = useContext(SetRWContext);

  if (!setRW) {
    throw new Error("Called outside setRW provider");
  }
  return setRW;
};

export const RWProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentlyWatched, setRecentlyWatched] = useState<
    RecentlyViewedInterface[]
  >([]);

  useEffect(() => {
    const recents = window.localStorage.getItem('recents');

    if (recents) {
      setRecentlyWatched(JSON.parse(recents))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('recents', JSON.stringify(recentlyWatched))
  }, [recentlyWatched])

  return (
    <RecentlyViewedContext.Provider value={recentlyWatched}>
      <SetRWContext.Provider value={setRecentlyWatched}>
        {children}
      </SetRWContext.Provider>
    </RecentlyViewedContext.Provider>
  );
};
