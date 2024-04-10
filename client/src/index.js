import React from 'react'
import ReactDOM from 'react-dom/client'
import Landingpage from "./page/LandingPage.js";
import TicketInfo from "./page/TicketInfo.js";
import AdminPage from "./page/AdminPage.js";
import TicketPage from "./page/TicketPage.js";
import TicketAdminHistory from "./page/TicketAdminHistory.js";
import { UserAuthContextProvider } from "./context/UserAuthContext.jsx"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
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
  {
    path: "/ticket",
    element:  <SkeletonTheme baseColor="#202020" highlightColor="#444"><ProtectRoute><TicketPage /></ProtectRoute></SkeletonTheme>
  },
  {
    path: "/ticketinfo",
    element: <ProtectRoute><TicketInfo /></ProtectRoute>
  },
  {
    path: "/ticketHistory",
    element: <ProtectRoute><TicketAdminHistory /></ProtectRoute>
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <UserAuthContextProvider>
      <RouterProvider router={router} />
      </UserAuthContextProvider>
      
  </React.StrictMode>
)