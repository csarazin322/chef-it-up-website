import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginThunk, profileThunk, registerThunk, logoutThunk } from "./user-thunks";
const initialState = {
    currentUser: null
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [logoutThunk.fulfilled]: (state, action) => {
            state.currentUser = null
        },
        [registerThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [profileThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        }
    }
})


export default userSlice.reducer;