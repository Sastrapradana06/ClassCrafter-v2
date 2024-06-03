/* eslint-disable react/prop-types */

import { useShallow } from "zustand/react/shallow";
import useAppStore from "../../store/store";

import { useNavigate } from "react-router-dom";

import { LuPencilLine } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import ModalDelete from "../../components/modal-delete/ModalDelete";

import { useState } from "react";
import { useDataKas, useDeleteKas } from "../../services/useKasQuery";
import Alert from "../../components/alert/alert";
import useHandleAlert from "../../hooks/useHandleAlert";
import { useInvalidate } from "../../services/useCustomQuery";
import { formatIndonesianDate } from "../../utils/function";

export default function TabelKas() {
  const [isModal, setIsModal] = useState(false);
  const [idDelete, setIdDelete] = useState(undefined);
  const [nameDelete, setNameDelete] = useState(undefined);

  const [user] = useAppStore(useShallow((state) => [state.user]));
  const { invalidateListQuery } = useInvalidate();
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { data, isFetching } = useDataKas();
  const { mutate, isPending } = useDeleteKas();

  const navigate = useNavigate();

  const deleteKas = async () => {
    mutate(idDelete, {
      onSuccess: () => {
        invalidateListQuery("dataKas");
        handleAlert("success", "Berhasil menghapus kas");
        setIsModal(false);
      },
      onError: () => {
        handleAlert("info", "Gagal menghapus kas");
        setIsModal(false);
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

  const TableKas = ({ columns, dataTable }) => {
    console.log({ columns });
    return (
      <div className="relative w-full h-max overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full h-max  text-sm text-left rtl:text-right text-white p-2">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-max">
            <tr className="border w-[10px]">
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
                  <p>{row.nominal.toLocaleString("id-ID")}</p>
                </td>
                <td className="px-6 py-4">
                  <p
                    className={`capitalize  font-semibold ${
                      row.status == "masuk" ? "text-sky-400" : "text-red-600"
                    }`}
                  >
                    {row.status}
                  </p>
                </td>
                <td className="px-6 py-4">
                  {formatIndonesianDate(row.tgl_transaksi)}
                </td>
                <td className="px-6 py-4 ">
                  <p className="capitalize bg-violet-500 py-1 px-3 rounded-md text-white text-center">
                    {row.user}
                  </p>
                </td>
                <td className="px-6 py-4 ">
                  <p className="">{row.deskripsi}</p>
                </td>
                <td className="px-6 py-4">
                  {user &&
                    (user.jabatan === "ketua kelas" ||
                    user.jabatan === "bendahara" ? (
                      <div className="flex gap-2 text-white">
                        <button
                          className="bg-sky-400 py-1 px-4 rounded-md hover:bg-sky-500"
                          title="edit"
                          onClick={() => navigate(`/edit-transaksi/${row.id}`)}
                        >
                          <LuPencilLine size={20} />
                        </button>
                        <button
                          className="bg-[crimson] py-1 px-4 rounded-md hover:bg-[#af364e]"
                          onClick={() =>
                            showModal(
                              row.id,
                              row.nominal.toLocaleString("id-ID")
                            )
                          }
                          disabled={user.jabatan === "member"}
                          title="delete"
                        >
                          <MdDeleteSweep size={20} />
                        </button>
                      </div>
                    ) : null)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const columns = [
    "No",
    "Nominal",
    "Status",
    "Tgl Transaksi",
    "User",
    "Deskripsi",
    "Aksi",
  ];

  return (
    <div className="pb-[21%] lg:pb-[10%]">
      {isModal ? (
        <ModalDelete
          modalData={{
            delete: deleteKas,
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
      <TableKas
        columns={
          user.jabatan == "ketua kelas" || user.jabatan == "bendahara"
            ? columns
            : columns.slice(0, 6)
        }
        dataTable={isFetching ? [] : data}
      />
    </div>
  );
}
