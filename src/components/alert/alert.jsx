/* eslint-disable react/prop-types */
import {
  IoIosInformationCircle,
  IoMdCheckmarkCircle,
  IoIosCloseCircle,
} from "react-icons/io";

export default function Alert({ status, type, message }) {
  if (!status) return null;

  return (
    <div className="w-full h-max flex justify-center items-center fixed top-0 left-0 z-[1000]">
      <div
        className={`flex max-w-[90%] min-h-max lg:w-max items-center p-2 lg:p-4 mt-4 text-sm   border  rounded-lg  ${
          type == "success"
            ? "bg-gray-800 text-green-400 border-green-800"
            : type == "info"
            ? "bg-gray-800 text-blue-400 border-blue-800"
            : "bg-gray-800 text-red-400 border-red-800"
        }`}
        role="alert"
      >
        {type == "success" ? (
          <IoMdCheckmarkCircle size={20} className="text-green-600  me-1" />
        ) : type == "info" ? (
          <IoIosInformationCircle size={20} className="text-blue-600  me-1" />
        ) : (
          <IoIosCloseCircle size={20} className="text-red-600  me-1" />
        )}
        <span className="sr-only">Info</span>
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
