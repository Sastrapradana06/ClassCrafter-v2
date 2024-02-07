import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import women_user from '/women.jfif'
import men_user from '/men-user.jfif'

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';

import { useNavigate } from 'react-router-dom';
import { deleteSiswaById } from '../../utils/api';

import { ToastContainer } from 'react-toastify';
import { handleToast } from "../../utils/function";

import { LuPencilLine } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";


export default function TabelSiswa() {
  const [dataSiswa, getDataSiswa, setDataSiswa, user] = useAppStore(
    useShallow((state) => [state.dataSiswa, state.getDataSiswa, state.setDataSiswa, state.user])
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (dataSiswa == undefined) {
      getDataSiswa()
    }
  }, [])

  const deleteSiswa = async (id) => {
    const res = await deleteSiswaById(id)
    if (res.status) {
      handleToast(res.message, 'info')
      setDataSiswa(res.data)
    } else {
      handleToast(res.message, 'error')
    }
  }

  const columns = [
    {
      name: 'N0',
      minWidth: '50px',
      selector: (row, index) => {
        return <div className='text-center font-semibold m-auto  w-[20px]'>{index + 1}</div>;
      },
    },
    {
      name: 'ID SISWA',
      selector: row => <div className='text-center font-medium m-auto  w-[50px]'>{row.id}</div>,
    },
    {
      name: 'NAMA LENGKAP',
      selector: row => <p className='capitalize'>{row.username}</p>,
      minWidth: '200px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'FOTO',
      selector: row => (
        <img
          src={
            row.image == ''
            ? row.jekel == 'laki-laki' ? men_user : (row.jekel == 'perempuan' ? women_user : '')
            : row.image
          }
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
      name: 'JABATAN',
      selector: row => <p className='capitalize'>{row.jabatan}</p>,
      minWidth: '130px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'EMAIL',
      selector: row => row.email,
      minWidth: '250px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'NO HP',
      selector: row => row.notel,
      minWidth: '120px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'TANGGAL LAHIR',
      selector: row => row.tanggal_lahir,
      minWidth: '170px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'JENIS KELAMIN',
      selector: row => <p className='capitalize'>{row.jekel}</p>,
      minWidth: '150px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'NAMA ORTU',
      selector: row => <p className='capitalize'>{row.nama_ortu}</p>,
      minWidth: '150px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'ALAMAT',
      selector: row => row.alamat,
      minWidth: '200px',
      style: {
        textAlign: 'left',
      },
    },
    {
      name: 'AKSI',
      minWidth: '180px',
      selector: row => {
        return user ? (
          user.jabatan === 'ketua kelas' || user.jabatan === 'sekretaris' ? (
            <div className="flex gap-2 text-white">
              <button className='bg-sky-400 py-1 px-4 rounded-md hover:bg-sky-500' onClick={() => navigate(`/tambah-siswa/${row.id}`)} title='edit'>
                <LuPencilLine size={20} />
              </button>
              <button className='bg-[crimson] py-1 px-4 rounded-md hover:bg-[#af364e]' onClick={() => deleteSiswa(row.id)} disabled={user.jabatan === 'member'} title='delete'>
                <MdDeleteSweep size={20} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2 text-white">
              <button className="bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50" disabled title='edit'>
                <LuPencilLine size={20} />
              </button>
              <button className="bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50" disabled title='delete'>
                <MdDeleteSweep size={20} />
              </button>
            </div>
          )
        ) : null;
      }
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
      <ToastContainer />
      <DataTable
        title={<span className='text-[#4d44D5] font-medium'>Data Siswa</span>}
        columns={columns}
        customStyles={customStyles}
        data={dataSiswa}
        pagination
        className="rounded-lg w-[100%]"
      />
    </div>
  );
}