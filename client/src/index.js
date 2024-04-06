import React from 'react'
import ReactDOM from 'react-dom/client'
import Landingpage from "./page/landingpage.js";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './css/component_css/component.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landingpage />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <RouterProvider router={router} />

  </React.StrictMode>
)