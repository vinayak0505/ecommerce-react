import { useEffect, useState } from "react";
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
import { auth } from "./firebaseinit";

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const sub = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
        setIsLoggedIn(uid);
      } else {
        console.log("user is logged out");
        setIsLoggedIn(null);
      }
      setLoading(false);
    });
    return sub;
  }, []);

  const Protected = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
      errorElement: <Page404 />,
      children: [
        { index: true, element: <Home /> },
        { path: "/login", element: <LogIn /> },
        { path: "/signup", element: <SignUp /> },
        {
          path: "/cart",
          element: (
            <Protected>
              <Cart></Cart>
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

  if (loading) return <>loading</>;

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
