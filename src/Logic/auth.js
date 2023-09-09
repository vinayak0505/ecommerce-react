import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebaseinit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";

export const userContext = createContext();

export const useUserValue = () => {
  const value = useContext(userContext);
  return value;
};

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(0);

  useEffect(() => {
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

  const logout = async () => {
    signOut(auth);
  };

  const login = (e, email, password) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const signIn = async (e, email, password) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return false;
      });
  };

  return (
    <userContext.Provider value={{ userId, logout, login, signIn }}>
      {children}
    </userContext.Provider>
  );
};
