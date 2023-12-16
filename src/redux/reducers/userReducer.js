import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../actions/users';
import {HYDRATE} from "next-redux-wrapper";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action) => {
                return { ...state, ...action.payload.users }
            })
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
})

export default usersSlice