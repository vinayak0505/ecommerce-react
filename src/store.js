import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "./redux/reducer/authReducer";
import { toastMiddleware } from "./redux/middleware/toastMiddleware";

export const store = configureStore({
  reducer: {authReducer},
  middleware:[...getDefaultMiddleware(),toastMiddleware]
});
