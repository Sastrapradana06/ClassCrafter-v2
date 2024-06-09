/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDataMapel } from "../../services/useMapelQuery";
import { getDate, getToday } from "../../utils/function";

export default function TabelAcara() {
  const dateNow = getDate();
  const [data, setData] = useState([]);
  const { data: dataMapel } = useDataMapel();

  const getDataMapel = () => {
    if (dataMapel) {
      const getMapel = dataMapel.filter((item) => {
        return item.hari == getToday().toLowerCase();
      });

      setData(getMapel);
    }
  };

  const getHoursMinutes = () => {
    const event = new Date();
    const hours = event.getHours();
    const minutes = event.getMinutes();
    const jam = `${hours}:${minutes}`;
    return parseInt(jam.replace(":", ""));
  };

  const TableAcara = ({ columns, dataTable }) => {
    return (
      <div className="relative w-full h-max overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full h-max  text-sm text-left rtl:text-right text-white p-2">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-max">
            <tr className="">
              {columns.map((column, i) => (
                <th scope="col" className="px-6 py-3" key={i}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTable.map((row, i) => (
              <tr
                className="odd:bg-white  odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                key={i}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <td className="px-6 py-4 capitalize">
                  <p className={`capitalize text-[#dda15e] font-semibold`}>
                    {row.mapel}
                  </p>
                </td>
                <td className="px-6 py-4 capitalize">{row.nama_guru}</td>
                <td className="px-6 py-4 capitalize">{row.jam}</td>
                <td className="px-6 py-4 capitalize">
                  {row.jam.replace(":", "") < getHoursMinutes() &&
                  parseInt(row.jam.replace(":", "")) + 100 >
                    getHoursMinutes() ? (
                    <p className="text-green-500 font-semibold animate-pulse">
                      Berlangsung
                    </p>
                  ) : row.jam.replace(":", "") < getHoursMinutes() &&
                    row.jam.replace(":", "") < getHoursMinutes() ? (
                    <p className="text-sky-500 font-semibold">Selesai</p>
                  ) : (
                    <p className="text-gray-500 font-semibold">Belum Dimulai</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const columns = ["No", "Mata Pelajaran", "Guru", "Jam", "Status"];

  useEffect(() => {
    getDataMapel();
  }, [dataMapel]);

  return (
    <div>
      <div className="p-2 w-full h-max ">
        <p className="text-[1.1rem] font-bold text-gray-600">Jadwal Hari Ini</p>
        <p className="text-[.9rem] text-red-600 font-semibold">
          {dateNow.day}, <span>{dateNow.date}</span>
        </p>
      </div>
      <TableAcara columns={columns} dataTable={data.length == 0 ? [] : data} />
    </div>
  );
}
