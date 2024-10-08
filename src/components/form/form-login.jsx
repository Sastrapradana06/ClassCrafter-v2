/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsEmojiHeartEyesFill } from "react-icons/bs";
import { PiSmileyXEyesFill } from "react-icons/pi";
import * as Yup from "yup";
import { Formik, Form } from "formik";
export default function FormLogin({ handleLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email tidak boleh kosong"),
    password: Yup.string()
      .required("Password tidak boleh kosong")
      .min(6, "Password min 6 karakter"),
  });

  return (
    <Formik
      initialValues={{ email: "zoe@gmail.com", password: "ketuakelas" }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleLogin(values.email, values.password)}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className=" mt-3 w-full lg:w-[90%] ">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-500 "
            >
              Masukkan email
            </label>
            <input
              className="w-full border p-3 outline-[#4D44B5]  rounded-lg text-[.9rem]  bg-gray-700"
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="name@gmail.com"
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 -mb-2 font-semibold text-[.8rem]">
                {errors.email}
              </p>
            )}
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
                className="w-full border p-3 outline-[#4D44B5] text-[.9rem] rounded-lg  bg-gray-700"
                type={showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Masukkan Password baru"
                onBlur={handleBlur}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <BsEmojiHeartEyesFill className="text-red-400" size={20} />
                ) : (
                  <PiSmileyXEyesFill size={23} className="text-red-400" />
                )}
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 -mb-2 font-semibold text-[.8rem]">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg mt-6 font-semibold tracking-[1px]"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
