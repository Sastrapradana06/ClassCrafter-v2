/* eslint-disable react/prop-types */
import { FcClock } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { HiOutlinePencilAlt } from "react-icons/hi";

export default function CardNotif({ tema, judul, tgl, deskripsi }) {
  return (
    <div className="w-full h-max flex  gap-2 lg:gap-8 bg-gray-700 p-2 rounded-lg pb-3">
      <div className="w-max flex flex-col gap-2 items-center">
        <button
          className=" w-max h-max p-1 rounded-md bg-red-400 hover:bg-red-500"
          title="close"
        >
          <IoClose size={20} fill="white" />
        </button>
        <button
          className=" w-max h-max p-1 rounded-md bg-green-400 hover:bg-green-500"
          title="edit"
        >
          <HiOutlinePencilAlt size={20} color="white" />
        </button>
      </div>
      <div className="w-full h-max flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="w-full lg:w-[75%] ">
          <p className="p-1 text-white text-[.7rem] bg-yellow-500 w-max rounded-md font-semibold capitalize">
            {tema}
          </p>
          <p className="font-semibold text-[.9rem] mt-1 lg:text-[1rem] capitalize text-gray-200">
            Judul: &rdquo; {judul} &rdquo;
          </p>
          <p className="text-white text-[.8rem] mt-1 lg:text-[.9rem]">
            {deskripsi}
          </p>
        </div>
        <div className="w-max h-max   flex items-center gap-1">
          <FcClock size={20} />
          <p className="text-white text-[.8rem] mt-1 lg:text-[.9rem] ">{tgl}</p>
        </div>
      </div>
    </div>
  );
}
