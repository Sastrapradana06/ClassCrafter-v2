
import DataTable, { createTheme } from 'react-data-table-component';
import { themeTable } from '../../theme/theme-tabel';
import { getDate } from '../../utils/function'

export default function TabelAcara() {
  const dateNow = getDate()

  const data = [
    {
      id: 1,
      title: 'Bahasa Indonesia',
      tanggal: '08:00-10:30',
      status: 'Selesai'
    },
    {
      id: 1,
      title: 'Pemograman Web',
      tanggal: '10:30-12:00',
      status: 'Segera'
    },
    {
      id: 1,
      title: 'Agama Islam',
      tanggal: '12:00-13:30',
      status: 'Segera'
    },
  ]

  const columns = [
    // + no
    {
      name: 'N0',
      minWidth: '50px',
      selector: (row, index) => {
        return <div className='text-center font-semibold m-auto w-[20px]'>{index + 1}</div>;
      },
    },
    {
      name: 'Mapel',
      selector: row => row.title,
      sortable: true,
      minWidth: '180px'
    },
    {
      name: 'Jam',
      minWidth: '150px',
      selector: row => row.tanggal,
    },
    {
      name: 'Status',
      selector: row => row.status,

    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '62px',
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
          <div>
            <p className='text-[1.1rem] '>Jadwal Hari Ini</p>
            <p className='text-[.9rem] text-[#dda15e] font-medium'>{dateNow.day}, <span>{dateNow.date}</span></p>
          </div>
        }
        columns={columns}
        customStyles={customStyles}
        data={data}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        paginationPerPage={5}
        pagination
        className="rounded-lg w-[100%]"
        theme='themeTable'
      />
    </div>
  );
}