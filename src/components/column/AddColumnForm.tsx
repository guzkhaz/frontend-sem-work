import "../../styles/columnStyles/addColumnForm.css";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskInterface } from "../../interfaces/WorkspaceInterface";
import { addColumn } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import UseClickOutside from "../../hooks/UseClickOutside";
import useToggle from "../../hooks/useToggle";
import useInputState from "../../hooks/useInputState";

interface AddingColumnFormInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
}

const AddColumnForm: React.FC<AddingColumnFormInterface> = ({
  boardId,
  workspaceId,
}) => {
  const [addingColumn, setAddingColumn] = useToggle(false);
  const [, , , , columnName, setColumnName, error, setError] =
    useInputState("");
  const [columnTasks] = useState<TaskInterface[]>([]);

  const dispatch = useDispatch();

  const createColumnRef = useRef<HTMLDivElement>(null);

  UseClickOutside(createColumnRef, () => setAddingColumn());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!columnName) {
      setError("Can't add an empty column");
    } else {
      dispatch(
        addColumn({
          columnName,
          columnId: uuidv4(),
          boardId: boardId,
          workspaceId: workspaceId,
          columnTasks,
        })
      );
      setAddingColumn();
    }
  };

  if (addingColumn) {
    return (
      <div ref={createColumnRef} className="addColumnFormDiv">
        <form
          className="addColumnFormForm"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            className="columnNameInput"
            onChange={setColumnName}
            type="text"
            name="columnName"
            placeholder="Введите название категории.."
            autoFocus
          />
          {error && <p className="error">{error}</p>}
          <div className="addColumnButtonIcon">
            <button disabled={error !== ""} type="submit">
              Добавить категорию
            </button>
            <i
              onClick={setAddingColumn}
              style={{ fontSize: "1.1em" }}
              className="bi bi-x-lg"
            />
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div onClick={setAddingColumn} className="addColumnInitialDiv">
        <i className="bi bi-plus-lg" />
        <p> Добавить категорию</p>
      </div>
    );
  }
};

export default AddColumnForm;
