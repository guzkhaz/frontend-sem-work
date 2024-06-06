import "../../styles/taskStyles/task.css";
import { useRef, useState } from "react";
import TaskOptionsForm from "../task/TaskOptionsForm";
import TaskDetailsPopUp from "../popups/taskDetails/TaskDetailsPopUp";
import TaskLabelsPopUp from "../popups/TaskLabelsPopUp";
import { TaskCommentsInterface } from "../../interfaces/WorkspaceInterface";
import { Draggable } from "react-beautiful-dnd";
import UseClickOutside from "../../hooks/UseClickOutside";
import useToggle from "../../hooks/useToggle";

interface TaskProps {
  taskName: string;
  taskId: string;
  taskIndicatorColor: string;
  taskDescription: string;
  taskComments: TaskCommentsInterface[];
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  columnName: string | undefined;
  index: number;
}

const Task: React.FC<TaskProps> = ({
  taskName,
  taskId,
  taskIndicatorColor,
  taskDescription,
  taskComments,
  workspaceId,
  boardId,
  columnId,
  columnName,
  index,
}) => {
  const [iconVisibility, setIconVisibility] = useState({ display: "none" });
  const [taskOptions, showTaskOptions] = useToggle(false);
  const [taskDetails, showTaskDetails] = useToggle(false);
  const [taskLabels, showTaskLabels] = useToggle(false);

  const optionsRef = useRef<HTMLDivElement>(null);
  const taskLabelsRef = useRef<HTMLDivElement>(null);
  const taskDetailsRef = useRef<HTMLDivElement>(null);

  UseClickOutside(optionsRef, () => showTaskOptions());
  UseClickOutside(taskLabelsRef, () => showTaskLabels());
  UseClickOutside(taskDetailsRef, () => showTaskDetails());

  return (
    <>
      <Draggable draggableId={taskId} index={index}>
        {(provided) => (
          <div
            onClick={showTaskDetails}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onMouseEnter={(e) => {
              setIconVisibility({ display: "block" });
            }}
            onMouseLeave={(e) => {
              setIconVisibility({ display: "none" });
            }}
            className="taskDiv"
          >
            {taskIndicatorColor && (
              <div
                style={{ background: taskIndicatorColor }}
                className="taskDivIndicator"
              ></div>
            )}

            <div className="taskDivName">
              <p className="taskName">{taskName}</p>
            </div>

            <i
              onClick={(e) => {
                e.stopPropagation();
                showTaskOptions();
              }}
              style={iconVisibility}
              className="bi bi-pencil"
              id="cornerIcon"
            />

            <div className="taskIcons">
              {taskComments[0] && <i className="bi bi-chat" />}
              {taskDescription && <i className="bi bi-justify-left" />}
            </div>
          </div>
        )}
      </Draggable>

      {taskOptions && (
        <TaskOptionsForm
          forwardRef={optionsRef}
          workspaceId={workspaceId}
          boardId={boardId}
          columnId={columnId}
          taskId={taskId}
          showForm={showTaskOptions}
          editLabels={showTaskLabels}
          showDetails={showTaskDetails}
        />
      )}

      {taskDetails && (
        <TaskDetailsPopUp
          forwardRef={taskDetailsRef}
          workspaceId={workspaceId}
          boardId={boardId}
          columnId={columnId}
          taskId={taskId}
          taskName={taskName}
          taskIndicator={taskIndicatorColor}
          taskComments={taskComments}
          columnName={columnName}
          showTaskDetails={showTaskDetails}
          taskDescription={taskDescription}
        />
      )}

      {taskLabels && (
        <TaskLabelsPopUp
          forwardRef={taskLabelsRef}
          workspaceId={workspaceId}
          boardId={boardId}
          columnId={columnId}
          taskId={taskId}
          editLabels={showTaskLabels}
          chosenIndicator={taskIndicatorColor}
        />
      )}
    </>
  );
};

export default Task;
