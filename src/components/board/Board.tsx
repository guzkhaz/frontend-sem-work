import "../../styles/boardStyles/board.css";
import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import Column from "../column/Column";
import AddColumnForm from "../column/AddColumnForm";
import { changeColor } from "../../redux/features/navigationSlice";
import {
  reArangeColumn,
  reArangeBetweenColumn,
  removeDraggedTaskFromColumn,
} from "../../redux/features/WorkspaceSlice";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { ColumnInterface } from "../../interfaces/WorkspaceInterface";
import { useSetRW } from "../../context/recentlyViewedContext";
import { useSetHT } from "../../context/highlightedTaskContext";
import { handleSetRecentlyViewed } from "../../utils/SetRecentlyViewed";
import { RecentlyViewedContext } from "../../context/recentlyViewedContext";
import { handleRemoveHighlightedTaskOnTaskDeleting } from "../../utils/SetHighlightedTask";
import { HighlightedTaskContext } from "../../context/highlightedTaskContext";

const Board: React.FC = () => {
  const { workspaceId, boardId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setLastWatched = useSetRW();
  const setHighlights = useSetHT();

  const highlights = useContext(HighlightedTaskContext);
  const recents = useContext(RecentlyViewedContext);

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );
  const user = localStorage.getItem("currentUser");

  const shownWorkspace = workspaces.find((workspace) => {
    return workspace.workspaceId === workspaceId;
  });

  const shownBoard = shownWorkspace?.workspaceBoards.find((board) => {
    return board.boardId === boardId;
  });

  const boardsColumns = shownBoard?.boardColumns;

  useEffect(() => {
    if (!shownBoard) {
      navigate(`/`, { replace: true });
    }
  }, [shownBoard]);

  useEffect(() => {
    handleSetRecentlyViewed(
      recents,
      shownBoard?.boardName,
      shownBoard?.boardBackground,
      shownBoard?.boardWorkspace,
      shownWorkspace?.workspaceId,
      shownBoard?.boardId,
      setLastWatched
    );
  }, [shownBoard]);

  useEffect(() => {
    if (shownBoard) {
      changeColorFunc(shownBoard.boardBackground);
    }
  }, []);

  useEffect(() => {
    if (shownBoard) {
      changeColorFunc(shownBoard.boardBackground);
    }
  }, [shownBoard?.boardId]); // To change navbar color when going from one board to another directly.

  const changeColorFunc = (color: string) => {
    dispatch(
      changeColor({
        color: color,
      })
    );
  };

  const reArangeColumnFunc = (newColumn: ColumnInterface, columnId: string) => {
    dispatch(
      reArangeColumn({
        workspaceId: shownWorkspace?.workspaceId,
        boardId: shownBoard?.boardId,
        newColumn,
        columnId,
      })
    );
  };

  const removeDraggedTaskFunc = (
    newColumn: ColumnInterface,
    columnId: string
  ) => {
    dispatch(
      removeDraggedTaskFromColumn({
        workspaceId: shownWorkspace?.workspaceId,
        boardId: shownBoard?.boardId,
        newColumn,
        columnId,
      })
    );
  };

  const reArangeBetweenColumnFunc = (
    startId: string,
    finishId: string,
    newColumnStart: ColumnInterface,
    newColumnFinish: ColumnInterface
  ) => {
    dispatch(
      reArangeBetweenColumn({
        workspaceId: shownWorkspace?.workspaceId,
        boardId: shownBoard?.boardId,
        startColumnId: startId,
        finishColumnId: finishId,
        newStartColumn: newColumnStart,
        newFinishColumn: newColumnFinish,
      })
    );
  };

  const handleRemoveHighlight = (taskId: string) => {
    handleRemoveHighlightedTaskOnTaskDeleting(
      highlights,
      taskId,
      setHighlights
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = boardsColumns?.find(
      (column) => column.columnId === source.droppableId
    );

    if (startColumn && destination.droppableId === "delete") {
      const newTaskIds = Array.from(startColumn?.columnTasks);

      newTaskIds.splice(source.index, 1);

      const newColumn = {
        ...startColumn,
        columnTasks: newTaskIds,
      };

      removeDraggedTaskFunc(newColumn, source.droppableId);
      handleRemoveHighlight(draggableId);
    }

    const endColumn = boardsColumns?.find(
      (column) => column.columnId === destination.droppableId
    );

    if (startColumn === endColumn) {
      if (startColumn) {
        const newTaskIds = Array.from(startColumn?.columnTasks);

        const itemToReArange = newTaskIds.find(
          (item) => item.taskId === draggableId
        );

        newTaskIds.splice(source.index, 1);

        if (itemToReArange) {
          newTaskIds.splice(destination.index, 0, itemToReArange);
        }

        const newColumn = {
          ...startColumn,
          columnTasks: newTaskIds,
        };

        reArangeColumnFunc(newColumn, source.droppableId);
        return;
      }
    }

    if (startColumn && endColumn) {
      const startTaskIds = Array.from(startColumn?.columnTasks);

      const itemToReArange = startTaskIds.find(
        (item) => item.taskId === draggableId
      );

      startTaskIds.splice(source.index, 1);

      const newStartColumn = {
        ...startColumn,
        columnTasks: startTaskIds,
      };

      const finishTaskIds = Array.from(endColumn?.columnTasks);

      if (itemToReArange) {
        finishTaskIds.splice(destination.index, 0, itemToReArange);
      }

      const newFinishColumn = {
        ...endColumn,
        columnTasks: finishTaskIds,
      };

      reArangeBetweenColumnFunc(
        source.droppableId,
        destination.droppableId,
        newStartColumn,
        newFinishColumn
      );
    }
  };

  return (
    <div
      style={{ background: `${shownBoard?.boardBackground}` }}
      className="boardDivBOARD"
    >
      <div className="boardHeadingBOARD">
        <h3 className="boardNameBOARD">Доска: {shownBoard?.boardName}</h3>
        {user ? (
          <h4 className="boardUserNameBOARD">{user} </h4>
        ) : (
          <h4 className="boardUserNameBOARD">
            {shownWorkspace?.workspaceMember}
          </h4>
        )}
      </div>

      <div className="boardAllColumnsDivBOARD">
        <DragDropContext onDragEnd={onDragEnd}>
          {boardsColumns?.map((column) => {
            return (
              <Column
                key={column.columnId}
                columnId={column.columnId}
                boardId={shownBoard?.boardId}
                workspaceId={shownWorkspace?.workspaceId}
              />
            );
          })}
          <Droppable droppableId="delete">
            {(provided) => (
              <i
                id="trash"
                className="bi bi-trash"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {provided.placeholder}
              </i>
            )}
          </Droppable>
        </DragDropContext>

        <AddColumnForm
          workspaceId={shownWorkspace?.workspaceId}
          boardId={shownBoard?.boardId}
        />
      </div>
    </div>
  );
};

export default Board;
