import "../../styles/columnStyles/column.css";
import EditColumnForm from "./EditColumnForm";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import AddTaskForm from "../task/AddTaskForm";
import Task from "../task/Task";
import { Droppable } from "react-beautiful-dnd";
import UseClickOutside from "../../hooks/UseClickOutside";
import useToggle from "../../hooks/useToggle";

interface ColumnInterface {
  columnId: string;
  boardId: string | undefined;
  workspaceId: string | undefined;
}

const Column: React.FC<ColumnInterface> = ({
  columnId,
  boardId,
  workspaceId,
}) => {
  const [columnEditing, setColumnEditing] = useToggle(false);
  const [taskAdding, setTaskAdding] = useToggle(false);

  const addTaskRef = useRef<HTMLDivElement>(null);
  const editColumnRef = useRef<HTMLDivElement>(null);

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const shownWorkspace = workspaces.find((workspace) => {
    return workspace.workspaceId === workspaceId;
  });

  const shownBoard = shownWorkspace?.workspaceBoards.find((board) => {
    return board.boardId === boardId;
  });

  const shownColumn = shownBoard?.boardColumns.find((column) => {
    return column.columnId === columnId;
  });

  const columnTasks = shownColumn?.columnTasks;

  UseClickOutside(addTaskRef, () => setTaskAdding());

  UseClickOutside(editColumnRef, () => setColumnEditing());

  return (
    <div className="boardCOLUMNdiv">
      <div className="boardCOLUMNHeader">
        <p>{shownColumn?.columnName}</p>
        <i onClick={setColumnEditing} className="bi bi-three-dots" />
      </div>

      {columnEditing && (
        <EditColumnForm
          forwardRef={editColumnRef}
          setTaskAdding={setTaskAdding}
          setColumnEditing={setColumnEditing}
          columnId={columnId}
          boardId={boardId}
          workspaceId={workspaceId}
        />
      )}

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className="droppableTasks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columnTasks?.map((task, index) => {
              return (
                <Task
                  key={task.taskId}
                  taskName={task.taskName}
                  taskId={task.taskId}
                  taskIndicatorColor={task.taskIndicatorColor}
                  taskDescription={task.taskDescription}
                  taskComments={task.taskComments}
                  workspaceId={workspaceId}
                  boardId={boardId}
                  columnId={columnId}
                  columnName={shownColumn?.columnName}
                  index={index}
                />
              );
            })}
            <div
              style={{ width: "1px", height: "1px" }}
              className="droppable_ID_adder"
            ></div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {taskAdding ? (
        <AddTaskForm
          key={columnId}
          setTaskAdding={setTaskAdding}
          workspaceId={workspaceId}
          boardId={boardId}
          columnId={columnId}
          forwardRef={addTaskRef}
        />
      ) : (
        <div onClick={setTaskAdding} className="boardCOLUMNAddTask">
          <i style={{ fontSize: "1.3em" }} className="bi bi-plus" />
          <p>Добавить задачу</p>
        </div>
      )}
    </div>
  );
};

export default Column;
