import React from 'react'
import ReactDOM from 'react-dom/client'
import Landingpage from "./page/LandingPage.js";
import AdminPage from "./page/AdminPage.js";
import { UserAuthContextProvider } from "./context/UserAuthContext.jsx"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ProtectRoute from './context/protectRoute.jsx';
import './css/component_css/component.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landingpage />
  },
  {
    path: "/homepage",
    element: <ProtectRoute><AdminPage /></ProtectRoute>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <RouterProvider router={router} />
      </UserAuthContextProvider>
  </React.StrictMode>
)