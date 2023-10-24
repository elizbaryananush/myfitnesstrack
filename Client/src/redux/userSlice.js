import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
    },
    reducers: {
        login(state, action) {
            state.name = action.payload.name;
            console.log(state.name);
        },
        logout(state, action) {
            const name = action.payload

            state.name = name
            console.log(state.name);
        },
    }
})

export const userActions = userSlice.actions;

export default userSlice