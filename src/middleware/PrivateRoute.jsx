/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ allowedJabatan }) => {
  const user = useAuthUser();
  if (!user) {
    return <Navigate to={"/"} />;
  }

  const isAllowed = allowedJabatan.includes(user.jabatan);

  return isAllowed ? <Outlet /> : <Navigate to={"/dashboard"} />;
};

export default PrivateRoute;
