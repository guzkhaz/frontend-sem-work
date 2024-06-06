import "../../../styles/mainSectionStyles/mainHighlights.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { HighlightedTaskContext } from "../../../context/highlightedTaskContext";
import { HighlightedTaskInterface } from "../../../interfaces/HighlightedTaskInterface";

const MainHighlights: React.FC = () => {
  const [taskToShow, setTaskToShow] = useState<HighlightedTaskInterface>();

  const highlightedTasks = useContext(HighlightedTaskContext);

  const user = localStorage.getItem("currentUser");

  useEffect(() => {
    const randomizedTask =
      highlightedTasks[Math.floor(Math.random() * highlightedTasks.length)];

    setTaskToShow(randomizedTask);
  }, [highlightedTasks]);

  return (
    <div className="mainSectionHighlightsDiv">
      <h3>Основные моменты</h3>

      <div className="highlightsInfo">
        <p className="highlightsInfoDescription">
          Будьте в курсе событий на своих рабочих местах и досках объявлений.
        </p>
      </div>

      {taskToShow && (
        <div className="highlight">
          <p className="highlightUser">
            Автор : {user}
          </p>
          <div
            style={{
              background: taskToShow.taskColor,
              width: "40px",
              height: "10px",
              borderRadius: "5px",
              marginTop: "1vh",
            }}
            className="highlightLabel"
          ></div>
          <p className="highlightMessage">{taskToShow.task}</p>
          <Link
            className="workspaceMenuLink"
            to={`/board/${taskToShow.workspaceId}/${taskToShow?.boardId}`}
          >
            <p className="highlightBoardInfo">
              <span>Местоположение</span>: {taskToShow.boardName} <span>доска</span>
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MainHighlights;
