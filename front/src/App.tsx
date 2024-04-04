import React from 'react';
import './App.css';
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import ViewCars from "./routes/ViewCars";
import loaderFactory from "./helpers/loaderFactory";
import CreateCar from "./routes/CreateCar";
import UpdateCar from "./routes/UpdateCar";
import Header from "./components/Header";
import ViewRange from "./routes/ViewRange";
import rangeLoader from "./helpers/rangeLoader";
import viewLoader from "./helpers/viewLoader";
import dayjs from "dayjs";

function App() {
  const router = createBrowserRouter([
    {
      element: (
          <>
              <Header />
              <div id="outlet">
                <Outlet />
              </div>
          </>
      ),
      children: [
        {
          path: "/view/:start",
          element: <ViewCars />,
          loader: viewLoader
        },
        {
          path: "/create",
          element: <CreateCar />
        },
        {
          path: "/update/:id",
          element: <UpdateCar />,
          loader: loaderFactory(id => `/cars/${id}`)
        },
        {
          path: "/expiry/:start/:end",
          element: <ViewRange />,
          loader: rangeLoader,
        }
      ]
    },
    {
      path: "*",
      element: <Navigate to={`/view/${dayjs().unix()}`} replace/>
    },
  ])
  return (
      <RouterProvider router={router} />
  );
}

export default App;
