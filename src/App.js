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
import SignUp from "./Pages/SignUp/Sign";
import Bought from "./Pages/Bought/Bought";
import Cart from "./Pages/Cart/Cart";
import Page404 from "./Pages/Page404/Page404";

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    setLoading(false);
  }, []);

  const Protected = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
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
