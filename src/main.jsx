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
import AuthPage from './middleware/AuthPage.jsx';
import DetailSiswa from './pages/siswa/DetailSiswa.jsx';
import Authentication from './pages/authentication/Authentication.jsx';
import Guru from './pages/guru/Guru.jsx';
import TambahGuru from './pages/guru/TambahGuru.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element:
      <AuthPage>
        <Home />
      </AuthPage>,
    errorElement: <ErrorPage />,
  },


  {
    path: "/siswa",
    element:
      <AuthPage>
        <Siswa />
      </AuthPage>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/detail-siswa",
    element:
      <AuthPage>
        <DetailSiswa />
      </AuthPage>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/detail-siswa/:id",
    element:
      <AuthPage>
        <DetailSiswa />
      </AuthPage>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tambah-siswa/:id",
    element:
      <AuthPage>
        <TambahSiswa />
      </AuthPage>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tambah-siswa",
    element:
      <AuthPage>
        <TambahSiswa />
      </AuthPage>,
    errorElement: <ErrorPage />,
  },

  {
    path: "/auth",
    element:
      <AuthPage>
        <Authentication />
      </AuthPage>,
    errorElement: <ErrorPage />,
  },

  {
    path: "/guru",
    element:
      <AuthPage>
        <Guru />
      </AuthPage>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tambah-guru",
    element:
      <AuthPage>
        <TambahGuru />
      </AuthPage>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit-guru/:id",
    element:
      <AuthPage>
        <TambahGuru />
      </AuthPage>,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
