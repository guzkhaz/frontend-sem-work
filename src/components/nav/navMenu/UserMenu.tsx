import "../../../styles/navStyles/navMenuStyles/userMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/features/usersSlice";
import { RootState } from "../../../redux/Store";
import { Link } from "react-router-dom";
import { setPopUpMessage } from "../../../redux/features/popUpMessagSlice";
import { useState, useEffect } from "react";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMenu: React.FC<Props> = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setLogin(user);
    }
  }, []);

  const setMessage = (message: string) => {
    dispatch(setPopUpMessage({ message }));
  };

  const randomWorkspace =
    workspaces[Math.floor(Math.random() * workspaces.length)];

  const logout = () => {
    setMessage("Выход совершен успешно");
    dispatch(logoutUser({ login }));
    setOpen(false);
    setTimeout(() => {
      setMessage("");
    }, 1500);
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="userChoicesDiv">
      <div onClick={logout} className="userChoiceDiv">
        <p className="userChoice">Выйти</p>
        <i className="bi bi-door-closed" />
      </div>

      {randomWorkspace && (
        <div className="userChoiceDiv">
          <Link
            className="workspaceMenuLink"
            to={`/workspace/${randomWorkspace.workspaceId}`}
          >
            <p className="userChoice">Ваши доски</p>
          </Link>
          <i className="bi bi-clipboard" />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
