import { configureStore, createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

const rootReducer = combineReducers({
    auth: authSlice.reducer,
});

export const { setToken } = authSlice.actions;
export const store = configureStore({
    reducer: rootReducer,
});
