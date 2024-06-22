import { PiSmileyXEyesFill } from "react-icons/pi";
import { BsEmojiHeartEyesFill } from "react-icons/bs";
import { useState } from "react";
import {
  useUpdatePassword,
  useUserLogin,
} from "../../../services/useCustomQuery";
import Loading from "../../../components/loading/Loading";
import useHandleAlert from "../../../hooks/useHandleAlert";
import useHandleInput from "../../../hooks/useHandleInput";
import Alert from "../../../components/alert/alert";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
export default function FormGantiPassword() {
  const { data, handleChange, clearInput } = useHandleInput({
    password_lama: "",
    password_baru: "",
    confirmasi_password: "",
  });

  const navigate = useNavigate();
  const signOut = useSignOut();

  const { status, data: alert, handleAlert } = useHandleAlert();
  const { data: user } = useUserLogin();
  const { mutate, isPending } = useUpdatePassword();

  const [showPassword, setShowPassword] = useState({
    password_lama: false,
    password_baru: false,
    confirmasi_password: false,
  });

  const handleShowPassword = (name) => {
    setShowPassword({
      ...showPassword,
      [name]: !showPassword[name],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password_baru !== data.confirmasi_password) {
      handleAlert(
        "info",
        "Password baru tidak sama dengan konfirmasi password"
      );
      return;
    }
    const dataBody = {
      idUser: user.id,
      password_lama: data.password_lama,
      password_baru: data.password_baru,
    };
    mutate(dataBody, {
      onSuccess: () => {
        signOut();
        navigate("/");
        handleAlert("success", "Password Berhasil Dirubah");
        clearInput();
      },
      onError: (error) => {
        handleAlert("error", error.message);
      },
    });
  };

  return (
    <div className="w-full h-max bg-[#404556] rounded-lg flex flex-col gap-7 py-6 px-2">
      <Alert status={status} type={alert.type} message={alert.message} />
      {isPending ? <Loading /> : null}

      <div className="w-full h-max  flex flex-col items-center gap-2 justify-center ">
        <div className="w-[90%] h-max rounded-md bg-[#ffff]">
          <div className="w-[100%] m-auto h-[60px] border-b border-gray-300 flex items-center p-4">
            <p className=" text-[#4D44B5] font-medium">Ganti Password</p>
          </div>
          <form
            action=""
            className="w-full h-max  flex flex-col gap-3 p-4 lg:flex-row lg:justify-center lg:gap-0 "
            onSubmit={handleSubmit}
          >
            <div className="w-full h-max flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="password_lama">
                  Masukkan Password Lama{" "}
                  <span className="text-[crimson]">*</span>
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword.password_lama ? "text" : "password"}
                    name="password_lama"
                    required
                    value={data.password_lama}
                    onChange={handleChange}
                    placeholder="Masukkan Password Lama"
                    className="w-full border p-3 outline-[#4D44B5] rounded-lg pr-10"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => handleShowPassword("password_lama")}
                  >
                    {showPassword.password_lama ? (
                      <BsEmojiHeartEyesFill
                        className="text-[#4D44B5]"
                        size={20}
                      />
                    ) : (
                      <PiSmileyXEyesFill className="text-black" size={23} />
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="password_baru">
                  Masukkan Password Baru{" "}
                  <span className="text-[crimson]">*</span>
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword.password_baru ? "text" : "password"}
                    name="password_baru"
                    required
                    value={data.password_baru}
                    onChange={handleChange}
                    placeholder="Masukkan Password baru"
                    className="w-full border p-3 outline-[#4D44B5] rounded-lg pr-10"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => handleShowPassword("password_baru")}
                  >
                    {showPassword.password_baru ? (
                      <BsEmojiHeartEyesFill
                        className="text-[#4D44B5]"
                        size={20}
                      />
                    ) : (
                      <PiSmileyXEyesFill className="text-black" size={23} />
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="confirmasi_password">
                  Confirmasi Password
                  <span className="text-[crimson]">*</span>
                </label>
                <div className="relative w-full">
                  <input
                    type={
                      showPassword.confirmasi_password ? "text" : "password"
                    }
                    name="confirmasi_password"
                    required
                    value={data.confirmasi_password}
                    onChange={handleChange}
                    placeholder="Confirmasi Password"
                    className="w-full border p-3 outline-[#4D44B5] rounded-lg pr-10"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => handleShowPassword("confirmasi_password")}
                  >
                    {showPassword.confirmasi_password ? (
                      <BsEmojiHeartEyesFill
                        className="text-[#4D44B5]"
                        size={20}
                      />
                    ) : (
                      <PiSmileyXEyesFill className="text-black" size={23} />
                    )}
                  </div>
                </div>
              </div>

              {/* end input */}
              <div className="w-full">
                <button
                  className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]"
                  type="submit"
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
