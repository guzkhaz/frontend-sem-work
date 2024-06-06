import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  WorkspaceInterface,
  BoardInterface,
  TaskInterface,
  TaskCommentsInterface,
  ColumnInterface,
} from "../../interfaces/WorkspaceInterface";
import { v4 as uuidv4 } from "uuid";

interface WorkspaceState {
  workspace: WorkspaceInterface[];
}

const initialState: WorkspaceState = {
  workspace: [],
};

export const workspaceSlice = createSlice({
  name: "Workspace",
  initialState,
  reducers: {
    addWorkspace: (state, action: PayloadAction<WorkspaceInterface>) => {
      state.workspace.push(action.payload);
    },
    editWorkspace: (
      state,
      action: PayloadAction<{
        id: string | undefined;
        description?: string;
      }>
    ) => {
      const editedWorkspace = state.workspace.map((workspace) => {
        if (workspace.workspaceId === action.payload.id) {
          return {
            ...workspace,
            workspaceDescription: action.payload.description,
          };
        }
        return workspace;
      });

      state.workspace = editedWorkspace;
    },
    deleteWorkspace: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const deletedWorkspace = [
        ...state.workspace.slice(0, workspace),
        ...state.workspace.slice(workspace + 1),
      ];

      state.workspace = deletedWorkspace;
    },
    showWorkspaceDropdown: (state, action: PayloadAction<{ id: string }>) => {
      const workspaceWithShownDropdown = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.id
      );

      state.workspace[workspaceWithShownDropdown].workspaceLandingPageMenu =
        !state.workspace[workspaceWithShownDropdown].workspaceLandingPageMenu;
    },
    addBoard: (state, action: PayloadAction<BoardInterface>) => {
      const workspaceToAddBoardTo = state.workspace.findIndex(
        (value) => value.workspaceName === action.payload.boardWorkspace
      );

      state.workspace[workspaceToAddBoardTo].workspaceBoards.push(
        action.payload
      );
    },

    deleteBoard: (
      state,
      action: PayloadAction<{
        workspaceName: string | undefined;
        boardId: string;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceName === action.payload.workspaceName
      );

      const boardToDelete = state.workspace[
        workspace
      ].workspaceBoards.findIndex(
        (board) => board.boardId === action.payload.boardId
      );

      const deletedBoard = [
        ...state.workspace[workspace].workspaceBoards.slice(0, boardToDelete),
        ...state.workspace[workspace].workspaceBoards.slice(boardToDelete + 1),
      ];

      state.workspace[workspace].workspaceBoards = deletedBoard;
    },

    reArangeColumn: (
      state,
      action: PayloadAction<{
        columnId: string;
        boardId: string | undefined;
        workspaceId: string | undefined;
        newColumn: ColumnInterface;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (board) => board.boardId === action.payload.boardId
      );

      const columnToRearange = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (column) => column.columnId === action.payload.columnId
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns[
        columnToRearange
      ] = action.payload.newColumn;
    },

    reArangeBetweenColumn: (
      state,
      action: PayloadAction<{
        startColumnId: string;
        finishColumnId: string;
        boardId: string | undefined;
        workspaceId: string | undefined;
        newStartColumn: ColumnInterface;
        newFinishColumn: ColumnInterface;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (board) => board.boardId === action.payload.boardId
      );

      const startColumnId = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (column) => column.columnId === action.payload.startColumnId
      );

      const finishColumnId = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (column) => column.columnId === action.payload.finishColumnId
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns[
        startColumnId
      ] = action.payload.newStartColumn;
      state.workspace[workspace].workspaceBoards[board].boardColumns[
        finishColumnId
      ] = action.payload.newFinishColumn;
    },

    removeDraggedTaskFromColumn: (
      state,
      action: PayloadAction<{
        columnId: string;
        boardId: string | undefined;
        workspaceId: string | undefined;
        newColumn: ColumnInterface;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (board) => board.boardId === action.payload.boardId
      );

      const columnToRearange = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (column) => column.columnId === action.payload.columnId
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns[
        columnToRearange
      ] = action.payload.newColumn;
    },

    addColumn: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnName: string;
        columnId: string;
        columnTasks: TaskInterface[];
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns.push(
        action.payload
      );
    },

    copyColumn: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const columnToCopyOriginal = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.find(
        (column) => column.columnId === action.payload.columnId
      );

      const columnToCopyClone = JSON.parse(
        JSON.stringify(columnToCopyOriginal)
      );

      columnToCopyClone.columnId = uuidv4();

      columnToCopyClone.columnTasks.forEach(
        (task: { taskId: string }) => (task.taskId = uuidv4())
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns.push(
        columnToCopyClone
      );
    },

    deleteColumn: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const columnToDelete = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (column) => column.columnId === action.payload.columnId
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns.splice(
        columnToDelete,
        1
      );
    },

    addTask: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
        taskName: string;
        taskId: string;
        taskIndicatorColor: string;
        taskDescription: string;
        taskComments: TaskCommentsInterface[];
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const column = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (value) => value.columnId === action.payload.columnId
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns[
        column
      ].columnTasks.push(action.payload);
    },

    copyTask: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
        taskId: string | undefined;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const column = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (value) => value.columnId === action.payload.columnId
      );

      const taskToCopyOriginal = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns[column].columnTasks.find(
        (task) => task.taskId === action.payload.taskId
      );

      const taskToCopyClone = JSON.parse(JSON.stringify(taskToCopyOriginal));

      taskToCopyClone.taskId = uuidv4();

      state.workspace[workspace].workspaceBoards[board].boardColumns[
        column
      ].columnTasks.push(taskToCopyClone);
    },

    editTask: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
        taskId: string;
        newTask: string;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const column = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (value) => value.columnId === action.payload.columnId
      );

      const updatedTask = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns[column].columnTasks.map((task) => {
        if (task.taskId === action.payload.taskId) {
          return { ...task, taskName: action.payload.newTask };
        }
        return task;
      });

      state.workspace[workspace].workspaceBoards[board].boardColumns[
        column
      ].columnTasks = updatedTask;
    },

    deleteTask: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
        taskId: string;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const column = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (value) => value.columnId === action.payload.columnId
      );

      const taskToRemove = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns[column].columnTasks.findIndex(
        (task) => task.taskId === action.payload.taskId
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns[
        column
      ].columnTasks.splice(taskToRemove, 1);
    },

    selectTaskLabel: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
        taskId: string;
        taskIndicator: string;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const column = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (value) => value.columnId === action.payload.columnId
      );

      const selectedLabel = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns[column].columnTasks.map((task) => {
        if (task.taskId === action.payload.taskId) {
          return { ...task, taskIndicatorColor: action.payload.taskIndicator };
        }
        return task;
      });

      state.workspace[workspace].workspaceBoards[board].boardColumns[
        column
      ].columnTasks = selectedLabel;
    },

    addTaskDescription: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
        taskId: string | undefined;
        taskDescription: string;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const column = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (value) => value.columnId === action.payload.columnId
      );

      const task = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns[column].columnTasks.findIndex(
        (task) => task.taskId === action.payload.taskId
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns[
        column
      ].columnTasks[task].taskDescription = action.payload.taskDescription;
    },

    addTaskComment: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
        taskId: string | undefined;
        taskComment: string;
        taskAuthor: string;
        taskDate: string;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const column = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (value) => value.columnId === action.payload.columnId
      );

      const task = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns[column].columnTasks.findIndex(
        (task) => task.taskId === action.payload.taskId
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns[
        column
      ].columnTasks[task].taskComments.push(action.payload);
    },

    deleteTaskComment: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
        taskId: string | undefined;
        taskComment: string;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const column = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (value) => value.columnId === action.payload.columnId
      );

      const task = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns[column].columnTasks.findIndex(
        (task) => task.taskId === action.payload.taskId
      );

      const taskComment = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns[column].columnTasks[task].taskComments.findIndex(
        (value) => value.taskComment === action.payload.taskComment
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns[
        column
      ].columnTasks[task].taskComments.splice(taskComment, 1);
    },

    editTaskComment: (
      state,
      action: PayloadAction<{
        workspaceId: string | undefined;
        boardId: string | undefined;
        columnId: string | undefined;
        taskId: string | undefined;
        taskComment: string;
        newComment: string;
      }>
    ) => {
      const workspace = state.workspace.findIndex(
        (value) => value.workspaceId === action.payload.workspaceId
      );

      const board = state.workspace[workspace].workspaceBoards.findIndex(
        (value) => value.boardId === action.payload.boardId
      );

      const column = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns.findIndex(
        (value) => value.columnId === action.payload.columnId
      );

      const task = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns[column].columnTasks.findIndex(
        (task) => task.taskId === action.payload.taskId
      );

      const taskComment = state.workspace[workspace].workspaceBoards[
        board
      ].boardColumns[column].columnTasks[task].taskComments.findIndex(
        (value) => value.taskComment === action.payload.taskComment
      );

      state.workspace[workspace].workspaceBoards[board].boardColumns[
        column
      ].columnTasks[task].taskComments[taskComment].taskComment =
        action.payload.newComment;
    },
  },
});

export const {
  addWorkspace,
  deleteWorkspace,
  showWorkspaceDropdown,
  editWorkspace,
  addBoard,
  deleteBoard,
  addColumn,
  copyColumn,
  deleteColumn,
  reArangeColumn,
  reArangeBetweenColumn,
  removeDraggedTaskFromColumn,
  addTask,
  deleteTask,
  copyTask,
  editTask,
  selectTaskLabel,
  addTaskDescription,
  addTaskComment,
  deleteTaskComment,
  editTaskComment,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
