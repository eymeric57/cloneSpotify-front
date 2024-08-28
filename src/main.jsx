import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import OnlineRouter from "./router/OnlineRouter.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import AppRouter from "./router/AppRouter.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <AppRouter />
        
      </Provider>
    </AuthContextProvider>
  </StrictMode>
);
