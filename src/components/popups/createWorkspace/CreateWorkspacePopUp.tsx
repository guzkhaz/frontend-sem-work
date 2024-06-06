import "../../../styles/popUpStyles/createWorkspacePopUp.css";
import { useState } from "react";
import { addWorkspace } from "../../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import { date } from "../../../utils/GetDate";
import { guestName } from "../../../utils/RandomizeGuestName";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { hideCreateWorkspace } from "../../../redux/features/popUpCreateComponentSlice";
import { generateRandomColor } from "../../../utils/colors/GenerateRandomColor";
import CreateWorkspaceForm from "./CreateWorkspaceForm";
import useInputState from "../../../hooks/useInputState";

interface CreateWorkspaceProps {
  forwardRef: React.RefObject<HTMLDivElement>;
}

const CreateWorkspacePopUp: React.FC<CreateWorkspaceProps> = ({
  forwardRef,
}) => {
  const [, , workspaceName, setWorkspaceName, , , nameError] = useInputState("");
  const [, , , , workspaceDescription, setWorkspaceDescription, descriptionError] =
    useInputState("");
  const [workspaceId] = useState<string>(uuidv4());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = localStorage.getItem("currentUser");

  const hideCreating = () => {
    dispatch(hideCreateWorkspace());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addWorkspace({
        workspaceName,
        workspaceDescription,
        workspaceDate: date,
        workspaceMember: user ? user : guestName,
        workspaceLetterColor: generateRandomColor(),
        workspaceBoards: [],
        workspaceLandingPageMenu: false,
        workspaceId,
      })
    );
    hideCreating();
    navigate(`/workspace/${workspaceId}`, { replace: true });
  };

  return (
    <div ref={forwardRef} className="createWorkspacePopUp">
      <i onClick={hideCreating} className="bi bi-x-lg" />
      <div className="createWorkspace">
        <div className="createWorkspaceInfo">
          <h2>
            Создайте новое <span>рабочее пространство</span>
          </h2>
          <p className="createWorkspaceDescription">
              Повысьте свою производительность, получив доступ к общему рабочему пространству.
          </p>
        </div>

        <div className="createWorkspaceFormDiv">
          {
            <CreateWorkspaceForm
              handleSubmit={handleSubmit}
              setWorkspaceDescription={setWorkspaceDescription}
              setWorkspaceName={setWorkspaceName}
              nameError={nameError}
              workspaceName={workspaceName}
              descriptionError={descriptionError}
              workspaceDescription={workspaceDescription}
            />
          }
        </div>
      </div>
      <div className="createWorkspaceRIGHTSIDE"></div>
    </div>
  );
};

export default CreateWorkspacePopUp;
