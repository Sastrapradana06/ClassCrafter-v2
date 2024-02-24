import { BsFileEarmarkPerson } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { RiCalendarEventLine } from "react-icons/ri";
import { FaMoneyCheckAlt } from "react-icons/fa";

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { useEffect } from "react";


export default function Header() {
  const [dataKelas, getDataKelas] = useAppStore(
    useShallow((state) => [state.dataKelas, state.getDataKelas])
  )

  useEffect(() => {
    getDataKelas()
  }, [])



  return (
    <div className="w-full h-[150px] rounded-md flex justify-between flex-wrap bg-[#404556] lg:flex-nowrap lg:h-max lg:items-center">
      <div className="w-[50%] h-[50%] flex p-3 items-center gap-2 ">
        <div className="p-4 bg-[#4D44B5] rounded-full">
          <BsFileEarmarkPerson fill="white" className="size-5" />
        </div>
        <div className="flex flex-col">
          <p className="text-[.8rem] text-[#ffff] lg:text-[1rem]">Siswa</p>
          <p className="text-[#dda15e] font-semibold text-[1.2rem]">{dataKelas ? dataKelas.jumlah_siswa : 0}</p>
        </div>
      </div>
      <div className="w-[50%] h-[50%] flex p-3 items-center gap-2  ">
        <div className="p-4 bg-[#e65e39] rounded-full">
          <GiTeacher fill="white" className="size-5" />
        </div>
        <div className="flex flex-col">
          <p className="text-[.8rem] text-[#ffff] lg:text-[1rem]">Guru</p>
          <p className="text-[#dda15e] font-semibold text-[1.2rem]">{dataKelas ? dataKelas.jumlah_guru : 0}</p>
        </div>
      </div>
      <div className="w-[50%] h-[50%] flex p-3 items-center gap-2 ">
        <div className="p-4 bg-[#FCC43E] rounded-full">
          <RiCalendarEventLine fill="white" className="size-5" />
        </div>
        <div className="flex flex-col">
          <p className="text-[.8rem] text-[#ffff] lg:text-[1rem]">Mapel</p>
          <p className="text-[#dda15e] font-semibold text-[1.2rem]">{dataKelas ? dataKelas.jumlah_mapel : 0}</p>
        </div>
      </div>
      <div className="w-[50%] h-[50%] flex p-3 items-center gap-2 ">
        <div className="p-4 bg-[#44aa44] rounded-full">
          <FaMoneyCheckAlt fill="white" className="size-5" />
        </div>
        <div className="flex flex-col">
          <p className="text-[.8rem] text-[#ffff] lg:text-[1rem]">Kas</p>
          <p className="text-[#dda15e] font-semibold text-[1.2rem]">{dataKelas ? dataKelas.saldo_kas.toLocaleString('id-ID') : 0}</p>
        </div>
      </div>
    </div>
  )
}