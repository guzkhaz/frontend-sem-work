import "../../../styles/popUpStyles/createBoardPopUp.css";
import { colorChoices } from "../../../utils/colors/BoardBgColorChoices";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/Store";
import { addBoard } from "../../../redux/features/WorkspaceSlice";
import { useNavigate } from "react-router-dom";
import { hideCreateBoard } from "../../../redux/features/popUpCreateComponentSlice";
import useInputState from "../../../hooks/useInputState";
import CreateBoardForm from "./CreateBoardForm";

interface CreateBoardProps {
  forwardRef: React.RefObject<HTMLDivElement>;
}

const CreateBoardPopUp: React.FC<CreateBoardProps> = ({ forwardRef }) => {
  const [boardName, setBoardName] = useInputState("");
  const [boardId] = useState<string>(uuidv4());
  const [boardBackground, setBoardBackground] = useState<string>(
    "linear-gradient(#e66465, #9198e5)"
  );
  const [boardWorkspace, setBoardWorkspace] = useState<string>("");
  const [boardWorkspaceId, setBoardWorkspaceId] = useState<string | undefined>(
    ""
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const hideCreating = () => {
    dispatch(hideCreateBoard());
  };

  const handleBoardWorkspaceChange = (
    e: React.FormEvent<HTMLSelectElement>
  ): void => {
    const workspace = workspaces.find(
      (workspace) => workspace.workspaceName === e.currentTarget.value
    );
    setBoardWorkspace(e.currentTarget.value);
    setBoardWorkspaceId(workspace?.workspaceId);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addBoard({
        boardName,
        boardId,
        boardWorkspace,
        boardBackground,
        boardColumns: [],
      })
    );
    hideCreating();
    navigate(`/board/${boardWorkspaceId}/${boardId}`, { replace: true });
  };

  return (
    <div ref={forwardRef} className="createBoardDiv">
      <p className="createBoardHeading">Создать доску</p>
      <i onClick={hideCreating} className="bi bi-x" />

      <div className="createBoardImg">
        <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" />
      </div>

      <div className="createBoardBackground">
        <p>Фон</p>

        <div className="colorChoice">
          {colorChoices.map((choice) => {
            return (
              <div
                onClick={() => setBoardBackground(choice)}
                key={choice}
                className="colorChoiceDiv"
                style={
                  boardBackground === choice
                    ? { border: "3px solid black", background: choice }
                    : { background: choice }
                }
              />
            );
          })}
        </div>
      </div>
      {
        <CreateBoardForm
          handleSubmit={handleSubmit}
          setBoardName={setBoardName}
          handleBoardWorkspaceChange={handleBoardWorkspaceChange}
          boardName={boardName}
          boardWorkspace={boardWorkspace}
          workspaces={workspaces}
        />
      }
    </div>
  );
};

export default CreateBoardPopUp;
