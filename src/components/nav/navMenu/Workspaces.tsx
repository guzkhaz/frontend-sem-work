import "../../../styles/navStyles/navMenuStyles/workspaceMenu.css";
import { RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCreateWorkspace } from "../../../redux/features/popUpCreateComponentSlice";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Workspaces: React.FC<Props> = ({ setOpen }) => {
  const dispatch = useDispatch();

  const showWorkspaceCreating = () => {
    dispatch(setCreateWorkspace());
    setOpen(false);
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const isWorkspace = workspaces[0];

  return (
    <div onClick={(e) => e.stopPropagation()} className="navWorkspacesDiv">
      <div className="navWorkspacesHeading">
        <p>Рабочее пространство</p>
        <i className="bi bi-x" onClick={() => setOpen(false)} />
      </div>

      {isWorkspace ? (
        <div className="navWorkspaceChoices">
          <p className="navYourWorkspaces">Ваши пространства</p>

          {workspaces.map((workspace) => {
            return (
              <div key={workspace.workspaceId} className="navWorkspaceItems">
                <p className="navWorkspaceItemHeading">
                  <Link
                    className="workspaceMenuLink"
                    onClick={() => setOpen(false)}
                    to={`/workspace/${workspace.workspaceId}`}
                  >
                    <span
                      style={{
                        color: workspace.workspaceLetterColor,
                        fontSize: "1.4em",
                        marginRight: ".1em",
                      }}
                    >
                      {workspace.workspaceName[0]}
                    </span>
                    {workspace.workspaceName.substring(1)}
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="navWorkspaceChoices">
          <p onClick={showWorkspaceCreating} className="navCreateWorkspace">
            Создать рабочее пространство
          </p>
        </div>
      )}
    </div>
  );
};

export default Workspaces;
