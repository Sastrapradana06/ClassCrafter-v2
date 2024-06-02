import { useState } from "react";
import "./App.css";

import image2 from "/student2.svg";
import { useNavigate } from "react-router-dom";

import { setCookies } from "./utils/function";
import { handleLoginSiswa } from "./utils/api";

import { useShallow } from "zustand/react/shallow";
import useAppStore from "./store/store";
import Loading from "./components/loading/Loading";
import Alert from "./components/alert/alert";
import useHandleAlert from "./hooks/useHandleAlert";

function App() {
  const [email, setEmail] = useState("zoe@gmail.com");
  const [password, setPassword] = useState("ketuakelas");
  const [isLoading, setIsLoading] = useState(false);

  const [updateUser] = useAppStore(useShallow((state) => [state.updateUser]));
  const { status, data, handleAlert } = useHandleAlert();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await handleLoginSiswa(email, password);
      if (res.status) {
        handleAlert("success", "Login Berhasil");
        setCookies("token", res.token);
        setCookies("idUser", res.data.id);
        updateUser(res.data);
        navigate("/dashboard");
        setEmail("");
        setPassword("");
      } else {
        handleAlert("error", res.message);
      }
    } catch (error) {
      console.log(error);
      handleAlert("error", "Maaf, Terjadi Kesalahan Teknis");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center gap-3 bg-zinc-900">
      <Alert status={status} type={data.type} message={data.message} />
      {isLoading ? <Loading /> : null}
      <div className="w-full h-max">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex justify-center items-center gap-2 w-full text-indigo-400">
            <img src={image2} alt="" width={50} />
            <p className="font-medium">ClassCrafter.com</p>
          </div>
          <form
            action=""
            className="w-[90%] rounded-lg p-2 h-max border flex flex-col gap-3 bg-[#ecebeb] text-black lg:w-[40%] lg:gap-5"
            onSubmit={handleLogin}
          >
            <div className="">
              <h1 className="text-[1.3rem] font-medium text-center">
                Login to account
              </h1>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <input
                type="email"
                name="email"
                placeholder="Email Adress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-[100%] py-2 px-3 rounded-sm bg-slate-200 outline-none border border-black"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-[100%] py-2 px-3 rounded-sm bg-slate-200 outline-none border border-black"
              />
            </div>
            <div className="">
              <button
                type="submit"
                className="bg-indigo-600 py-2 px-7 rounded-sm tracking-[2px] text-white hover:bg-indigo-800 transition-all duration-200"
                disabled={isLoading}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
