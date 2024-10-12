// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial State
const initialState = {
  user: null,
  token: '',
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Async Thunk to login
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', { email, password });
        const { access_token, refresh_token } = response.data;
  
        localStorage.setItem('token', access_token);
        localStorage.setItem('refreshToken', refresh_token);
  
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  
        const profileResponse = await axios.get('https://api.escuelajs.co/api/v1/auth/profile');
        const user = profileResponse.data;
  
        if (user.role !== 'admin') {
          throw new Error('Access denied. Admins only.');
        }
  
        return { user, access_token, refresh_token };
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
        return rejectWithValue(errorMessage);
      }
    }
  );
  
// Async Thunk to fetch user profile
export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile');
      return response.data;
    }
    throw new Error('No token available');
  } catch (error) {
    return rejectWithValue(error.response.data || 'Error fetching profile');
  }
});

// Async Thunk to refresh token
export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue }) => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/refresh-token', { refresh_token: refreshToken });
      const { access_token } = response.data;

      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      localStorage.setItem('token', access_token);

      return access_token;
    }
    throw new Error('No refresh token available');
  } catch (error) {
    return rejectWithValue(error.response.data || 'Error refreshing token');
  }
});

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      state.user = null;
      state.token = '';
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })

      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.token = '';
        state.isAuthenticated = false;
      });
  },
});

// Export actions
export const { logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
