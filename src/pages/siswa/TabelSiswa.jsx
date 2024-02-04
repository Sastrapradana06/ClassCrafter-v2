import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getAllSiswa } from '../../utils/api';
import admin from '/admin.jfif'

export default function TabelSiswa() {
  const [data, setData] = useState([])

  useEffect(() => {
    const getSiswa = async () => {
      const data = await getAllSiswa()
      setData(data.data)
      return data
    }

    getSiswa()
  }, [])

  const deleteSiswa = async (id) => {
    console.log({id});
  }


  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
      maxWidth: '0px',
      style: {
        textAlign: 'center',
      },
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
          src={admin}
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
      style: {
        textAlign: 'left',
      },
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
    <div>
      <DataTable
        title="Data Siswa"
        columns={columns}
        customStyles={customStyles}
        data={data}
        pagination
        className="rounded-lg w-[100%]"
      />
    </div>
  );
}