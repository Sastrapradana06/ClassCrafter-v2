import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/error/Error.jsx';
import Home from './pages/home/Home.jsx';
import Siswa from './pages/siswa/Siswa.jsx';
import TambahSiswa from './pages/siswa/TambahSiswa.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/siswa",
    element: <Siswa />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tambah-siswa",
    element: <TambahSiswa />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
