
import DataTable, { createTheme } from 'react-data-table-component';
import { themeTable } from '../../theme/theme-tabel';
import { getDate, getToday } from '../../utils/function'

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { useEffect, useState, useCallback } from "react";


export default function TabelAcara() {
  const [jadwalMapell, setJadwalMapel] = useState()

  const [dataMapel, getDataMapel] = useAppStore(
    useShallow((state) => [state.dataMapel, state.getDataMapel])
  )

  const getMapelByHari = useCallback(() => {
    if (dataMapel) {
      const hari = getToday();
      const filterByHari = dataMapel.filter((data) => data.hari === hari);

      const sortedData = filterByHari.sort((a, b) => a.jam.localeCompare(b.jam));
      setJadwalMapel(sortedData);
    }
  }, [dataMapel]);

  useEffect(() => {
    if (dataMapel == undefined) {
      getDataMapel()
    }
    getMapelByHari()
  }, [getMapelByHari])


  const dateNow = getDate()

  const columns = [
    // + no
    {
      name: 'N0',
      minWidth: '10px',
      selector: (row, index) => {
        return <div className='text-center font-semibold m-auto w-[20px]'>{index + 1}</div>;
      },
    },
    {
      name: 'Mapel',
      selector: row => <p className='capitalize'>{row.mapel}</p>,
      sortable: true,
      minWidth: '180px'
    },
    {
      name: 'Jam',
      minWidth: '100px',
      selector: row => row.jam,
    },
    {
      name: 'Status',
      minWidth: '200px',
      selector: row => <p className='capitalize'>{row.nama_guru}</p>,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '67px',
      },
    },
    headCells: {
      style: {
        paddingLeft: '12px',
      },
    },
    cells: {
      style: {
        paddingLeft: '12px',
      },
    },
  };

  const paginationRowsPerPageOptions = [5, 10, 15, 20];

  createTheme('themeTable', { themeTable })

  return (
    <div>
      <DataTable
        title={
          <div className='p-2'>
            <p className='text-[1.1rem] '>Jadwal Hari Ini</p>
            <p className='text-[.9rem] text-[#dda15e] font-medium'>{dateNow.day}, <span>{dateNow.date}</span></p>
          </div>
        }
        columns={columns}
        customStyles={customStyles}
        data={jadwalMapell}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        paginationPerPage={5}
        pagination
        className="rounded-lg w-[100%]"
        theme='themeTable'
      />
    </div>
  );
}