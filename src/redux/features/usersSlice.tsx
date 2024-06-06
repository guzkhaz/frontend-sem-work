import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  login: string;
  password: string;
  isLoggedIn: boolean;
}

interface Users {
  Users: User[];
}

const initialState: Users = {
  Users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      // Check if user already exists, if so - throw an error.
      state.Users.push(action.payload);

      window.localStorage.setItem("currentUser", action.payload.login);
    },
    loginUser: (state, action: PayloadAction<User>) => {
      const login = state.Users.map(user => {
        if (user.login === action.payload.login) {
          return { ...user, isLoggedIn: true }
        }
        return user
      })

      state.Users = login

      window.localStorage.setItem("currentUser", action.payload.login);
    },
    logoutUser: (state, action: PayloadAction<{ login: string }>) => {
      const logout = state.Users.map(user => {
        if (user.login === action.payload.login) {
          return { ...user, isLoggedIn: false }
        }
        return user
      })

      state.Users = logout

      window.localStorage.removeItem("currentUser");
    },
  },
});

export const { registerUser, loginUser, logoutUser } = usersSlice.actions;

export default usersSlice.reducer;
