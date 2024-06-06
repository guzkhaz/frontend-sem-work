import "../../styles/columnStyles/editColumnForm.css";
import { deleteColumn } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import { copyColumn } from "../../redux/features/WorkspaceSlice";
import { useSetHT } from "../../context/highlightedTaskContext";
import { useContext } from "react";
import { HighlightedTaskContext } from "../../context/highlightedTaskContext";
import { handleRemoveHighlightedTaskOnColumnDeleting } from "../../utils/SetHighlightedTask";

interface EditColumnInterface {
  setColumnEditing: () => void;
  setTaskAdding: () => void;
  columnId: string | undefined;
  boardId: string | undefined;
  workspaceId: string | undefined;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const EditColumnForm: React.FC<EditColumnInterface> = ({
  setColumnEditing,
  setTaskAdding,
  columnId,
  boardId,
  workspaceId,
  forwardRef,
}) => {
  const dispatch = useDispatch();
  const setHighlights = useSetHT();
  const highlights = useContext(HighlightedTaskContext);

  const handleHighlightRemove = (columnId: string | undefined) => {
    handleRemoveHighlightedTaskOnColumnDeleting(
      highlights,
      columnId,
      setHighlights
    );
  };

  const deleteColumnFunc = () => {
    handleHighlightRemove(columnId);
    dispatch(
      deleteColumn({
        workspaceId: workspaceId,
        boardId: boardId,
        columnId: columnId,
      })
    );
    setColumnEditing();
  };

  const addTaskFunc = () => {
    setTaskAdding();
    setColumnEditing();
  };

  const copyColumnFunc = () => {
    dispatch(
      copyColumn({
        workspaceId: workspaceId,
        columnId: columnId,
        boardId: boardId,
      })
    );
    setColumnEditing();
  };

  return (
    <div ref={forwardRef} className="editColumnFormDiv">
      <div className="edidColumnFormDivHeading">
        <p className="editColumnHeading">Дествия с категорией</p>
        <i onClick={setColumnEditing} className="bi bi-x-lg"></i>
      </div>

      <div className="editColumnFormActions">
        <p onClick={addTaskFunc}>Добавить задачу..</p>
        <p onClick={deleteColumnFunc}>Удалить категорию..</p>
        <p onClick={copyColumnFunc}>Копировать категорию..</p>
      </div>
    </div>
  );
};

export default EditColumnForm;
