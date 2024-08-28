import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Home from "../screens/OnlineScreens/Home";
import Search from "../screens/OnlineScreens/Search";
import PLayList from "../screens/OnlineScreens/PLayList";
import Detail from "../screens/OnlineScreens/Detail";
import Library from "../screens/OnlineScreens/Library";

const OnlineRouter = createBrowserRouter([
  {
    element: (
      <>
        <App />
      </>
    ),
    errorElement: <ErrorPage/>,
    children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/search",
            element: <Search/>
        },
        {
            path: "/library",
            element: <Library/>
        },
        {
            path: "/add-playlist",
            element: <PLayList/>
        },
        {
            path: "/detail/:id",
            element: <Detail/>
        },
    ],
  },
]);

export default OnlineRouter
