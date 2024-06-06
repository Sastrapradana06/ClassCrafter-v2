import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import InformasiKas from "./InformasiKas";
import { useDebounce } from "use-debounce";

export default function CariKas() {
  const [cari, setCari] = useState("");
  const [debouncedValue] = useDebounce(cari, 1500);

  const cariKas = () => {
    console.log(cari);
  };

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
      <InformasiKas />
    </div>
  );
}
