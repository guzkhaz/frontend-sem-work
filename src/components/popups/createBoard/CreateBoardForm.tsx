import { WorkspaceInterface } from "../../../interfaces/WorkspaceInterface"

interface Props {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    setBoardName: (e: React.FormEvent<HTMLInputElement>) => void;
    handleBoardWorkspaceChange: (e: React.FormEvent<HTMLSelectElement>) => void;
    workspaces: WorkspaceInterface[];
    boardName: string;
    boardWorkspace: string
}

const CreateBoardForm: React.FC<Props> = ({ handleSubmit, setBoardName, handleBoardWorkspaceChange, workspaces, boardName, boardWorkspace }) => {
    return (

        <form
            className="createBoardForm"
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div className="boardTitleDiv">
                <p className="boardTitle">Имя доски</p>
                <input
                    className="boardNameInput"
                    onChange={setBoardName}
                    type="text"
                    name="boardName"
                />
                <p className="boardTitleInfo">Имя доски должно быть уникальным!</p>
            </div>

            <div className="chooseWorkspaceDiv">
                <p className="workspaceChoiceHeading">Рабочее пространство</p>
                <select
                    onChange={handleBoardWorkspaceChange}
                    className="workspaceSelect"
                    name="workspaces"
                    id="workspaces"
                >
                    <option value="" disabled selected>
                        Пространство
                    </option>
                    {workspaces.map((workspace) => {
                        return (
                            <option
                                key={workspace.workspaceId}
                                value={workspace.workspaceName}
                            >
                                {workspace.workspaceName}
                            </option>
                        );
                    })}
                </select>
                <p className="boardTitleInfo">Выберите рабочее пространство!</p>
            </div>

            <div className="submitDiv">
                <button
                    type="submit"
                    disabled={boardName === "" || !boardWorkspace}
                    className="submitBoardBtn"
                >
                    Создать
                </button>
            </div>
        </form>
    )
}

export default CreateBoardForm;
