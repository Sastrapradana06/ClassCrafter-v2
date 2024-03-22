import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { useEffect, useState } from "react";


export default function InformasiKas() {
  const [uangMasuk, setUangMasuk] = useState(0)
  const [uangKeluar, setUangKeluar] = useState(0)

  const [dataKas, dataKelas, getDataKas, getDataKelas] = useAppStore(
    useShallow((state) => [state.dataKas, state.dataKelas, state.getDataKas, state.getDataKelas,])
  )

  const getUangMasuk = () => {
    if (dataKas) {
      const filterUangMasuk = dataKas.filter((item) => {
        return item.status === 'Masuk';
      });

      const totalUangMasuk = filterUangMasuk.reduce((total, item) => {
        return total + item.jumlah;
      }, 0);

      setUangMasuk(totalUangMasuk)
    }
  }

  const getUangKeluar = () => {
    if (dataKas) {
      const filterUangKeluar = dataKas.filter((item) => {
        return item.status === 'Keluar';
      });

      const totalUangKeluar = filterUangKeluar.reduce((total, item) => {
        return total + item.jumlah;
      }, 0);

      setUangKeluar(totalUangKeluar)
    }
  }



  useEffect(() => {
    if (dataKas == undefined) {
      getDataKas()
    }

    if (dataKelas == undefined) {
      getDataKelas()
    }
    getUangMasuk()
    getUangKeluar()
  }, [getUangMasuk, getUangKeluar])

  return (
    <div className="w-[90%] h-max flex items-center flex-wrap lg:flex-nowrap  lg:gap-8 justify-center mt-2 lg:justify-start lg:w-[90%] gap-4 lg:pl-0">
      <div className="w-full lg:w-max  justify-center h-max bg-[#404556] flex items-center gap-2 rounded-md">
        <div className="p-2 rounded-full bg-green-600">
          <GiReceiveMoney fill="white" className="text-[1.5rem] lg:text-[2rem]" />
        </div>
        <div className="flex flex-col text-white">
          <p className="text-[.6rem] lg:text-[1rem]">Kas</p>
          <p className="text-[.8rem] lg:text-[1.1rem]">{dataKelas ? dataKelas.saldo_kas.toLocaleString('id-ID') : 0}</p>
        </div>
      </div>
      <div className="w-max h-max bg-[#404556] flex items-center gap-2 rounded-md">
        <div className="p-2 rounded-full bg-sky-500">
          <IoMdTrendingDown fill="white" className="text-[1.5rem] lg:text-[2rem]" />
        </div>
        <div className="flex flex-col text-white">
          <p className="text-[.6rem] lg:text-[1rem]">Masuk</p>
          <p className="text-[.8rem] lg:text-[1.1rem]">{uangMasuk.toLocaleString('id-ID')}</p>
        </div>
      </div>
      <div className="w-max h-max bg-[#404556] flex items-center gap-2 rounded-md">
        <div className="p-2 rounded-full bg-[crimson]">
          <IoMdTrendingUp fill="white" className="text-[1.5rem] lg:text-[2rem]" />
        </div>
        <div className="flex flex-col text-white">
          <p className="text-[.6rem] lg:text-[1rem]">Keluar</p>
          <p className="text-[.8rem] lg:text-[1.1rem]">{uangKeluar.toLocaleString('id-ID')}</p>
        </div>
      </div>
    </div>
  )
}