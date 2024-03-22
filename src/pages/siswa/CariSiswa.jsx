import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { useDebounce } from 'use-debounce';

export default function CariSiswa() {
  const [cari, setCari] = useState('')
  const [dataSiswa, getDataSiswa, setDataSiswa] = useAppStore(
    useShallow((state) => [state.dataSiswa, state.getDataSiswa, state.setDataSiswa])
  )
  const [debouncedValue] = useDebounce(cari, 1000);


  const cariSiswa = () => {
    if (cari.length >= 3) {
      const filterData = dataSiswa.filter((data) => {
        const namaMatch = data.username.toLowerCase().includes(cari.toLocaleLowerCase());
        const jekelMatch = data.jekel.toLowerCase().includes(cari.toLocaleLowerCase())
        return namaMatch || jekelMatch
      })
      setDataSiswa(filterData)
    } else {
      getDataSiswa()
    }
  }


  useEffect(() => {
    cariSiswa();
  }, [debouncedValue]);

  return (
    <div className="w-full h-max flex flex-col bg-[#404556] rounded-md items-center py-3 gap-2">
      <div className="w-[90%] h-[50px] rounded-md  flex border border-gray  items-center p-1 gap-2">
        <IoIosSearch size={25} fill="#ffff" />
        <input
          type="text"
          placeholder="Cari nama siswa (min 3 huruf)"
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          className="w-full outline-none bg-transparent text-white"
        />
      </div>
    </div>
  )
}