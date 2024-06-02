import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/error/Error.jsx";
import Home from "./pages/home/Home.jsx";
import Siswa from "./pages/siswa/Siswa.jsx";
import TambahSiswa from "./pages/siswa/TambahSiswa.jsx";
import AuthPage from "./middleware/AuthPage.jsx";
import DetailSiswa from "./pages/siswa/DetailSiswa.jsx";
import Authentication from "./pages/authentication/Authentication.jsx";
import Guru from "./pages/guru/Guru.jsx";
import TambahGuru from "./pages/guru/TambahGuru.jsx";
import Mapel from "./pages/mapel/Mapel.jsx";
import TambahMapel from "./pages/mapel/TambahMapel.jsx";
import UangKas from "./pages/kas/UangKas.jsx";
import BuatTransaksi from "./pages/kas/BuatTransaksi.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  // + Home
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    // element:
    //   <AuthPage>
    //     <Home />
    //   </AuthPage>,
    element: <Home />,
    errorElement: <ErrorPage />,
  },

  // + Siswa
  {
    path: "/siswa",
    element: (
      <AuthPage>
        <Siswa />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/detail-siswa",
    element: (
      <AuthPage>
        <DetailSiswa />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/detail-siswa/:id",
    element: (
      <AuthPage>
        <DetailSiswa />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tambah-siswa/:id",
    element: (
      <AuthPage>
        <TambahSiswa />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tambah-siswa",
    element: (
      <AuthPage>
        <TambahSiswa />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },

  // + Auht
  {
    path: "/auth",
    element: (
      <AuthPage>
        <Authentication />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },

  // + Guru
  {
    path: "/guru",
    element: (
      <AuthPage>
        <Guru />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tambah-guru",
    element: (
      <AuthPage>
        <TambahGuru />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit-guru/:id",
    element: (
      <AuthPage>
        <TambahGuru />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },

  // + Mapel
  {
    path: "/mapel",
    element: (
      <AuthPage>
        <Mapel />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tambah-mapel",
    element: (
      <AuthPage>
        <TambahMapel />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit-mapel/:id",
    element: (
      <AuthPage>
        <TambahMapel />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },

  // + Uang Kas
  {
    path: "/kas",
    element: (
      <AuthPage>
        <UangKas />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/buat-transaksi",
    element: (
      <AuthPage>
        <BuatTransaksi />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit-transaksi/:id",
    element: (
      <AuthPage>
        <BuatTransaksi />
      </AuthPage>
    ),
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
