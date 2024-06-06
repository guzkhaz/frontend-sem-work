import "../../styles/popUpStyles/popUpMessage.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import { setPopUpMessage } from "../../redux/features/popUpMessagSlice";

const PopUpMessage: React.FC = () => {
  const dispatch = useDispatch();

  const message = useSelector((state: RootState) => state.message.popUpMessage);

  const setMessage = (message: string) => {
    dispatch(setPopUpMessage({ message }));
  };

  if (message) {
    return (
      <div className="popUpDiv">
        <p>{message}</p>
        <i onClick={() => setMessage("")} id="popUpIcon" className="bi bi-x" />
      </div>
    );
  } else {
    return null;
  }
};

export default PopUpMessage;
