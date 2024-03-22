// import { useEffect, useState } from 'react';
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
import { formatDateID } from '../../utils/function';
import { useState } from 'react';
import { deleteKasById } from '../../utils/api';
import TitleTable from '../../components/titleTable/title-table';


export default function TabelKas() {
  const [isModal, setIsModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [idDelete, setIdDelete] = useState(undefined)
  const [nameDelete, setNameDelete] = useState(undefined)

  const [user, dataKas, updateDataKas, updateDataKelas] = useAppStore(
    useShallow((state) => [state.user, state.dataKas, state.updateDataKas, state.updateDataKelas])
  )

  const navigate = useNavigate()

  // useEffect(() => {
  //   if (dataMapel == undefined) {
  //     getDataMapel()
  //   }
  // }, [])

  const deleteKas = async () => {
    setIsLoading(true)
    const res = await deleteKasById(idDelete)
    if (res.status) {
      handleToast(res.message, 'info')
      updateDataKas(res.data.kas)
      updateDataKelas(res.data.updateSaldoKas)
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

    // + JUMLAH
    {
      name: 'JUMLAH',
      selector: row => <p>{row.jumlah.toLocaleString('id-ID')}</p>,
      minWidth: '130px',
      style: {
        textAlign: 'left',
      },
    },

    // + STATUS
    {
      name: 'STATUS',
      minWidth: '100px',
      selector: row => <p className={`capitalize  font-semibold ${row.status == 'Masuk' ? 'text-sky-400' : 'text-red-600'}`}>{row.status}</p>,
      style: {
        textAlign: 'left',
      },
    },

    // + TANGGAL
    {
      name: 'TANGGAL',
      minWidth: '100px',
      selector: row => <p>{formatDateID(row.tanggal)}</p>,
      style: {
        textAlign: 'left',
      },
    },


    // + USER
    {
      name: 'USER',
      selector: row => <p className='capitalize bg-[#86A789] py-1 px-3 rounded-md text-white'>{row.user}</p>,
      minWidth: '120px',
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
          user.jabatan === 'ketua kelas' || user.jabatan === 'bendahara' ? (
            <div className="flex gap-2 text-white">
              <button className='bg-sky-400 py-1 px-4 rounded-md hover:bg-sky-500' title='edit' onClick={() => navigate(`/edit-transaksi/${row.id}`)}>
                <LuPencilLine size={20} />
              </button>
              <button className='bg-[crimson] py-1 px-4 rounded-md hover:bg-[#af364e]' onClick={() => showModal(row.id, row.jumlah.toLocaleString('id-ID'))} disabled={user.jabatan === 'member'} title='delete'>
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
            delete: deleteKas,
            close: removeModal,
            data: nameDelete,
            loading: isLoading
          }}
        />
      ) : null}
      <ToastContainer />
      <DataTable
        title={<TitleTable namaTable={'Data Kas'} link={'/buat-transaksi'} />}
        columns={columns}
        customStyles={customStyles}
        data={dataKas}
        theme='themeTable'
        pagination
        className="rounded-lg w-[100%]"
      >
      </DataTable>
    </div>
  );
}