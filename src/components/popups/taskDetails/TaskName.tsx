import "../../../styles/popUpStyles/taskDetailsPopUp.css";

interface Props {
    editingTaskName: boolean
    taskNameRef: React.RefObject<HTMLFormElement>
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    newTaskName: string
    setNewTaskName: (e: React.FormEvent<HTMLInputElement>) => void
    setEditingTaskName: () => void
    taskName: string
    showTaskDetails: () => void
}

const TaskName: React.FC<Props> = ({ editingTaskName, taskNameRef, handleSubmit, newTaskName, setNewTaskName, setEditingTaskName, taskName, showTaskDetails }) => {
    return (
        <div className="taskDetailsName">
            {editingTaskName ? (
                <form
                    ref={taskNameRef}
                    className="editTaskNameForm"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    {" "}
                    <input
                        value={newTaskName}
                        className="editTaskNameInput"
                        onChange={setNewTaskName}
                        type="text"
                        name="taskName"
                    />
                </form>
            ) : (
                <p onClick={setEditingTaskName}>{taskName}</p>
            )}

            <i id="cornerIcon" onClick={showTaskDetails} className="bi bi-x" />
        </div>
    )
}

export default TaskName;