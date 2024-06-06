import { useState, useRef, useContext } from "react";
import "../../../styles/popUpStyles/taskDetailsPopUp.css";
import { TaskCommentsInterface } from "../../../interfaces/WorkspaceInterface";
import { RootState } from "../../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTaskComment,
  editTask,
} from "../../../redux/features/WorkspaceSlice";
import CreateLabelPopUp from "../SpecialLabelPopUp";
import UseClickOutside from "../../../hooks/UseClickOutside";
import { handleEditHighlight } from "../../../utils/SetHighlightedTask";
import { useSetHT } from "../../../context/highlightedTaskContext";
import { HighlightedTaskContext } from "../../../context/highlightedTaskContext";
import useToggle from "../../../hooks/useToggle";
import useInputState from "../../../hooks/useInputState";
import Description from "./Description";
import Activity from "./Activity";
import TaskName from "./TaskName";

interface TaskDetailsInterface {
  showTaskDetails: () => void;
  taskName: string;
  taskIndicator: string;
  taskDescription: string;
  taskComments: TaskCommentsInterface[];
  columnName: string | undefined;
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const TaskDetailsPopUp: React.FC<TaskDetailsInterface> = ({
  showTaskDetails,
  taskName,
  taskIndicator,
  taskDescription,
  taskComments,
  columnName,
  workspaceId,
  boardId,
  columnId,
  taskId,
  forwardRef,
}) => {
  const [commentToEdit, setCommentToEdit] = useState<string>("");
  const [labelCreating, setLabelCreating] = useToggle(false);
  const [descriptionForm, showDescriptionForm] = useToggle(false);
  const [editingTaskName, setEditingTaskName] = useToggle(false);
  const [newTaskName, setNewTaskName] = useInputState("");

  const highlights = useContext(HighlightedTaskContext);
  const setHighlights = useSetHT();
  const dispatch = useDispatch();

  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const taskNameRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      editTask({
        workspaceId: workspaceId,
        boardId: boardId,
        columnId: columnId,
        taskId: taskId,
        newTask: newTaskName,
      })
    );
    handleEditHighlight(highlights, taskId, taskName, setHighlights);
    setEditingTaskName();
  };

  const deleteComment = (taskComment: string) => {
    dispatch(
      deleteTaskComment({
        workspaceId: workspaceId,
        boardId: boardId,
        columnId: columnId,
        taskId: taskId,
        taskComment,
      })
    );
  };

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  const shownWorkspace = workspaces.find((workspace) => {
    return workspace.workspaceId === workspaceId;
  });

  UseClickOutside(taskDescriptionRef, () => showDescriptionForm());
  UseClickOutside(taskNameRef, () => setEditingTaskName());

  return (
    <div ref={forwardRef} className="taskDetailsDiv">
      <TaskName editingTaskName={editingTaskName} taskNameRef={taskNameRef} handleSubmit={handleSubmit} newTaskName={newTaskName} setNewTaskName={setNewTaskName} setEditingTaskName={setEditingTaskName} taskName={taskName} showTaskDetails={showTaskDetails} />

      <p className="taskDetailsListName">
        В категории: <span>{columnName}</span>
      </p>

      <div className="taskDetailsLabel">
        <p>Метка</p>
        <div className="taskDetailsLabelDivs">
          <div
            style={{ background: taskIndicator }}
            className="taskDetailsLabelDivWithColor"
          ></div>
          <div onClick={setLabelCreating} className="taskDetailAddLabelDiv">
            <i id="addLabelPlus" className="bi bi-plus-lg"></i>
          </div>
        </div>

        {labelCreating && (
          <CreateLabelPopUp
            workspaceId={workspaceId}
            boardId={boardId}
            columnId={columnId}
            taskId={taskId}
            setCreating={setLabelCreating}
          />
        )}
      </div>

      <Description descriptionForm={descriptionForm} showDescriptionForm={showDescriptionForm} workspaceId={workspaceId} boardId={boardId} columnId={columnId} taskId={taskId} taskDescriptionRef={taskDescriptionRef} taskDescription={taskDescription} />

      <Activity workspaceId={workspaceId} boardId={boardId} columnId={columnId} taskId={taskId} taskComments={taskComments} shownWorkspace={shownWorkspace} commentToEdit={commentToEdit} setCommentToEdit={setCommentToEdit} deleteComment={deleteComment} />
    </div>
  );
};

export default TaskDetailsPopUp;
