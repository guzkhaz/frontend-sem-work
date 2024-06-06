import "../../styles/workspaceStyles/workspaceBoards.css";
import {
  WorkspaceInterface,
  BoardInterface,
} from "../../interfaces/WorkspaceInterface";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchForBoards from "./SearchForBoards";
import { useContext } from "react";
import { deleteBoard } from "../../redux/features/WorkspaceSlice";
import { setCreateBoard } from "../../redux/features/popUpCreateComponentSlice";
import { includesIgnoredCase } from "../../utils/IgnoreCase";
import { RecentlyViewedContext } from "../../context/recentlyViewedContext";
import { handleRemoveRecentlyViewed } from "../../utils/SetRecentlyViewed";
import { useSetRW } from "../../context/recentlyViewedContext";
import { handleRemoveHighlightedTaskOnBoardDeleting } from "../../utils/SetHighlightedTask";
import { useSetHT } from "../../context/highlightedTaskContext";
import { HighlightedTaskContext } from "../../context/highlightedTaskContext";

interface WorkspaceBoardsInterface {
  shownWorkspace: WorkspaceInterface | undefined;
  shownBoards: BoardInterface[] | undefined;
  setShownBoards: React.Dispatch<
    React.SetStateAction<BoardInterface[] | undefined>
  >;
}

const WorkspaceBoards: React.FC<WorkspaceBoardsInterface> = ({
  shownWorkspace,
  shownBoards,
  setShownBoards,
}) => {
  const dispatch = useDispatch();
  const setLastWatched = useSetRW();
  const setHighlights = useSetHT();

  const recents = useContext(RecentlyViewedContext);
  const highlights = useContext(HighlightedTaskContext);

  const showSearchedBoards = (searchingValue: string) => {
    const filtered = shownWorkspace?.workspaceBoards.filter((board) => {
      return includesIgnoredCase(board.boardName, searchingValue);
    });

    setShownBoards(filtered);
  };

  const deleteBoardFunc = (
    workspaceName: string | undefined,
    boardId: string
  ) => {
    dispatch(
      deleteBoard({
        workspaceName: workspaceName,
        boardId: boardId,
      })
    );
  };

  const removeFromLastWatched = (boardId: string) => {
    handleRemoveRecentlyViewed(recents, boardId, setLastWatched);
  };

  const removeFromHighlights = (boardId: string) => {
    handleRemoveHighlightedTaskOnBoardDeleting(
      highlights,
      boardId,
      setHighlights
    );
  };

  const handleBoardRemove = (workspaceName: string, boardId: string) => {
    deleteBoardFunc(workspaceName, boardId);
    removeFromLastWatched(boardId);
    removeFromHighlights(boardId);
  };

  const showBoardCreating = () => {
    dispatch(setCreateBoard());
  };

  return (
    <div className="workspaceBoardsDiv">
      <div className="workspaceBoardsHeading">
        <h4>Ваши доски</h4>
        <SearchForBoards
          boards={shownBoards}
          showSearchedBoards={showSearchedBoards}
        />
      </div>

      <div className="workspaceBoardsBoards">
        <p className="showingBoards">
          Досок {shownBoards?.length} из {" "}
          {shownWorkspace && shownWorkspace.workspaceBoards.length}
        </p>
        <div className="workspaceBoards">
          <div onClick={showBoardCreating} className="workspaceCreateBoard">
            <p>Создать новую доску</p>
          </div>

          {shownWorkspace &&
            shownBoards?.map((board) => {
              return (
                <div
                  key={board.boardId}
                  style={{ background: `${board.boardBackground}` }}
                  className="workspaceYourBoard"
                >
                  <Link
                    className="workspaceMenuLink"
                    to={`/board/${shownWorkspace?.workspaceId}/${board.boardId}`}
                  >
                    <p>{board.boardName}</p>
                  </Link>
                  <i
                    onClick={() =>
                      handleBoardRemove(board.boardWorkspace, board.boardId)
                    }
                    className="bi bi-trash3"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceBoards;
