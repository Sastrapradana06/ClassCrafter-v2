/* eslint-disable react/prop-types */
import { useState } from "react";

import { useShallow } from "zustand/react/shallow";
import useAppStore from "../../store/store";

import { useNavigate } from "react-router-dom";

import { LuPencilLine } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import ModalDelete from "../../components/modal-delete/ModalDelete";

import { useDataMapel, useDeleteMapel } from "../../services/useMapelQuery";
import Alert from "../../components/alert/alert";
import useHandleAlert from "../../hooks/useHandleAlert";
import { useInvalidate } from "../../services/useCustomQuery";

export default function TabelMapel() {
  const [isModal, setIsModal] = useState(false);
  const [idDelete, setIdDelete] = useState(undefined);
  const [nameDelete, setNameDelete] = useState(undefined);
  const navigate = useNavigate();

  const [user] = useAppStore(useShallow((state) => [state.user]));

  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { data, isFetching } = useDataMapel();
  const { mutate, isPending } = useDeleteMapel();
  const { invalidateListQuery } = useInvalidate();

  const deleteMapel = async () => {
    mutate(idDelete, {
      onSuccess: () => {
        invalidateListQuery("dataMapel");
        setIsModal(false);
        handleAlert("success", "Berhasil menghapus mata pelajaran");
      },
      onError: (error) => {
        console.log({ error });
        handleAlert("info", "Gagal menghapus mata pelajaran");
      },
    });
  };

  const removeModal = () => {
    setIsModal(false);
    setIdDelete(undefined);
    setNameDelete(undefined);
  };

  const showModal = (id, namaGuru) => {
    setIsModal(true);
    setIdDelete(id);
    setNameDelete(namaGuru);
  };

  const TableMapel = ({ columns, dataTable }) => {
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
                  {i + 1}
                </th>
                <td className="px-6 py-4 capitalize">
                  <p className={`capitalize text-[#dda15e] font-semibold`}>
                    {row.mapel}
                  </p>
                </td>
                <td className="px-6 py-4 capitalize">{row.jam}</td>
                <td className="px-6 py-4">
                  <p className="capitalize bg-[#86A789] p-2 text-white rounded-md max-w-[170px] text-center">
                    {row.hari}
                  </p>
                </td>
                <td className="px-6 py-4 capitalize">{row.nama_guru}</td>
                <td className="px-6 py-4">
                  {user &&
                    (user.jabatan === "ketua kelas" ||
                    user.jabatan === "sekretaris" ? (
                      <div className="flex gap-2 text-white">
                        <button
                          className="bg-sky-400 py-1 px-4 rounded-md hover:bg-sky-500"
                          title="edit"
                          onClick={() => navigate(`/edit-mapel/${row.id}`)}
                        >
                          <LuPencilLine size={20} />
                        </button>
                        <button
                          className="bg-[crimson] py-1 px-4 rounded-md hover:bg-[#af364e]"
                          onClick={() => showModal(row.id, row.mapel)}
                          disabled={user.jabatan === "member"}
                          title="delete"
                        >
                          <MdDeleteSweep size={20} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2 text-white">
                        <button
                          className="bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"
                          disabled
                          title="edit"
                        >
                          <LuPencilLine size={20} />
                        </button>
                        <button
                          className="bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"
                          disabled
                          title="delete"
                        >
                          <MdDeleteSweep size={20} />
                        </button>
                      </div>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="pb-[21%] lg:pb-[10%]">
      {isModal ? (
        <ModalDelete
          modalData={{
            delete: deleteMapel,
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
      <TableMapel
        columns={["No", "Mata Pelajaran", "Jam", "Hari", "Guru", "Aksi"]}
        dataTable={isFetching ? [] : data}
      />
    </div>
  );
}
