import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import InformasiKas from "./InformasiKas";


import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { useDebounce } from 'use-debounce';


export default function CariKas() {
  const [cari, setCari] = useState('')
  const [debouncedValue] = useDebounce(cari, 1500);
  const [dataKas, getDataKas, updateDataKas] = useAppStore(
    useShallow((state) => [state.dataKas, state.getDataKas, state.updateDataKas])
  )

  const cariKas = () => {
    if (cari.length >= 3) {
      const filterData = dataKas.filter((data) => {
        const statusMatch = data.status.toLowerCase().includes(cari);
        const jumlahMatch = data.jumlah == cari;
        const userMatch = data.user.toLowerCase().includes(cari);

        return statusMatch || jumlahMatch || userMatch
      })
      updateDataKas(filterData)
    }
  }

  const reset = () => {
    getDataKas()
    setCari('')
  }

  useEffect(() => {
    cariKas();
  }, [debouncedValue]);
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

      <div className="w-[90%] flex gap-4">
        {cari.length < 3 ? (
          <button className="bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50" disabled>
            Pulihkan Data
          </button>
        ) : (
          <button className="py-2 px-4 bg-green-600 rounded-md text-white" onClick={reset} >Pulihkan Data</button>
        )}
      </div>
      <InformasiKas />

    </div>
  )
}
