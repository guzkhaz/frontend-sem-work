import "../../../styles/popUpStyles/taskDetailsPopUp.css";
import TaskCommentForm from "../../task/TaskCommentForm";
import EditTaskCommentForm from "../../task/EditTaskCommentForm";
import { TaskCommentsInterface } from "../../../interfaces/WorkspaceInterface";
import { WorkspaceInterface } from "../../../interfaces/WorkspaceInterface";

interface Props {
    workspaceId: string | undefined
    boardId: string | undefined
    columnId: string | undefined
    taskId: string
    taskComments: TaskCommentsInterface[]
    shownWorkspace: WorkspaceInterface | undefined
    commentToEdit: string
    setCommentToEdit: (value: React.SetStateAction<string>) => void
    deleteComment: (taskComment: string) => void
}

const Activity: React.FC<Props> = ({ workspaceId, boardId, columnId, taskId, taskComments, shownWorkspace, commentToEdit, setCommentToEdit, deleteComment }) => {
    return (<div className="taskDetailsActivityDiv">
        <p className="taskDetailsActivityHeading">Активность</p>

        <TaskCommentForm
            workspaceId={workspaceId}
            boardId={boardId}
            columnId={columnId}
            taskId={taskId}
        />

        {taskComments.map((comment) => {
            return (
                <div key={comment.columnId} className="taskDetailsWholeCommentDiv">
                    <div className="taskDetailsCommentAuthorAndDate">
                        {comment.taskAuthor ? (
                            <p className="commentAuthor">{comment.taskAuthor}</p>
                        ) : (
                            <p className="commentAuthor">
                                {shownWorkspace?.workspaceMember}
                            </p>
                        )}
                        <p className="commentDate">{comment.taskDate}</p>
                    </div>
                    {commentToEdit === comment.taskComment ? (
                        <EditTaskCommentForm
                            workspaceId={workspaceId}
                            boardId={boardId}
                            columnId={columnId}
                            taskId={taskId}
                            taskComment={comment.taskComment}
                            setEditing={() => setCommentToEdit("")}
                        />
                    ) : (
                        <div className="taskDetailsActivityCommentDiv">
                            <p className="taskDetailsActivityComment">
                                {comment.taskComment}
                            </p>
                        </div>
                    )}

                    <div className="taskDetailsActivityCommentEditDelete">
                        <p
                            onClick={() => setCommentToEdit(comment.taskComment)}
                            className="commentEdit"
                        >
                            Редактировать
                        </p>
                        <p
                            onClick={() => deleteComment(comment.taskComment)}
                            className="commentDelete"
                        >
                            Удалить
                        </p>
                    </div>
                </div>
            );
        })}
    </div>)
}

export default Activity;
