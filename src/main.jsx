import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorPage from "./components/error/Error.jsx";
import Home from "./pages/home/Home.jsx";
import Siswa from "./pages/siswa/Siswa.jsx";
import TambahSiswa from "./pages/siswa/TambahSiswa.jsx";
import DetailSiswa from "./pages/siswa/DetailSiswa.jsx";
import Guru from "./pages/guru/Guru.jsx";
import TambahGuru from "./pages/guru/TambahGuru.jsx";
import Mapel from "./pages/mapel/Mapel.jsx";
import TambahMapel from "./pages/mapel/TambahMapel.jsx";
import UangKas from "./pages/kas/UangKas.jsx";
import BuatTransaksi from "./pages/kas/BuatTransaksi.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EditProfile from "./pages/setting/edit-profile/EditProfile.jsx";
import GantiPassword from "./pages/setting/ganti-password/gantiPassword.jsx";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import PrivateRoute from "./middleware/PrivateRoute.jsx";

export const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="*" element={<ErrorPage />} />

            <Route element={<AuthOutlet fallbackPath="/" />}>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/siswa" element={<Siswa />} />
              <Route path="/guru" element={<Guru />} />
              <Route path="/mapel" element={<Mapel />} />
              <Route path="/kas" element={<UangKas />} />
              <Route path="/ganti-password" element={<GantiPassword />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/detail-siswa" element={<DetailSiswa />} />
              <Route path="/detail-siswa/:id" element={<DetailSiswa />} />
            </Route>

            <Route
              element={
                <PrivateRoute allowedJabatan={["ketua kelas", "sekretaris"]} />
              }
            >
              <Route path="/tambah-siswa" element={<TambahSiswa />} />
              <Route path="/tambah-guru" element={<TambahGuru />} />
              <Route path="/edit-guru/:id" element={<TambahGuru />} />

              <Route path="/tambah-mapel" element={<TambahMapel />} />
              <Route path="/edit-mapel/:id" element={<TambahMapel />} />
            </Route>

            <Route
              element={
                <PrivateRoute allowedJabatan={["ketua kelas", "bendahara"]} />
              }
            >
              <Route path="/buat-transaksi" element={<BuatTransaksi />} />
              <Route path="/edit-transaksi/:id" element={<BuatTransaksi />} />
            </Route>
          </Routes>
        </BrowserRouter>
        {/* <RouterProvider router={router} /> */}
      </React.StrictMode>
    </QueryClientProvider>
  </AuthProvider>
);
