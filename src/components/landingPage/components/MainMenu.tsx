import "../../../styles/mainSectionStyles/mainMenu.css";
import { RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  showWorkspaceDropdown,
  deleteWorkspace,
} from "../../../redux/features/WorkspaceSlice";
import { Link } from "react-router-dom";
import { setCreateWorkspace } from "../../../redux/features/popUpCreateComponentSlice";
import { handleRemoveAllRecentsFromDeletedBoard } from "../../../utils/SetRecentlyViewed";
import { RecentlyViewedContext } from "../../../context/recentlyViewedContext";
import { HighlightedTaskContext } from "../../../context/highlightedTaskContext";
import { useContext } from "react";
import { useSetRW } from "../../../context/recentlyViewedContext";
import { useSetHT } from "../../../context/highlightedTaskContext";
import { handleRemoveHighlightedTaskOnWorkspaceDeleting } from "../../../utils/SetHighlightedTask";

const MainMenu: React.FC = () => {
  const dispatch = useDispatch();
  const setLastWatched = useSetRW();
  const setHighlights = useSetHT();

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const recents = useContext(RecentlyViewedContext);
  const highlights = useContext(HighlightedTaskContext);

  const showDropdown = (id: string) => {
    dispatch(showWorkspaceDropdown({ id }));
  };

  const showWorkspaceCreating = () => {
    dispatch(setCreateWorkspace());
  };

  const isWorkspace = workspaces[0];

  const deleteWorkspaceFunc = (workspaceId: string) => {
    dispatch(
      deleteWorkspace({
        workspaceId: workspaceId,
      })
    );
  };

  const removeFromLastWatched = (workspaceName: string) => {
    handleRemoveAllRecentsFromDeletedBoard(
      recents,
      workspaceName,
      setLastWatched
    );
  };

  const handleRemoveHighlight = (workspaceId: string) => {
    handleRemoveHighlightedTaskOnWorkspaceDeleting(
      highlights,
      workspaceId,
      setHighlights
    );
  };

  const handleWorkspaceRemove = (
    workspaceId: string,
    workspaceName: string
  ) => {
    deleteWorkspaceFunc(workspaceId);
    removeFromLastWatched(workspaceName);
    handleRemoveHighlight(workspaceId);
  };

  return (
    <div className="mainSectionMenuDiv">
      <h3>Меню</h3>

      <Link className="menuLink" to="/boards">
        <div className="menuBoards">
          <i className="bi bi-calendar-check" />
          <p className="menuBoardsDescription">Доски</p>
        </div>
      </Link>

      <Link className="menuLink" to="/overview">
        <div className="menuHome">
          <i className="bi bi-house" />
          <p className="menuHomeDescription">Главная</p>
        </div>
      </Link>

      <div className="menuWorkspacesHeading">
        <p
          style={
            isWorkspace
              ? { fontWeight: "normal" }
              : { fontWeight: "bold", color: "black" }
          }
        >
          Рабочее пространство
        </p>
        <i
          onClick={showWorkspaceCreating}
          style={
            isWorkspace
              ? { fontSize: "1.2em" }
              : { fontSize: "1.2em", color: "black" }
          }
          className="bi bi-plus"
        />
      </div>

      {isWorkspace &&
        workspaces.map((workspace) => {
          return (
            <ul key={workspace.workspaceId} className="menuWorkspaces">
              <div
                onClick={() => showDropdown(workspace.workspaceId)}
                className="workspace"
              >
                <p>
                  <span
                    style={{
                      color: workspace.workspaceLetterColor,
                      fontSize: "1.4em",
                      marginRight: ".1em",
                    }}
                  >
                    {workspace.workspaceName[0]}
                  </span>
                  {workspace.workspaceName.substring(1)}
                </p>
                <i
                  style={{ fontSize: "1.3em" }}
                  className={
                    workspace.workspaceLandingPageMenu
                      ? "bi bi-arrow-up-short"
                      : "bi bi-arrow-down-short"
                  }
                />
              </div>
              {workspace.workspaceLandingPageMenu && (
                <div className="workspaceSettings">
                  <li className="workspaceOption">
                    <i className="bi bi-calendar-check"></i>
                    <Link
                      className="workspaceMenuLink"
                      to={`/workspace/${workspace.workspaceId}`}
                    >
                      <p className="menuBoardsDescription">Доски</p>
                    </Link>
                  </li>
                  <div
                    onClick={() =>
                      handleWorkspaceRemove(
                        workspace.workspaceId,
                        workspace.workspaceName
                      )
                    }
                    className="workspaceOption"
                  >
                    <i className="bi bi-trash" />
                    <p className="menuBoardsDescription">Удалить</p>
                  </div>
                </div>
              )}
            </ul>
          );
        })}
    </div>
  );
};

export default MainMenu;
