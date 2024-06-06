import "../../styles/navStyles/navRegister.css";
import { setPopUpMessage } from "../../redux/features/popUpMessagSlice";
import { registerUser } from "../../redux/features/usersSlice";
import { useDispatch } from "react-redux";
import useInputState from "../../hooks/useInputState";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<Props> = ({ setOpen }) => {
  const [name, setName, , , , , error, handleError] = useInputState("");
  const [password, setPassword] = useInputState("");

  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users.Users);

  const registration = (login: string, password: string, isLoggedIn: boolean) => {
    const user = { login: login, password: password, isLoggedIn: isLoggedIn };
    dispatch(registerUser(user));
  };

  const setMessage = (message: string) => {
    dispatch(setPopUpMessage({ message }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isUser = users?.find(user => user.login === name);

    if (!isUser) {
      if (name.trim() === "" || password.trim() === "") {
        handleError(" Пожалуйста, укажите имя и пароль");
      } else if (password.length < 5) {
        handleError("Пароль должен содержать не менее 5 символов");
      } else {
        setMessage(`${name} зарегистрировался в системе`);
        registration(name, password, true);
        setOpen(false);
        setTimeout(() => {
          setMessage("");
        }, 1500);
      }
    } else {
      handleError("Имя пользователя уже существует")
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="registerDiv">
      <p className="registerHeading">Регистрация</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="registerInputs">
          <input
            placeholder="email"
            value={name}
            onChange={setName}
            type="text"
            name="name"
          />
          <input
            placeholder="password"
            value={password}
            onChange={setPassword}
            type="password"
            name="name"
          />
        </div>
        <p className="error">{error}</p>
        <button className="submitBtn" type="submit">
          Начать
        </button>
      </form>
    </div>
  );
};

export default Register;
