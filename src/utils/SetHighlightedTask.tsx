import { HighlightedTaskInterface } from "../interfaces/HighlightedTaskInterface";

export const handleSetHighlightedTask = (
  highlights: HighlightedTaskInterface[],
  workspaceId: string | undefined,
  boardId: string | undefined,
  boardName: string | undefined,
  columnId: string | undefined,
  taskId: string | undefined,
  taskAuthor: string,
  task: string,
  setHighlightedTask: React.Dispatch<
    React.SetStateAction<HighlightedTaskInterface[]>
  >
) => {
  if (!highlights.some((task) => task.taskId === taskId)) {
    setHighlightedTask((ht) => [
      ...ht,
      {
        workspaceId: workspaceId,
        boardId: boardId,
        boardName: boardName,
        columnId: columnId,
        taskId: taskId,
        taskAuthor: taskAuthor,
        task: task,
      },
    ]);
  }
};

export const addLabelToHighlightedTask = (
  highlights: HighlightedTaskInterface[],
  taskId: string | undefined,
  label: string,
  setHighlightedTask: React.Dispatch<
    React.SetStateAction<HighlightedTaskInterface[]>
  >
) => {
  const chosenLabel = highlights.map((task) => {
    if (task.taskId === taskId) {
      return { ...task, taskColor: label };
    }
    return task;
  });

  setHighlightedTask(chosenLabel);
};

export const handleRemoveHighlightedTaskOnWorkspaceDeleting = (
  highlights: HighlightedTaskInterface[],
  id: string | undefined,
  setHighlightedTask: React.Dispatch<
    React.SetStateAction<HighlightedTaskInterface[]>
  >
) => {
  const removedHighlight = highlights.filter(
    (highlightedTask) => highlightedTask.workspaceId !== id
  );

  setHighlightedTask(removedHighlight);
};

export const handleRemoveHighlightedTaskOnBoardDeleting = (
  highlights: HighlightedTaskInterface[],
  id: string | undefined,
  setHighlightedTask: React.Dispatch<
    React.SetStateAction<HighlightedTaskInterface[]>
  >
) => {
  const removedHighlight = highlights.filter(
    (highlightedTask) => highlightedTask.boardId !== id
  );

  setHighlightedTask(removedHighlight);
};

export const handleRemoveHighlightedTaskOnTaskDeleting = (
  highlights: HighlightedTaskInterface[],
  id: string | undefined,
  setHighlightedTask: React.Dispatch<
    React.SetStateAction<HighlightedTaskInterface[]>
  >
) => {
  const removedHighlight = highlights.filter(
    (highlightedTask) => highlightedTask.taskId !== id
  );

  setHighlightedTask(removedHighlight);
};

export const handleRemoveHighlightedTaskOnColumnDeleting = (
  highlights: HighlightedTaskInterface[],
  id: string | undefined,
  setHighlightedTask: React.Dispatch<
    React.SetStateAction<HighlightedTaskInterface[]>
  >
) => {
  const removedHighlight = highlights.filter(
    (highlightedTask) => highlightedTask.columnId !== id
  );

  setHighlightedTask(removedHighlight);
};

export const handleEditHighlight = (
  highlights: HighlightedTaskInterface[],
  id: string | undefined,
  newTask: string,
  setHighlightedTask: React.Dispatch<
    React.SetStateAction<HighlightedTaskInterface[]>
  >
) => {
  const editedHighlight = highlights.map((highlightedTask) => {
    if (highlightedTask.taskId === id) {
      return { ...highlightedTask, task: newTask };
    }
    return highlightedTask;
  });

  setHighlightedTask(editedHighlight);
};
