import { createSlice } from "@reduxjs/toolkit";

interface PopUpInterface {
  createWorkspace: boolean;
  createBoard: boolean;
}

const initialState: PopUpInterface = {
  createWorkspace: false,
  createBoard: false,
};

export const popUpCreateComponentSlice = createSlice({
  name: "PopUpCreate",
  initialState,
  reducers: {
    setCreateWorkspace: (state) => {
      state.createWorkspace = true;
    },
    hideCreateWorkspace: (state) => {
      state.createWorkspace = false;
    },
    setCreateBoard: (state) => {
      state.createBoard = true;
    },
    hideCreateBoard: (state) => {
      state.createBoard = false;
    },
  },
});

export const {
  setCreateWorkspace,
  hideCreateWorkspace,
  setCreateBoard,
  hideCreateBoard,
} = popUpCreateComponentSlice.actions;

export default popUpCreateComponentSlice.reducer;
