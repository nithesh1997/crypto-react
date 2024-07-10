import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = localStorage.getItem("isLoggedIn") === "true";
export const languageSlice = createSlice({
  name: "language",
  initialState: {
    currentLanguage: "en",
    headerdata: {
      data: {},
      error: "",
      isLoading: false
    },
    tabeldata: null,
    carsoul1: [],
    auth: initialAuthState,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    setHeaderData: (state, action) => {
      state.headerdata = action.payload;
    },
    setTabledata: (state, action) => {
      state.tabeldata = action.payload;
    },
    setcarsoul: (state, action) => {
      state.carsoul1 = action.payload;
    },
    setauth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { setLanguage, setHeaderData, setTabledata, setcarsoul, setauth } =
  languageSlice.actions;

export default languageSlice.reducer;
