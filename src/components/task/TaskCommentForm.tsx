import "../../styles/taskStyles/taskCommentForm.css";
import { addTaskComment } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import { date } from "../../utils/GetDate";
import useInputState from "../../hooks/useInputState";
import { useEffect, useState } from "react";

interface TaskCommentFormInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string | undefined;
}

const TaskCommentForm: React.FC<TaskCommentFormInterface> = ({
  workspaceId,
  boardId,
  columnId,
  taskId,
}) => {
  const [taskComment, setTaskComment, , , , , , , reset] = useInputState("");
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setUserName(user);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addTaskComment({
        workspaceId: workspaceId,
        boardId: boardId,
        columnId: columnId,
        taskId: taskId,
        taskComment,
        taskAuthor: userName,
        taskDate: date,
      })
    );
    reset();
  };

  return (
    <div className="taskCommentFormDiv">
      <form
        className="taskCommentForm"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          className="taskCommentInput"
          value={taskComment}
          onChange={setTaskComment}
          type="text"
          name="comment"
          placeholder="Напишите комментарий.."
        />
      </form>
    </div>
  );
};

export default TaskCommentForm;
