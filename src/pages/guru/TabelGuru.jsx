import DataTable, { createTheme } from 'react-data-table-component';
import { themeGuru } from '../../theme/theme-tabel';

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';

import { useEffect, useState } from 'react';
import { deleteGuruById } from '../../utils/api';

import { ToastContainer } from 'react-toastify';
import { handleToast } from "../../utils/function";

import { LuPencilLine } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import { IoManSharp, IoWoman } from "react-icons/io5";

import ModalDelete from '../../components/modal-delete/ModalDelete';
import { useNavigate } from 'react-router-dom';


export default function TabelGuru() {
  const [isModal, setIsModal] = useState(false)
  const [idDelete, setIdDelete] = useState(undefined)
  const [nameDelete, setNameDelete] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const [dataGuru, getDataGuru, updateDataGuru, user] = useAppStore(
    useShallow((state) => [state.dataGuru, state.getDataGuru, state.updateDataGuru, state.user])
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (dataGuru == undefined) {
      getDataGuru()
    }
  }, [])

  const deleteGuru = async () => {
    setIsLoading(true)
    const res = await deleteGuruById(idDelete)
    if (res.status) {
      handleToast(res.message, 'info')
      updateDataGuru(res.data)
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
      name: 'N0',
      minWidth: '50px',
      selector: (row, index) => {
        return <div className='text-center font-semibold m-auto w-[20px]'>{index + 1}</div>;
      },
    },

    // + ID 
    {
      name: 'ID GURU',
      selector: row => <div className='text-center font-medium m-auto  w-[50px]'>{row.id}</div>,
    },

    // + NAMA
    {
      name: 'NAMA LENGKAP',
      selector: row => <p className='capitalize font-medium'>{row.nama_guru}</p>,
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
          alt="Image Guru"
          className='w-[40px] h-[40px] border border-black rounded-full object-cover mx-auto'
        />
      ),
      style: {
        textAlign: 'center',
        margin: 'auto'
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

    // + Mapel
    {
      name: 'MAPEL',
      minWidth: '190px',
      selector: row => <p className={`capitalize text-[#dda15e] font-semibold`}>{row.mapel}</p>,
    },

    // + JADWAL
    {
      name: 'JADWAL',
      selector: row => <p className='bg-[#307fb8] p-2 text-white rounded-md max-w-[170px]'>{row.jadwal}</p>,
      minWidth: '170px',
      style: {
        textAlign: 'left',
      },
    },

    // + AKSI
    {
      name: 'AKSI',
      minWidth: '150px',
      selector: row => {
        return user ? (
          user.jabatan === 'ketua kelas' || user.jabatan === 'sekretaris' ? (
            <div className="flex gap-2 text-white">
              <button className='bg-sky-400 py-1 px-4 rounded-md hover:bg-sky-500' onClick={() => navigate(`/edit-guru/${row.id}`)} title='edit'>
                <LuPencilLine size={20} />
              </button>
              <button className='bg-[crimson] py-1 px-4 rounded-md hover:bg-[#af364e]' onClick={() => showModal(row.id, row.nama_guru)} disabled={user.jabatan === 'member'} title='delete'>
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
        minHeight: '72px',
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

  createTheme('themeGuru', { themeGuru })


  return (
    <div className='pb-[21%] lg:pb-[10%]'>
      {isModal ? (
        <ModalDelete
          modalData={{
            delete: deleteGuru,
            close: removeModal,
            data: nameDelete,
            loading: isLoading
          }}
        />
      ) : null}
      <ToastContainer />
      <DataTable
        title={<div className='text-black font-medium bg-zinc-100 w-max py-1 px-5 rounded-md text-[1rem] lg:text-[1.1rem]'>Data Guru</div>}
        columns={columns}
        customStyles={customStyles}
        data={dataGuru}
        theme='themeGuru'
        pagination
        className="rounded-lg w-[100%]"
      >
      </DataTable>
    </div>
  )
}