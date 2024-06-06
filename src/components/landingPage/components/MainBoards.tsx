import "../../../styles/mainSectionStyles/mainBoards.css";
import { RootState } from "../../../redux/Store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RecentlyViewedContext } from "../../../context/recentlyViewedContext";
import { useContext } from "react";

const MainBoards: React.FC = () => {
  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const recents = useContext(RecentlyViewedContext);

  return (
    <div className="mainSectionBoards">
      <div className="mainSectionBoardsRecentlyViewedHeadingDiv">
        <i className="bi bi-clock"></i>
        <h4>Недавно просмотренные</h4>
      </div>

      <div className="mainSectionBoardsDivs">
        {recents.map((board) => {
          return (
            <div
              key={board.id}
              className="mainSectionYourBoard"
              style={{ background: `${board.background}` }}
            >
              {" "}
              <Link
                className="workspaceMenuLink"
                to={`/board/${board.workspaceId}/${board.id}`}
              >
                <p>{board.name}</p>{" "}
              </Link>
            </div>
          );
        })}
      </div>

      <h4 className="mainSectionYourWorkspacesHeading">Ваши пространства</h4>

      {workspaces.map((workspace) => {
        return (
          <div key={workspace.workspaceId} className="boardFromWorkspace">
            <h4>{workspace.workspaceName}</h4>
            <div className="mainSectionBoardsDivs">
              {workspace.workspaceBoards.map((board) => {
                return (
                  <div
                    key={board.boardId}
                    className="mainSectionYourBoard"
                    style={{ background: `${board.boardBackground}` }}
                  >
                    {" "}
                    <Link
                      className="workspaceMenuLink"
                      to={`/board/${workspace.workspaceId}/${board.boardId}`}
                    >
                      <p>{board.boardName}</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainBoards;
