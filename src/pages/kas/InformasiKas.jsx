import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";

import { useEffect, useState } from "react";
import { useDataKas } from "../../services/useKasQuery";

export default function InformasiKas() {
  const [uangMasuk, setUangMasuk] = useState(0);
  const [uangKeluar, setUangKeluar] = useState(0);
  const [saldo, setSaldo] = useState(0);

  const { data } = useDataKas();

  const getSaldo = () => {
    let masuk = 0;
    let keluar = 0;

    data?.filter((item) => {
      if (item.status === "masuk") {
        masuk += item.nominal;
      } else {
        keluar += item.nominal;
      }
    });

    setSaldo(masuk - keluar);
  };
  const getUangMasuk = () => {
    const filterUangMasuk = data?.filter((item) => {
      return item.status === "masuk";
    });
    if (filterUangMasuk !== undefined) {
      const totalUangMasuk = filterUangMasuk.reduce((total, item) => {
        return total + item.nominal;
      }, 0);
      setUangMasuk(totalUangMasuk);
    }
  };

  const getUangKeluar = () => {
    const filterUangKeluar = data?.filter((item) => {
      return item.status === "keluar";
    });

    if (filterUangKeluar !== undefined) {
      const totalUangKeluar = filterUangKeluar.reduce((total, item) => {
        return total + item.nominal;
      }, 0);
      setUangKeluar(totalUangKeluar);
    }
  };

  useEffect(() => {
    getUangMasuk();
    getUangKeluar();
    getSaldo();
  }, [data]);

  return (
    <div className="w-full  h-max flex items-center flex-wrap lg:flex-nowrap  lg:gap-8  mt-2 justify-start lg:w-[90%] gap-4 lg:pl-0">
      <div className="w-max  h-max flex items-center gap-2 rounded-md">
        <div className="p-2 rounded-full bg-green-600">
          <GiReceiveMoney
            fill="white"
            className="text-[1.5rem] lg:text-[2rem]"
          />
        </div>
        <div className="flex flex-col text-white">
          <p className="text-[.7rem] text-green-600 font-semibold lg:text-[1rem]">
            Kas
          </p>
          <p className="text-[.8rem] lg:text-[1.1rem] text-black font-medium">
            {saldo.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <div className="w-max h-max  flex items-center gap-2 rounded-md">
        <div className="p-2 rounded-full bg-sky-500">
          <IoMdTrendingDown
            fill="white"
            className="text-[1.5rem] lg:text-[2rem]"
          />
        </div>
        <div className="flex flex-col text-white">
          <p className="text-[.7rem] text-sky-600 font-semibold lg:text-[1rem]">
            Masuk
          </p>
          <p className="text-[.8rem] lg:text-[1.1rem]  text-black">
            {uangMasuk.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <div className="w-max h-max  flex items-center gap-2 rounded-md">
        <div className="p-2 rounded-full bg-[crimson]">
          <IoMdTrendingUp
            fill="white"
            className="text-[1.5rem] lg:text-[2rem]"
          />
        </div>
        <div className="flex flex-col text-white">
          <p className="text-[.7rem] font-semibold text-red-600 lg:text-[1rem]">
            Keluar
          </p>
          <p className="text-[.8rem] lg:text-[1.1rem] text-black">
            {uangKeluar.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
}
