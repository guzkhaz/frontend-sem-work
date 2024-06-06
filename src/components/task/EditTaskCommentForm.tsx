import "../../styles/taskStyles/editTaskComment.css";
import { editTaskComment } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import useInputState from "../../hooks/useInputState";

interface EditTaskCommentInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string | undefined;
  taskComment: string;
  setEditing: (comment: string) => void;
}

const EditTaskCommentForm: React.FC<EditTaskCommentInterface> = ({
  workspaceId,
  boardId,
  columnId,
  taskId,
  taskComment,
  setEditing,
}) => {
  const [newTaskComment, setNewTaskComment] = useInputState('')

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      editTaskComment({
        workspaceId: workspaceId,
        boardId: boardId,
        columnId: columnId,
        taskId: taskId,
        taskComment: taskComment,
        newComment: newTaskComment,
      })
    );

    setEditing("");
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
          value={newTaskComment}
          onChange={setNewTaskComment}
          type="text"
          name="comment"
          placeholder="Введите новый комментарий"
          autoFocus
        />
      </form>
    </div>
  );
};

export default EditTaskCommentForm;
