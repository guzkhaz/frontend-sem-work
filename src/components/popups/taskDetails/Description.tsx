import "../../../styles/popUpStyles/taskDetailsPopUp.css";
import TaskDescriptionForm from "../../task/TaskDescriptionForm";

interface Props {
    descriptionForm: boolean;
    showDescriptionForm: () => void
    workspaceId: string | undefined
    boardId: string | undefined
    columnId: string | undefined
    taskId: string
    taskDescriptionRef: React.RefObject<HTMLDivElement>
    taskDescription: string
}

const Description: React.FC<Props> = ({ descriptionForm, showDescriptionForm, workspaceId, boardId, columnId, taskId, taskDescriptionRef, taskDescription }) => {
    return (
        <div className="taskDetailsDescriptionDiv">
            <p className="taskDetailsDescriptionHeading">Описание</p>
            {descriptionForm ? (
                <TaskDescriptionForm
                    showForm={showDescriptionForm}
                    workspaceId={workspaceId}
                    boardId={boardId}
                    columnId={columnId}
                    taskId={taskId}
                    forwardRef={taskDescriptionRef}
                />
            ) : (
                <div>
                    {taskDescription !== "" ? (
                        <p
                            onClick={showDescriptionForm}
                            className="taskDetailsDescription"
                        >
                            {taskDescription}
                        </p>
                    ) : (
                        <p
                            onClick={showDescriptionForm}
                            className="taskDetailsDescriptionEnter"
                        >
                            Введите описание задачи
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

export default Description
