import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebaseinit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { userId: null, loading: true, error: null };

export const loginUser = createAsyncThunk("auth/loginUser", async (arg) =>
  signInWithEmailAndPassword(auth, arg.email, arg.password)
);

/**
 * Logout the user by signing them out
 */
export const logoutUser = createAsyncThunk("auth/logoutUser", async () =>
  auth.signOut()
);

export const signUpUser = createAsyncThunk("auth/signUpUser", async (arg) =>
  createUserWithEmailAndPassword(auth, arg.email, arg.password)
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    /**
     * Updates the login state with the provided user ID, and sets the loading state to false and clears any error.
     *
     * @param {object} state - The current state object.
     * @param {object} action - The action object containing the payload with the user ID.
     */
    login: (state, action) => {
      state.userId = action.payload;
      state.loading = false;
      state.error = null;
    },
    /**
     * Logs the user out by resetting the state.
     *
     * @param {object} state - The current state of the application.
     */
    logout: (state) => {
      state.userId = null;
      state.loading = false;
      state.error = null;
    },
    /**
     * Sets the error state in the Redux store.
     *
     * @param {object} state - The current state object.
     * @param {object} action - The action object containing the payload.
     */
    error: (state, action) => {
      state.userId = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
  /**
   * Generates extra reducers for the given builder.
   *
   * @param {object} builder - The builder object.
   * @return {void}
   */
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userId = action.payload.user.uid;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action);
        state.error = action.error.message;
        state.userId = null;
        state.loading = false;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.userId = action.payload.user.uid;
        state.loading = false;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        console.log(action);
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
        console.log(action);
        state.userId = null;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;
export const authSelector = (state) => state.authReducer;
