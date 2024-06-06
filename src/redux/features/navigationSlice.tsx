import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationInterface {
  navColor: string;
}

const initialState: NavigationInterface = {
  navColor: "#3cc384",
};

export const navigationSlice = createSlice({
  name: "Navigation",
  initialState,
  reducers: {
    changeColor: (state, action: PayloadAction<{ color: string }>) => {
      state.navColor = action.payload.color;
    },
  },
});

export const { changeColor } = navigationSlice.actions;

export default navigationSlice.reducer;
