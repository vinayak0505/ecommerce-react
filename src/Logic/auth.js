import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebaseinit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

export const userContext = createContext();

// user id uservalue to get user id
export const useUserValue = () => {
  const value = useContext(userContext);
  return value;
};

// user id 0 states initial
// user id null state loaded and logout
// user id value indecated loaded and contains the id
export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    // onAuthStateChange is a listener that notified on state change and update
    const sub = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
        setUserId(uid);
      } else {
        console.log("user is logged out");
        setUserId(null);
      }
    });
    return sub;
  }, []);

  // logout to logout user from page
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successfull");
      return true;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return false;
    }
  };

  // login to logout user from page
  const login = async (e, email, password) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successfull");
      return true;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(error.message);
      console.log(errorCode, errorMessage);
      return false;
    }
  };

  // signUp to logout user from page
  const signUp = async (e, email, password) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("SignUp Successfull");
      return true;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(error.message);
      console.log(errorCode, errorMessage);
      return false;
    }
  };

  return (
    <userContext.Provider value={{ userId, logout, login, signUp }}>
      {children}
    </userContext.Provider>
  );
};
