import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = localStorage.getItem("isLoggedIn") === "true";
export const languageSlice = createSlice({
  name: "language",
  initialState: {
    currentLanguage: "en",
  },
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { setLanguage } =
  languageSlice.actions;

export default languageSlice.reducer;
