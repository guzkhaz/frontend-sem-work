export interface TaskCommentsInterface {
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
  taskId: string | undefined;
  taskComment: string;
  taskAuthor: string;
  taskDate: string;
}

export interface TaskInterface {
  taskName: string;
  taskId: string;
  taskIndicatorColor: string;
  taskDescription: string;
  taskComments: TaskCommentsInterface[];
  workspaceId: string | undefined;
  boardId: string | undefined;
  columnId: string | undefined;
}

export interface ColumnInterface {
  columnName: string;
  columnId: string;
  boardId: string | undefined;
  workspaceId: string | undefined;
  columnTasks: TaskInterface[];
}

export interface BoardInterface {
  boardName: string;
  boardId: string;
  boardWorkspace: string;
  boardBackground: string;
  boardColumns: ColumnInterface[];
}

export interface WorkspaceInterface {
  workspaceName: string;
  workspaceDescription?: string;
  workspaceLetterColor: string;
  workspaceDate: string;
  workspaceMember: string;
  workspaceId: string;
  workspaceBoards: BoardInterface[];
  workspaceLandingPageMenu: boolean;
}
