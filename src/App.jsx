import { useState } from "react";
import "./App.css";

import image2 from "/student2.svg";
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
    <div className="w-full h-[100vh] flex items-center justify-center gap-3 bg-gray-900">
      <Alert status={status} type={data.type} message={data.message} />
      {isLoading ? <Loading /> : null}
      <div className="w-full h-max">
        <div className="flex flex-col justify-center items-center gap-2 border border-black w-[90%] py-6 rounded-lg bg-zinc-100 m-auto lg:w-[35%]">
          <div className="flex justify-center items-center gap-2 w-full text-indigo-400">
            <img src={image2} alt="" width={50} />
            <p className="font-medium text-violet-600">ClassCrafter.com</p>
          </div>

          <FormLogin handleLogin={handleLogin} />
          {/* <form className=" mt-3 w-[85%] lg:w-[90%]" onSubmit={handleLogin}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-500 "
              >
                Masukkan email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-3 outline-[#4D44B5]  rounded-lg text-[.9rem]  bg-gray-700"
                placeholder="name@gmail.com"
                required
              />
            </div>
            <div className="w-full flex flex-col text-[.9rem]">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600 "
              >
                Masukkan Password <span className="text-[crimson]">*</span>
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Masukkan Password baru"
                  className="w-full border p-3 outline-[#4D44B5] text-[.9rem] rounded-lg  bg-gray-700"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <BsEmojiHeartEyesFill
                      className="text-violet-500"
                      size={20}
                    />
                  ) : (
                    <PiSmileyXEyesFill size={23} className="text-violet-500" />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 mt-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Masuk
            </button>
          </form> */}
        </div>
      </div>
    </div>
  );
}

export default App;
