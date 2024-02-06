import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import admin from '/admin.jfif'

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';

export default function TabelSiswa() {
  const [dataSiswa, getDataSiswa] = useAppStore(
    useShallow((state) => [state.dataSiswa, state.getDataSiswa])
  )

  useEffect(() => {
    if (dataSiswa == undefined) {
      getDataSiswa()
    }
  }, [])

  const deleteSiswa = async (id) => {
    console.log({ id });
  }

  const columns = [
    {
      name: 'No',
      minWidth: '50px',
      selector: (row, index) => {
        return <div className='text-center font-semibold m-auto  w-[20px]'>{index + 1}</div>;
      },
    },
    {
      name: 'Id Siswa',
      selector: row => <div className='text-center font-medium m-auto  w-[50px]'>{row.id}</div>,
    },
    {
      name: 'Nama',
      selector: row => row.username,
      minWidth: '200px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'Image',
      selector: row => (
        <img
          src={row.image == '' ? admin : row.image}
          alt="User Avatar"
          className='w-[35px] h-[35px] border border-black rounded-full object-cover mx-auto'
        />
      ),
      style: {
        textAlign: 'center',
        margin: 'auto'
      },
    },
    {
      name: 'Jabatan',
      selector: row => row.jabatan,
      minWidth: '130px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'Email',
      selector: row => row.email,
      minWidth: '250px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'Notel',
      selector: row => row.notel,
      minWidth: '120px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'Tanggal Lahir',
      selector: row => row.tanggal_lahir,
      minWidth: '150px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'Nama Ortu',
      selector: row => row.nama_ortu,
      minWidth: '150px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'Alamat',
      selector: row => row.alamat,
      minWidth: '200px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'Aksi',
      minWidth: '180px',
      selector: row =>
        <div className="flex gap-2  text-white">
          <button className='bg-sky-400 py-1 px-4 rounded-md hover:bg-sky-500' >Edit</button>
          <button className='bg-[crimson] py-1 px-4 rounded-md hover:bg-[#af364e]' onClick={() => deleteSiswa(row.id)}>Hapus</button>
        </div>,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '62px',
      },
    },
  };

  return (
    <div className='pb-[21%] lg:pb-[10%]'>
      <DataTable
        title="Data Siswa"
        columns={columns}
        customStyles={customStyles}
        data={dataSiswa}
        pagination
        className="rounded-lg w-[100%]"
      />
    </div>
  );
}