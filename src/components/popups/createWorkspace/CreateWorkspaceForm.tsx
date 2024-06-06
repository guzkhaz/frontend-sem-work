interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setWorkspaceName: (e: React.FormEvent<HTMLInputElement>) => void;
  nameError: string;
  workspaceDescription: string;
  setWorkspaceDescription: (e: React.FormEvent<HTMLInputElement>) => void;
  descriptionError: string;
  workspaceName: string;
}

const CreateWorkspaceForm: React.FC<Props> = ({
  handleSubmit,
  setWorkspaceDescription,
  setWorkspaceName,
  nameError,
  workspaceDescription,
  workspaceName,
  descriptionError,
}) => {
  return (
    <form
      className="createWorkspaceForm"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="workspaceNameInputDiv">
        <p className="workspaceName">Имя пространства</p>
        <input
          className="workspaceNameInput"
          placeholder="Введите имя"
          onChange={setWorkspaceName}
          type="text"
          name="workspaceName"
        />
      </div>
      {nameError && <p className="workspaceNameError">{nameError}</p>}
      <div className="workspaceDescriptionInputDiv">
        <p className="workspaceDescription">Описание</p>
        <input
          placeholder="Добавьте описание"
          className="workspaceDescriptionInput"
          value={workspaceDescription}
          onChange={setWorkspaceDescription}
          type="text"
          name="workspaceName"
        />
      </div>
      {descriptionError && (
        <p className="workspaceNameError">{descriptionError}</p>
      )}
      <button
        disabled={
          nameError !== "" ||
          workspaceName.length < 1 ||
          descriptionError !== ""
        }
        className="submitBtn"
        type="submit"
      >
        Добавить
      </button>
    </form>
  );
};

export default CreateWorkspaceForm;
