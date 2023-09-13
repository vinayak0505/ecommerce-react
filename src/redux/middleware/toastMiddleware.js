import { toast } from "react-toastify";

export const toastMiddleware = (store) => {
  return function (next) {
    return function (action) {
      // log actions
      switch (action.type) {
        case "auth/loginUser/fulfilled":
          toast.info("Logged in successfully");
          break;
        case "auth/signUpUser/fulfilled":
          toast.info("SignUp successfully");
          break;
        case "auth/logoutUser/fulfilled":
          toast.info("Logged out successfully");
          break;
        default:
          if (action.error?.message) {
            toast.error(action.error.message);
          }
      }
      next(action);
    };
  };
};
