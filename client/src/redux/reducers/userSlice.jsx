import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    }
  }
});

export const {setDarkMode} =
  userSlice.actions;

export default userSlice.reducer;
