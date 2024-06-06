import "../../../styles/mainSectionStyles/mainRecent.css";
import { Link } from "react-router-dom";
import { RecentlyViewedContext } from "../../../context/recentlyViewedContext";
import { useContext } from "react";

const MainRecent: React.FC = () => {
  const recents = useContext(RecentlyViewedContext);

  if (recents.length > 0) {
    return (
      <div className="mainRecentDiv">
        <h3>Последний просмотр</h3>

        {recents.map((board) => {
          return (
            <Link
              key={board.id}
              className="workspaceMenuLink"
              to={`/board/${board.workspaceId}/${board.id}`}
            >
              <div className="recentsDiv">
                <div
                  style={{ background: `${board.background}` }}
                  className="mainRecentSmallBlock"
                ></div>

                <div className="mainRecentTextDiv">
                  <p className="recentBoardName">{board.name}</p>
                  <p className="recentBoardDescription">{board.workspace}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="mainRecentDiv">
        <h3>Недавно просмотренные</h3>
        <p className="noRecentsInfo">Нет недавно просмотренных.</p>
      </div>
    );
  }
};

export default MainRecent;
