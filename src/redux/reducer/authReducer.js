import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebaseinit";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = { userId: null, loading: true };

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return false;
  }
};

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};

export const signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return false;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.userId = null;
      state.loading = false;
    },
    loading: (state) => {
      state.userId = null;
      state.loading = true;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;
export const authSelector = (state) => state.authReducer;
