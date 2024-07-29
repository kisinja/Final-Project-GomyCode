import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const BASE_URL = 'http://localhost:6700/api/auth';

export const fetchProfile = createAsyncThunk(
    'auth/fetchProfile',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/profile`, { withCredentials: true });
            return response.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async ({ username, email, password }, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}/register`, { username, email, password });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, { email, password });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;