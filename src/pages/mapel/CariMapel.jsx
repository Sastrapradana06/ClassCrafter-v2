import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';

export default function CariMapel() {
  const [cari, setCari] = useState('')

  const [dataMapel, getDataMapel, updateDataMapel] = useAppStore(
    useShallow((state) => [state.dataMapel, state.getDataMapel, state.updateDataMapel])
  )

  const cariMapel = () => {
    const filterData = dataMapel.filter((data) => {
      const mapelMatch = data.mapel.toLowerCase().includes(cari)
      const hariMatch = data.hari.toLowerCase().includes(cari)

      return mapelMatch || hariMatch
    });
    updateDataMapel(filterData)
  }

  const reset = () => {
    getDataMapel()
  }

  return (
    <div className="w-full h-max flex flex-col bg-[#404556] rounded-md items-center py-3 gap-2">
      <div className="w-[90%] h-[50px] rounded-md  flex border border-gray  items-center p-2 gap-2">
        <IoIosSearch size={25} fill="#ffff" />
        <input
          type="text"
          placeholder="Cari nama mapel (min 3 huruf)"
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          className="w-full outline-none bg-transparent text-white"
        />
      </div>
      <div className="w-[90%] flex gap-4">
        <button className="py-[4px] px-6 bg-sky-400 rounded-md text-white" onClick={cariMapel} disabled={cari.length < 3}>Cari</button>
        <button className="py-[4px] px-6 bg-[crimson] rounded-md text-white" onClick={() => setCari('')}>Reset</button>
        <button className="py-[4px] px-6 bg-green-600 rounded-md text-white" onClick={reset}>Reload</button>
      </div>
    </div>
  )
}