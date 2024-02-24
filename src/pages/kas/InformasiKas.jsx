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
    <div className="w-[100%] h-max flex items-center gap-2  overflow-x-auto lg:gap-4 justify-center mt-2 lg:justify-start lg:w-[90%]">
      <div className="w-max h-max bg-[#404556] p-2 flex items-center gap-2 rounded-md">
        <div className="p-2 rounded-full bg-green-600">
          <GiReceiveMoney size={30} fill="white" />
        </div>
        <div className="flex flex-col text-white">
          <p className="text-[.6rem] lg:text-[.9rem]">Kas</p>
          <p>{dataKelas ? dataKelas.saldo_kas.toLocaleString('id-ID') : 0}</p>
        </div>
      </div>
      <div className="w-max h-max bg-[#404556] p-2 flex items-center gap-2 rounded-md">
        <div className="p-2 rounded-full bg-sky-500">
          <IoMdTrendingDown size={30} fill="white" />
        </div>
        <div className="flex flex-col text-white">
          <p className="text-[.6rem] lg:text-[.9rem]">Masuk</p>
          <p>{uangMasuk.toLocaleString('id-ID')}</p>
        </div>
      </div>
      <div className="w-max h-max bg-[#404556] p-2 flex items-center gap-2 rounded-md">
        <div className="p-2 rounded-full bg-[crimson]">
          <IoMdTrendingUp size={30} fill="white" />
        </div>
        <div className="flex flex-col text-white">
          <p className="text-[.6rem] lg:text-[.9rem]">Keluar</p>
          <p>{uangKeluar.toLocaleString('id-ID')}</p>
        </div>
      </div>
    </div>
  )
}