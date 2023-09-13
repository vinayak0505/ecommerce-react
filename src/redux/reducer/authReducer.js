import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebaseinit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { userId: null, loading: true, error: null };

export const loginUser = createAsyncThunk("auth/login", async (arg) =>
  signInWithEmailAndPassword(auth, arg.email, arg.password)
);

/**
 * Logout the user by signing them out
 */
export const logoutUser = createAsyncThunk("auth/logout", async () =>
  auth.signOut()
);

export const signUpUser = createAsyncThunk("auth/signup", async (arg) =>
  createUserWithEmailAndPassword(auth, arg.email, arg.password)
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.userId = null;
      state.loading = false;
      state.error = null;
    },
    error: (state, action) => {
      state.userId = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userId = action.payload.user.uid;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userId = null;
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.userId = action.payload.user.uid;
        state.loading = false;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.userId = null;
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userId = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.userId = null;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;
export const authSelector = (state) => state.authReducer;
