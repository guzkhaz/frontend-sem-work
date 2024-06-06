export interface HighlightedTaskInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
  boardName: string | undefined;
  columnId: string | undefined;
  taskId: string | undefined;
  taskAuthor: string;
  task: string;
  taskColor?: string;
}
