import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getToken } from "../utils/function";

export default function AuthPage({ children }) {
  // const {data: user} = useUserLogin()

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = getToken("token");
  const idUser = getToken("idUser");

  // const protectedRoutes = [
  //   "/tambah-siswa",
  //   "/tambah-guru",
  //   "/tambah-mapel",
  //   "/auth",
  //   "/buat-transaksi",
  // ];

  useEffect(() => {
    if (!token || !idUser) {
      return navigate("/");
    }
  }, [token, idUser, pathname]);
  return children;
}
