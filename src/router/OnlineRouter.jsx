import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Home from "../screens/OnlineScreens/Home";
import Search from "../screens/OnlineScreens/Search";
import PLayList from "../screens/OnlineScreens/PLayList";
import Detail from "../screens/OnlineScreens/Detail";
import Library from "../screens/OnlineScreens/Library";
import Artist from "../screens/OnlineScreens/Artist";
import Account from "../screens/OnlineScreens/Account";
import WishList from "../screens/OnlineScreens/WishList";

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
        {
          path: "/artist-detail/:id",
          element: <Artist/>

        },
        {
          path: "/wishList",
          element: <WishList/>

        },
        {
          path: "/account/:id",
          element: <Account/>

        },
    ],
  },
]);

export default OnlineRouter
