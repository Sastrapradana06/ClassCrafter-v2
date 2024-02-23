import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";


export default function InformasiKas() {
  return (
    <div className="w-[100%] h-max flex items-center gap-2  overflow-x-auto lg:gap-4">
      <div className="w-max h-max bg-[#404556] p-2 flex items-center gap-2 rounded-md">
        <div className="p-2 rounded-full bg-sky-400">
          <GiReceiveMoney size={30} fill="white" />
        </div>
        <div className="flex flex-col text-white">
          <p className="text-[.6rem] lg:text-[.9rem]">Kas</p>
          <p>530.000</p>
        </div>
      </div>
      <div className="w-max h-max bg-[#404556] p-2 flex items-center gap-2 rounded-md">
        <div className="p-2 rounded-full bg-[green]">
          <IoMdTrendingDown size={30} fill="white" />
        </div>
        <div className="flex flex-col text-white">
          <p className="text-[.6rem] lg:text-[.9rem]">Masuk</p>
          <p>420.000</p>
        </div>
      </div>
      <div className="w-max h-max bg-[#404556] p-2 flex items-center gap-2 rounded-md">
        <div className="p-2 rounded-full bg-[crimson]">
          <IoMdTrendingUp size={30} fill="white" />
        </div>
        <div className="flex flex-col text-white">
          <p className="text-[.6rem] lg:text-[.9rem]">Keluar</p>
          <p>120.000</p>
        </div>
      </div>
    </div>
  )
}