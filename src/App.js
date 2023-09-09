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
import { useUserValue } from "./Logic/auth";

function App() {
  const userId = useUserValue().userId;
  const message = "asdf";

  const Protected = ({ children }) => {
    if (!userId) {
      return <Navigate to="/login" replace />;
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

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
