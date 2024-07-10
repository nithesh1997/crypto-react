import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = localStorage.getItem("isLoggedIn") === "true";
export const dataSlice = createSlice({
    name: "data",
    initialState: {
        headerdata: {
            data: {},
            error: "",
            isLoading: false
        },
        tabeldata: {
            data: [],
            error: '',
            isLoading: false
        },
        carsoul1: {
            data: [],
            error: '',
            isLoading: false
        },
        auth: initialAuthState,
    },
    reducers: {
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

export const { setHeaderData, setTabledata, setcarsoul, setauth } =
    dataSlice.actions;

export default dataSlice.reducer;
