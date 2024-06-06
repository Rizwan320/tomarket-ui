import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "App";
import { MaterialUIControllerProvider } from "context";
import { UserProvider } from "context/userContext";

import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <UserProvider>
        <ToastContainer />
        <App />
      </UserProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
