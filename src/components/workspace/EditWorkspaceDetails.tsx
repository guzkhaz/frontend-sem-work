import "../../styles/workspaceStyles/editWorkspaceDetails.css";
import useInputState from "../../hooks/useInputState";

interface EditWorkspaceProps {
  workspaceId: string | undefined;
  editWorkspace: (
    id: string | undefined,
    description: string | undefined
  ) => void;
  setEditting: () => void;
}

const EditWorkspaceDetails: React.FC<EditWorkspaceProps> = ({
  workspaceId,
  editWorkspace,
  setEditting,
}) => {
  const [, , newDescription, setNewDescription, error] = useInputState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editWorkspace(workspaceId, newDescription);
    setEditting();
  };

  return (
    <div className="editWorkspaceDetailsDiv">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="inputEditDiv">
          <p className="workspaceDescription">Описание пространства</p>
          <input
            className="workspaceDescriptionInput"
            value={newDescription}
            onChange={setNewDescription}
            type="text"
            name="workspaceDescription"
          />
        </div>
        {error && <p className="editWorkspaceDescriptionError">{error}</p>}

        <div className="editWorkspaceButtons">
          <button disabled={error !== ""} type="submit" className="saveButton">
            Сохранить
          </button>
          <button onClick={setEditting} className="cancelButton">
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWorkspaceDetails;
