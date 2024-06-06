import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopUpInterface {
  popUpMessage: string;
}

const initialState: PopUpInterface = {
  popUpMessage: "",
};

export const popUpSlice = createSlice({
  name: "PopUp",
  initialState,
  reducers: {
    setPopUpMessage: (state, action: PayloadAction<{ message: string }>) => {
      state.popUpMessage = action.payload.message;
    },
  },
});

export const { setPopUpMessage } = popUpSlice.actions;

export default popUpSlice.reducer;
