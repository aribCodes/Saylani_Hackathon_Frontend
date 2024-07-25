import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Applicant from "./pages/applicant/Applicant.jsx";
import Admin from "./pages/admin/Admin.jsx";
import AppContext from "./context/context.jsx";
import IdCard from "./pages/idCard/IdCard.jsx";
// import IdCard from "./components/idCard/IdCard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/applicant",
    element: <Applicant />,
  },
  {
    path:"/card",
    element:<IdCard />
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContext>
      <RouterProvider router={router} />
    </AppContext>
  </React.StrictMode>
);
