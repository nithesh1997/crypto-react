import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id: null,
        isAuthenticated: false,
        userDisplayName: "Unknown",
        username: "unknown",
        email: "unknown",
        role: "unknown",
        preferences: {
            isSuper: false,
            issuedAt: 0,
            expirationTime: 0,
        },
    },
    reducers: {
        setUser: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes

            let chackValue = action.payload

            if (chackValue){
                return { ...state, ...chackValue }
            }else{
                return {
                    id: null,
                    isAuthenticated: false,
                    userDisplayName: "Unknown",
                    username: "unknown",
                    email: "unknown",
                    role: "unknown",
                    preferences: {
                        isSuper: false,
                        issuedAt: 0,
                        expirationTime: 0,
                    },
                    }
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
