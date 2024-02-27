import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import InformasiKas from "./InformasiKas";


import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';

export default function CariKas() {
  const [cari, setCari] = useState('')

  const [dataKas, getDataKas, updateDataKas] = useAppStore(
    useShallow((state) => [state.dataKas, state.getDataKas, state.updateDataKas])
  )

  const cariKas = () => {
    const filterData = dataKas.filter((data) => {

      const statusMatch = data.status.toLowerCase().includes(cari.toLowerCase());
      const jumlahMatch = data.jumlah == cari;
      const userMatch = data.user.toLowerCase().includes(cari.toLowerCase());

      return statusMatch || jumlahMatch || userMatch
    })


    updateDataKas(filterData)
  }

  const reset = () => {
    getDataKas()
  }
  return (
    <div className="w-full h-max flex flex-col bg-[#404556] rounded-md items-center py-3 gap-2">
      <div className="w-[90%] h-[50px] rounded-md  flex border border-gray  items-center p-2 gap-2">
        <IoIosSearch size={25} fill="#ffff" />
        <input
          type="text"
          placeholder="Cari Kas (min 3 huruf)"
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          className="w-full outline-none bg-transparent text-white"
        />
      </div>
      <div className="w-[90%] flex gap-3 text-[.9rem] items-center justify-center lg:items-start lg:justify-start">
        <button className="py-[4px] px-6 bg-sky-400 rounded-md text-white" onClick={cariKas} disabled={cari.length < 3}>Cari</button>
        <button className="py-[4px] px-6 bg-[crimson] rounded-md text-white" onClick={() => setCari('')}>Reset</button>
        <button className="py-[4px] px-6 bg-green-600 rounded-md text-white" onClick={reset}>Reload</button>
      </div>
      <InformasiKas />

    </div>
  )
}
