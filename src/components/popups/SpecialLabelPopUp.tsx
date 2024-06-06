import "../../styles/popUpStyles/specialLabelPopUp.css";
import { fancyColorChoices } from "../../utils/colors/TaskLabelColorChoices";
import { selectTaskLabel } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import { addLabelToHighlightedTask } from "../../utils/SetHighlightedTask";
import { useSetHT } from "../../context/highlightedTaskContext";
import { HighlightedTaskContext } from "../../context/highlightedTaskContext";
import { useContext } from "react";

interface CreateLabelInterface {
  setCreating: () => void;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string;
}

const CreateLabelPopUp: React.FC<CreateLabelInterface> = ({
  setCreating,
  workspaceId,
  boardId,
  columnId,
  taskId,
}) => {
  const dispatch = useDispatch();
  const setHighlight = useSetHT();
  const highlights = useContext(HighlightedTaskContext);

  const setLabel = (indicator: string) => {
    dispatch(
      selectTaskLabel({
        workspaceId: workspaceId,
        boardId: boardId,
        columnId: columnId,
        taskId: taskId,
        taskIndicator: indicator,
      })
    );
    addLabelToHighlightedTask(highlights, taskId, indicator, setHighlight);
    setCreating();
  };

  return (
    <div className="createLabel">
      <p className="createBoardHeading">Выберите метку</p>
      <i id="cornerIcon" onClick={setCreating} className="bi bi-x" />

      <div className="createLabelOptions">
        {fancyColorChoices.map((choice) => {
          return (
            <div
              key={choice}
              onClick={() => setLabel(choice)}
              className="labelOption"
              style={{ background: choice }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateLabelPopUp;
