import { useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';

import { useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { handleToast } from "../../utils/function";

import { LuPencilLine } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import ModalDelete from '../../components/modal-delete/ModalDelete';

import { themeTable } from '../../theme/theme-tabel';
import { deleteMapelById } from '../../utils/api';
import TitleTable from '../../components/titleTable/title-table';


export default function TabelMapel() {
  const [isModal, setIsModal] = useState(false)
  // const [idDelete, setIdDelete] = useState(undefined)
  // const [nameDelete, setNameDelete] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [idDelete, setIdDelete] = useState(undefined)
  const [nameDelete, setNameDelete] = useState(undefined)

  const [user, dataMapel, getDataMapel, updateDataMapel] = useAppStore(
    useShallow((state) => [state.user, state.dataMapel, state.getDataMapel, state.updateDataMapel])
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (dataMapel == undefined) {
      getDataMapel()
    }
  }, [])

  const deleteSiswa = async () => {
    setIsLoading(true)
    const res = await deleteMapelById(idDelete)
    if (res.status) {
      handleToast(res.message, 'info')
      updateDataMapel(res.data)
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

  const showModal = (id, namaGuru) => {
    setIsModal(true)
    setIdDelete(id)
    setNameDelete(namaGuru)
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

    // + MAPEL
    {
      name: 'MATA PELAJARAN',
      minWidth: '200px',
      selector: row => <p className={`capitalize text-[#dda15e] font-semibold`}>{row.mapel}</p>,
      style: {
        textAlign: 'left',
      },
    },

    // + JAM
    {
      name: 'JAM',
      selector: row => row.jam,
      minWidth: '200px',
      style: {
        textAlign: 'left',
      },
    },

    // + HARI
    {
      name: 'HARI',
      selector: row => <p className='capitalize bg-[#86A789] py-1 px-3 rounded-md text-white'>{row.hari}</p>,
      minWidth: '150px',
      style: {
        textAlign: 'left',
      },
    },

    // + NAMA GURU
    {
      name: 'NAMA GURU',
      selector: row => row.nama_guru,
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
              <button className='bg-sky-400 py-1 px-4 rounded-md hover:bg-sky-500' title='edit' onClick={() => navigate(`/edit-mapel/${row.id}`)}>
                <LuPencilLine size={20} />
              </button>
              <button className='bg-[crimson] py-1 px-4 rounded-md hover:bg-[#af364e]' onClick={() => showModal(row.id, row.mapel)} disabled={user.jabatan === 'member'} title='delete'>
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
        title={<TitleTable namaTable={'Mata Pelajaran'} link={'/tambah-mapel'} />}
        columns={columns}
        customStyles={customStyles}
        data={dataMapel}
        theme='themeTable'
        pagination
        className="rounded-lg w-[100%]"
      >
      </DataTable>
    </div>
  );
}