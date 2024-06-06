import "../../styles/popUpStyles/taskLabelsPopUp.css";
import { colorChoices } from "../../utils/colors/TaskLabelColorChoices";
import { selectTaskLabel } from "../../redux/features/WorkspaceSlice";
import { useDispatch } from "react-redux";
import { addLabelToHighlightedTask } from "../../utils/SetHighlightedTask";
import { useSetHT } from "../../context/highlightedTaskContext";
import { HighlightedTaskContext } from "../../context/highlightedTaskContext";
import { useContext } from "react";

interface TaskLabelsInterface {
  editLabels: () => void;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string;
  chosenIndicator: string;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const TaskLabelsPopUp: React.FC<TaskLabelsInterface> = ({
  editLabels,
  workspaceId,
  boardId,
  columnId,
  taskId,
  chosenIndicator,
  forwardRef,
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
    editLabels();
  };

  return (
    <div ref={forwardRef} className="editTaskLabelsDiv">
      <div className="edidTaskDivHeading">
        <p className="editTaskHeading">Метки</p>
        <i id="cornerIcon" onClick={editLabels} className="bi bi-x" />
      </div>

      <p className="labelsInfo">Метки</p>

      <div className="colorLabels">
        {colorChoices.map((choice) => {
          return (
            <div
              key={choice}
              onClick={() => setLabel(choice)}
              className="colorLabelDiv"
              style={{ background: choice }}
            >
              <i
                style={
                  chosenIndicator === choice
                    ? { display: "block" }
                    : { display: "none" }
                }
                className="bi bi-check-lg"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskLabelsPopUp;
