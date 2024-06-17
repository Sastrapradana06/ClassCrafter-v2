import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getToken } from "../utils/function";
import { useUserLogin } from "../services/useCustomQuery";

export default function AuthPage({ children }) {
  const { data: user } = useUserLogin();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = getToken("token");
  const idUser = getToken("idUser");

  const protectedRoutes = [
    "/tambah-siswa",
    "/edit-siswa/:id",

    "/tambah-guru",
    "/edit-guru/:id",

    "/tambah-mapel",
    "/edit-mapel/:id",

    "/buat-transaksi",
    "/edit-transaksi/:id",
  ];

  function matchRoute(pathname) {
    for (const route of protectedRoutes) {
      const regexPattern = route.replace(/:[^\s/]+/g, "([^/]+)");
      const regex = new RegExp(`^${regexPattern}$`);
      if (regex.test(pathname)) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    if (!token || !idUser) {
      return navigate("/");
    }

    if (matchRoute(pathname)) {
      if (
        user?.jabatan != "ketua kelas" &&
        user?.jabatan != "sekretaris" &&
        user?.jabatan != "bendahara"
      ) {
        return navigate("/dashboard");
      }
    }
  }, [token, idUser, pathname, user]);
  return children;
}
