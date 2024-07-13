/* eslint-disable react/prop-types */
import { PiSmileyXEyesFill } from "react-icons/pi";
import { BsEmojiHeartEyesFill } from "react-icons/bs";
import { useState } from "react";
import {
  useUpdatePassword,
  useUserLogin,
} from "../../../services/useCustomQuery";
import Loading from "../../../components/loading/Loading";
import useHandleAlert from "../../../hooks/useHandleAlert";
import Alert from "../../../components/alert/alert";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import * as Yup from "yup";
import { Formik, Form } from "formik";

export default function FormGantiPassword() {
  const validationSchema = Yup.object().shape({
    password_lama: Yup.string()
      .required("Password lama tidak boleh kosong")
      .min(6, "Password lama min 6 karakter"),
    password_baru: Yup.string()
      .required("Password baru tidak boleh kosong")
      .min(6, "Password baru min 6 karakter"),
    confirmasi_password: Yup.string()
      .required("Confirmasi password tidak boleh kosong")
      .min(6, "Confirmasi Password min 6 karakter"),
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

  const ErrorComponents = ({ errors, touched, name }) => {
    if (!errors[name] && !touched[name]) return;
    return (
      <p className="text-red-500 font-semibold text-[.7rem] -mt-2 lg:text-[.8rem]">
        {errors[name]}
      </p>
    );
  };

  const handleSubmit = (data) => {
    if (data.password_lama === data.password_baru) {
      handleAlert(
        "info",
        "Password lama tidak boleh sama dengan password baru"
      );
      return;
    }
    if (data.password_baru !== data.confirmasi_password) {
      handleAlert(
        "info",
        "Password baru harus sama dengan konfirmasi password"
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
        handleAlert("success", "Password Berhasil Dirubah");
        setTimeout(() => {
          navigate("/");
        }, 3000);
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
          <Formik
            initialValues={{
              password_lama: "",
              password_baru: "",
              confirmasi_password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form
                action=""
                className="w-full h-max  flex flex-col gap-3 p-4 lg:flex-row lg:justify-center lg:gap-0 "
              >
                <div className="w-full h-max flex flex-col gap-3">
                  <div className="w-full flex flex-col gap-2 text-[.9rem]">
                    <label htmlFor="password_lama">
                      Masukkan Password Lama{" "}
                      <span className="text-[crimson]">*</span>
                    </label>
                    <div className="relative w-full">
                      <input
                        className="w-full border p-3 outline-[#4D44B5] rounded-lg pr-10"
                        type={showPassword.password_lama ? "text" : "password"}
                        name="password_lama"
                        value={values.password_lama}
                        onChange={handleChange}
                        placeholder="Masukkan Password Lama"
                        onBlur={handleBlur}
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
                    <ErrorComponents
                      errors={errors}
                      touched={touched}
                      name="password_lama"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 text-[.9rem]">
                    <label htmlFor="password_baru">
                      Masukkan Password Baru{" "}
                      <span className="text-[crimson]">*</span>
                    </label>
                    <div className="relative w-full">
                      <input
                        className="w-full border p-3 outline-[#4D44B5] rounded-lg pr-10"
                        type={showPassword.password_baru ? "text" : "password"}
                        name="password_baru"
                        value={values.password_baru}
                        onChange={handleChange}
                        placeholder="Masukkan Password baru"
                        onBlur={handleBlur}
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
                    <ErrorComponents
                      errors={errors}
                      touched={touched}
                      name="password_baru"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 text-[.9rem]">
                    <label htmlFor="confirmasi_password">
                      Confirmasi Password
                      <span className="text-[crimson]">*</span>
                    </label>
                    <div className="relative w-full">
                      <input
                        className="w-full border p-3 outline-[#4D44B5] rounded-lg pr-10"
                        type={
                          showPassword.confirmasi_password ? "text" : "password"
                        }
                        name="confirmasi_password"
                        value={values.confirmasi_password}
                        onChange={handleChange}
                        placeholder="Confirmasi Password"
                        onBlur={handleBlur}
                      />
                      <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() =>
                          handleShowPassword("confirmasi_password")
                        }
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
                    <ErrorComponents
                      errors={errors}
                      touched={touched}
                      name="confirmasi_password"
                    />
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
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
