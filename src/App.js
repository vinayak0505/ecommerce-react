import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Home from "./Pages/Home/Home";
import Nav from "./Components/Nav/Nav";
import LogIn from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Bought from "./Pages/Bought/Bought";
import Cart from "./Pages/Cart/Cart";
import Page404 from "./Pages/Page404/Page404";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { authAction, authSelector } from "./redux/reducer/authReducer";
import { useEffect } from "react";
import { auth } from "./firebaseinit";
// import { useUserValue } from "./Logic/auth";

function App() {
  const { userId, loading } = useSelector(authSelector);
  console.log("userid",userId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loading === false) return;
    const sub = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
        dispatch(authAction.login(uid));
      } else {
        console.log("user is logged out");
        dispatch(authAction.logout());
      }
    });
    return sub;
  }, [loading, dispatch]);

  // protected to prevent route that should not be acceble without logout
  const Protected = ({ children }) => {
    if (!userId) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const LoggedIn = ({ children }) => {
    if (userId) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  // routes
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      errorElement: <Page404 />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/ecommerce-react",
          element: <div>HELLO</div>,
        },
        {
          path: "/login",
          element: (
            <LoggedIn>
              <LogIn />
            </LoggedIn>
          ),
        },
        {
          path: "/signup",
          element: (
            <LoggedIn>
              <SignUp />
            </LoggedIn>
          ),
        },
        {
          path: "/cart",
          element: (
            <Protected>
              <Cart />
            </Protected>
          ),
        },
        {
          path: "/bought",
          element: (
            <Protected>
              <Bought></Bought>
            </Protected>
          ),
        },
      ],
    },
  ]);
  
  if (loading)
    return <img className="loading" src="/loading.gif" alt="loading" />;

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
