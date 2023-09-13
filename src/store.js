import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./redux/reducer/authReducer";

export const store = configureStore({
  reducer: {authReducer},
});
