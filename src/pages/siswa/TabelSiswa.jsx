import { useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { FaRegEye } from "react-icons/fa";
import { IoManSharp, IoWoman } from "react-icons/io5";

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';

import { useNavigate } from 'react-router-dom';
import { deleteSiswaById } from '../../utils/api';

import { ToastContainer } from 'react-toastify';
import { handleToast } from "../../utils/function";

import { LuPencilLine } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import ModalDelete from '../../components/modal-delete/ModalDelete';

import { themeTable } from '../../theme/theme-tabel';


export default function TabelSiswa() {
  const [isModal, setIsModal] = useState(false)
  const [idDelete, setIdDelete] = useState(undefined)
  const [nameDelete, setNameDelete] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const [dataSiswa, getDataSiswa, setDataSiswa, user] = useAppStore(
    useShallow((state) => [state.dataSiswa, state.getDataSiswa, state.setDataSiswa, state.user])
  )


  const navigate = useNavigate()

  useEffect(() => {
    if (dataSiswa == undefined) {
      getDataSiswa()
    }
  }, [])

  const deleteSiswa = async () => {
    setIsLoading(true)
    const res = await deleteSiswaById(idDelete)
    if (res.status) {
      handleToast(res.message, 'info')
      setDataSiswa(res.data)
    } else {
      handleToast(res.message, 'error')
    }
    setIsModal(false)
    setIsLoading(false)
  }

  const removeModal = () => {
    setIsModal(false)
    setIdDelete(undefined)
    setNameDelete(undefined)
  }

  const showModal = (id, name) => {
    setIsModal(true)
    setIdDelete(id)
    setNameDelete(name)
  }

  const columns = [
    // + no
    {
      name: 'NO',
      minWidth: '50px',
      selector: (row, index) => {
        return <div className='text-center font-semibold m-auto  w-[20px]'>{index + 1}</div>;
      },
    },

    // // + ID 
    // {
    //   name: 'ID SISWA',
    //   selector: row => <div className='text-center font-medium m-auto  w-[50px]'>{row.id}</div>,
    // },

    // + NAMA
    {
      name: 'NAMA LENGKAP',
      selector: row => <p className='capitalize'>{row.username}</p>,
      minWidth: '200px',
      style: {
        textAlign: 'left',
      },
    },

    // + FOTO
    {
      name: 'FOTO',
      selector: row => (
        <img
          src={row.image}
          alt="User Avatar"
          className='w-[35px] h-[35px] border border-black rounded-full object-cover mx-auto'
        />
      ),
      style: {
        textAlign: 'center',
        margin: 'auto'
      },
    },

    // + JABATAN
    {
      name: 'JABATAN',
      selector: row => <p className={`capitalize py-1 px-4 border rounded-lg ${row.jabatan === 'ketua kelas' ? 'bg-[#B80000] text-white' : row.jabatan === 'sekretaris' ? 'bg-[#40679E] text-white' : row.jabatan === 'bendahara' ? 'bg-[#0D9276] text-white' : ' border-none'}`}>{row.jabatan}</p>,
      minWidth: '140px',
      style: {
        textAlign: 'left',
      },
    },

    // + EMAIL
    {
      name: 'EMAIL',
      selector: row => row.email,
      minWidth: '200px',
      style: {
        textAlign: 'left',
      },
    },

    // + NOTEL
    {
      name: 'NO HP',
      selector: row => row.notel,
      minWidth: '120px',
      style: {
        textAlign: 'left',
      },
    },

    // + TGL
    {
      name: 'TANGGAL LAHIR',
      selector: row => row.tanggal_lahir,
      minWidth: '170px',
      style: {
        textAlign: 'left',
      },
    },

    // + JEKEL
    {
      name: 'JENIS KELAMIN',
      selector: row =>
        <div className='capitalize flex items-center gap-1'>
          {row.jekel == 'laki-laki' ? <IoManSharp size={20} fill='#64B5F6' /> : <IoWoman size={20} fill='#F48FB1' />}
          <p>{row.jekel}</p>
        </div>,
      minWidth: '150px',
      style: {
        textAlign: 'left',
      },
    },

    // + ORTU
    {
      name: 'NAMA ORTU',
      selector: row => <p className='capitalize'>{row.nama_ortu}</p>,
      minWidth: '150px',
      style: {
        textAlign: 'left',
      },
    },

    // + ALAMAT
    {
      name: 'ALAMAT',
      selector: row => row.alamat,
      minWidth: '200px',
      style: {
        textAlign: 'left',
      },
    },

    // + AKSI
    {
      name: 'AKSI',
      minWidth: '220px',
      selector: row => {
        return user ? (
          user.jabatan === 'ketua kelas' || user.jabatan === 'sekretaris' ? (
            <div className="flex gap-2 text-white">
              <button className='bg-sky-400 py-1 px-4 rounded-md hover:bg-sky-500' onClick={() => navigate(`/tambah-siswa/${row.id}`)} title='edit'>
                <LuPencilLine size={20} />
              </button>
              <button className='bg-[crimson] py-1 px-4 rounded-md hover:bg-[#af364e]' onClick={() => showModal(row.id, row.username)} disabled={user.jabatan === 'member'} title='delete'>
                <MdDeleteSweep size={20} />
              </button>
              <button className='bg-[#dca714] py-1 px-4 rounded-md hover:bg-[#af8936] cursor-pointer' title='detail' onClick={() => navigate(`/detail-siswa/${row.id}`)}>
                <FaRegEye size={20} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2 text-white">
              <button className='bg-[#dca714] py-1 px-4 rounded-md hover:bg-[#af8936] cursor-pointer' title='detail' onClick={() => navigate(`/detail-siswa/${row.id}`)}>
                <FaRegEye size={20} />
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
        minHeight: '72px',
      },
    },
  };

  createTheme('themeTable', { themeTable })

  return (
    <div className='pb-[21%] lg:pb-[10%]'>
      {isModal ? (
        <ModalDelete
          modalData={{
            delete: deleteSiswa,
            close: removeModal,
            data: nameDelete,
            loading: isLoading
          }}
        />
      ) : null}
      <ToastContainer />
      <DataTable
        title={<div className='text-black font-medium bg-zinc-100 w-max py-1 px-5 rounded-md text-[1rem] lg:text-[1.1rem]'>Data Siswa</div>}
        columns={columns}
        customStyles={customStyles}
        data={dataSiswa}
        theme='themeTable'
        pagination
        className="rounded-lg w-[100%]"
      >
      </DataTable>
    </div>
  );
}