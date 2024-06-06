import "../../styles/taskStyles/addTaskForm.css";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../../redux/features/WorkspaceSlice";
import { TaskCommentsInterface } from "../../interfaces/WorkspaceInterface";
import useInputState from "../../hooks/useInputState";
import { useSetHT } from "../../context/highlightedTaskContext";
import { HighlightedTaskContext } from "../../context/highlightedTaskContext";
import { handleSetHighlightedTask } from "../../utils/SetHighlightedTask";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

interface AddTaskInterface {
  setTaskAdding: React.Dispatch<React.SetStateAction<boolean>>;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const AddTaskForm: React.FC<AddTaskInterface> = ({
  setTaskAdding,
  workspaceId,
  boardId,
  columnId,
  forwardRef,
}) => {
  const [taskName, setTaskName, , , , , error, setError] = useInputState("");
  const [taskId] = useState<string>(uuidv4());
  const [taskDescription] = useState<string>("");
  const [taskComments] = useState<TaskCommentsInterface[]>([]);
  const [taskColor] = useState<string>("");

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const shownWorkspace = workspaces.find((workspace) => {
    return workspace.workspaceId === workspaceId;
  });

  const shownBoard = shownWorkspace?.workspaceBoards.find((board) => {
    return board.boardId === boardId;
  });

  const setHighlight = useSetHT();
  const highlights = useContext(HighlightedTaskContext);

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskName === "") {
      setError("Не удается добавить пустую задачу");
    } else {
      dispatch(
        addTask({
          workspaceId: workspaceId,
          boardId: boardId,
          columnId: columnId,
          taskName,
          taskId,
          taskIndicatorColor: taskColor,
          taskComments,
          taskDescription,
        })
      );
      setTaskAdding(false);
      handleSetHighlightedTask(
        highlights,
        workspaceId,
        boardId,
        shownBoard?.boardName,
        columnId,
        taskId,
        "Author",
        taskName,
        setHighlight
      );
    }
  };

  return (
    <div ref={forwardRef} className="addTaskFormDiv">
      <div className="addTaskDiv">
        <form
          className="addTaskForm"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            className="taskNameInput"
            onChange={setTaskName}
            type="text"
            name="taskName"
            placeholder="Введите название задачи"
            autoFocus
          />
          {error && <p className="error">{error}</p>}
          <div className="addTaskButtonIcon">
            <button type="submit">Добавить</button>
            <i
              style={{ fontSize: "1.3em" }}
              onClick={() => setTaskAdding(false)}
              className="bi bi-x-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
