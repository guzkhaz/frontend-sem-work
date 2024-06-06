import PopUpMessage from "../popups/PopUpMessage";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeColor } from "../../redux/features/navigationSlice";
import MainOverview from "./overview/MainOverview";

const MainPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      changeColor({
        color: "#3cc384",
      })
    );
  }, []); // Change color to original after leaving a board.

  return (
    <div className="mainPageDiv">
      <MainOverview />
    </div>
  );
};

export default MainPage;
