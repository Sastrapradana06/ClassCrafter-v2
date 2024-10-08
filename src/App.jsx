import { useState } from "react";
import "./App.css";

import { useNavigate } from "react-router-dom";

import { handleLoginSiswa } from "./utils/api";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import Loading from "./components/loading/Loading";
import Alert from "./components/alert/alert";
import useHandleAlert from "./hooks/useHandleAlert";

import { useInvalidate } from "./services/useCustomQuery";
import { setCookies } from "./utils/function";
import FormLogin from "./components/form/form-login";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const { status, data, handleAlert } = useHandleAlert();
  const { invalidateListQuery } = useInvalidate();

  const navigate = useNavigate();
  const signIn = useSignIn();
  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await handleLoginSiswa(email, password);

      if (!res.status) {
        setIsLoading(false);
        return handleAlert("error", res.message);
      }

      const { token, data } = res;

      if (
        signIn({
          auth: {
            token: token,
            type: "Bearer",
          },
          userState: data,
        })
      ) {
        setCookies("idUser", data.id);
        invalidateListQuery("userLogin");
        handleAlert("success", "Login berhasil");
        navigate("/dashboard");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        return handleAlert("error", "Login gagal");
      }
    } catch (error) {
      console.log(error);
      handleAlert("error", "Maaf, Terjadi Kesalahan Teknis");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center gap-3 bg-slate-100">
      <Alert status={status} type={data.type} message={data.message} />
      {isLoading ? <Loading /> : null}
      <div className="w-[90%] h-max lg:w-[80%]  flex items-center justify-center bg-white gap-5 rounded-lg">
        <div className="w-[50%] h-[500px]  hidden lg:flex justify-center items-center rounded-lg overflow-hidden">
          <img src="/bg-1.jpg" alt="img" className="w-full object-cover" />
        </div>

        <div className="flex flex-col justify-center items-center gap-4  w-[90%] py-6 rounded-lg   lg:w-[50%]">
          <div className="">
            <h1 className="text-[1.3rem] text-black mb-1 font-semibold tracking-[2px] text-center">
              Login Siswa
            </h1>
            <p className="text-gray-500 text-[.9rem] w-[400px] text-center">
              Masuk ke akun anda, dengan mengisi email dan password
            </p>
          </div>

          <FormLogin handleLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
}

export default App;
