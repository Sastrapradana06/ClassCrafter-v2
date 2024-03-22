import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { useDebounce } from 'use-debounce';


export default function CariGuru() {
  const [dataGuru, getDataGuru, updateDataGuru] = useAppStore(
    useShallow((state) => [state.dataGuru, state.getDataGuru, state.updateDataGuru])
  )
  const [cari, setCari] = useState('')
  const [debouncedValue] = useDebounce(cari, 1000);

  const cariGuru = () => {
    if (cari.length >= 3) {
      const filterData = dataGuru.filter((data) => {
        const namaMatch = data.nama_guru.toLowerCase().includes(cari)
        const jekelMatch = data.jekel.toLowerCase().includes(cari)
        return namaMatch || jekelMatch
      })
      updateDataGuru(filterData)
    } else {
      getDataGuru()
    }
  }

  useEffect(() => {
    cariGuru();
  }, [debouncedValue]);

  return (
    <div className="w-full h-max flex flex-col bg-[#404556] rounded-md items-center py-3 gap-2">
      <div className="w-[90%] h-[50px] rounded-md  flex border border-gray  items-center p-2 gap-2">
        <IoIosSearch size={25} fill="#ffff" />
        <input
          type="text"
          placeholder="Cari nama guru (min 3 huruf)"
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          className="w-full outline-none bg-transparent text-white"
        />
      </div>
    </div>
  )
}