import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import HomeOffLine from "../screens/OfflineScreens/HomeOffLine";
import Login from "../screens/OfflineScreens/Login";
import Register from "../screens/OfflineScreens/Register";


const OfflineRouter = createBrowserRouter([
  {
    element: (
      <>
        <HomeOffLine/>
      </>
    ),
    errorElement: <ErrorPage/>,
    children: [
     
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/register",
            element: <Register/>
        },
      
      
    ],
  },
]);

export default OfflineRouter
