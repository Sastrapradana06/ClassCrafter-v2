/* eslint-disable react/prop-types */

import { useState } from "react";

import { LuPencilLine } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import { IoManSharp, IoWoman } from "react-icons/io5";

import ModalDelete from "../../components/modal-delete/ModalDelete";
import { useNavigate } from "react-router-dom";
import { useInvalidate, useUserLogin } from "../../services/useCustomQuery";
import { useDataGuru, useDeleteGuruQuery } from "../../services/useGuruQuery";
import useHandleAlert from "../../hooks/useHandleAlert";
import Alert from "../../components/alert/alert";
import useAppStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import { dayColors } from "../../utils/function";
import InputCheckbox from "../../components/checkbox/InputCheckbox";

export default function TabelGuru() {
  const [isModal, setIsModal] = useState(false);
  const [idDelete, setIdDelete] = useState(undefined);
  const [nameDelete, setNameDelete] = useState(undefined);

  const [dataSearchGuru, isDelete] = useAppStore(
    useShallow((state) => [state.dataSearchGuru, state.isDelete])
  );

  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { data, isFetching } = useDataGuru();
  const { mutate, isPending } = useDeleteGuruQuery();
  const { invalidateListQuery } = useInvalidate();
  const { data: user } = useUserLogin();

  const navigate = useNavigate();

  const deleteGuru = async () => {
    mutate(idDelete, {
      onSuccess: () => {
        invalidateListQuery("data-guru");
        setIsModal(false);
        handleAlert("success", "Berhasil menghapus guru");
      },
      onError: () => {
        setIsModal(false);
        handleAlert("info", "Gagal menghapus guru");
      },
    });
  };

  const removeModal = () => {
    setIsModal(false);
    setIdDelete(undefined);
    setNameDelete(undefined);
  };

  const showModal = (id, name) => {
    setIsModal(true);
    setIdDelete(id);
    setNameDelete(name);
  };

  const TableGuru = ({ columns, dataTable }) => {
    return (
      <div className="relative w-full h-max overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full h-max  text-sm text-left rtl:text-right text-white p-2">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
                  <InputCheckbox id={row.id} />
                  {i + 1}
                </th>
                <td className="px-6 py-4 capitalize">{row.name}</td>
                <td className="px-6 py-4">
                  <img
                    src={
                      row.jekel === "laki-laki"
                        ? "/men-teacher.jfif"
                        : "/women-teacher.jfif"
                    }
                    alt="User Avatar"
                    className="w-[35px] h-[35px] border border-black rounded-full object-cover mx-auto"
                  />
                </td>
                <td className="px-6 py-4 text-white">
                  <div className="capitalize flex items-center gap-1">
                    {row.jekel == "laki-laki" ? (
                      <IoManSharp size={20} fill="#64B5F6" />
                    ) : (
                      <IoWoman size={20} fill="#F48FB1" />
                    )}
                    <p>{row.jekel}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className={`capitalize text-[#dda15e] font-semibold`}>
                    {row.mapel}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p
                    className={`capitalize ${
                      dayColors[row.jadwal]
                    } p-2 text-white rounded-md max-w-[170px] text-center`}
                  >
                    {row.jadwal}
                  </p>
                </td>
                {user?.jabatan == "ketua kelas" ||
                user?.jabatan == "sekretaris" ? (
                  <td className="px-6 py-4">
                    <div className="flex gap-2 text-white">
                      <button
                        className="bg-sky-400 py-1 px-4 rounded-md hover:bg-sky-500"
                        onClick={() => navigate(`/edit-guru/${row.id}`)}
                        title="edit"
                      >
                        <LuPencilLine size={20} />
                      </button>
                      <button
                        className="bg-[crimson] py-1 px-4 rounded-md hover:bg-[#af364e] disabled:bg-red-400 disabled:cursor-not-allowed"
                        onClick={() => showModal(row.id, row.name)}
                        disabled={isDelete}
                        title="delete"
                      >
                        <MdDeleteSweep size={20} />
                      </button>
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const column = [
    "No",
    "Nama Guru",
    "Foto",
    "Jenis Kelamin",
    "Mata Pelajaran",
    "Jadwal",
    "Aksi",
  ];

  return (
    <div className="pb-[21%] lg:pb-[10%]">
      {isModal ? (
        <ModalDelete
          modalData={{
            delete: deleteGuru,
            close: removeModal,
            data: nameDelete,
            loading: isPending,
          }}
        />
      ) : null}
      <Alert
        status={status}
        type={dataAlert.type}
        message={dataAlert.message}
      />
      <TableGuru
        columns={
          user?.jabatan == "ketua kelas" || user?.jabatan == "sekretaris"
            ? column
            : column.slice(0, 6)
        }
        dataTable={
          isFetching ? [] : dataSearchGuru.length > 0 ? dataSearchGuru : data
        }
      />
    </div>
  );
}
