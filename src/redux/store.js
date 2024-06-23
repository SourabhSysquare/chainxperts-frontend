import { configureStore, createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        question: '',
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setQuestion(state, action) {
            state.question = action.payload;
        },
        clearQuestion(state, action) {
            state.question = "";
        },
        clearToken(state, action) {
            state.token = null;
        },
    },
});

const rootReducer = combineReducers({
    auth: authSlice.reducer,
});

export const { setToken, setQuestion, clearQuestion, clearToken } = authSlice.actions;
export const store = configureStore({
    reducer: rootReducer,
});


