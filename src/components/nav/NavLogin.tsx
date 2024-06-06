import "../../styles/navStyles/navRegister.css";
import { setPopUpMessage } from "../../redux/features/popUpMessagSlice";
import { loginUser } from "../../redux/features/usersSlice";
import { useDispatch } from "react-redux";
import useInputState from "../../hooks/useInputState";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setOpen }) => {
    const [login, setLogin, , , , , error, handleError] = useInputState("");
    const [password, setPassword] = useInputState("");

    const dispatch = useDispatch();

    const users = useSelector((state: RootState) => state.users.Users);

    const logginIn = (login: string, password: string, isLoggedIn: boolean) => {
        const user = { login: login, password: password, isLoggedIn: isLoggedIn }
        dispatch(loginUser(user))
    }

    const setMessage = (message: string) => {
        dispatch(setPopUpMessage({ message }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isUser = users?.find(user => user.login === login) && users.find(user => user.password === password);
        if (!isUser) {
            handleError("Логин или пароль не совпадают");
        } else {
            setMessage(`${login} вошел в систему`);
            logginIn(login, password, true)
            setOpen(false);
            setTimeout(() => {
                setMessage("");
            }, 1500);
        }
    };

    return (
        <div onClick={(e) => e.stopPropagation()} className="registerDiv">
            <p className="registerHeading">Вход</p>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="registerInputs">
                    <input
                        placeholder="email"
                        value={login}
                        onChange={setLogin}
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

export default Login;
