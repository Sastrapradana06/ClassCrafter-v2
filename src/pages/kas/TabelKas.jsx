/* eslint-disable react/prop-types */

import { useNavigate, useSearchParams } from "react-router-dom";

import { LuPencilLine } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import ModalDelete from "../../components/modal-delete/ModalDelete";

import { useEffect, useState } from "react";
import { useDataKas, useDeleteKas } from "../../services/useKasQuery";
import Alert from "../../components/alert/alert";
import useHandleAlert from "../../hooks/useHandleAlert";
import { useInvalidate, useUserLogin } from "../../services/useCustomQuery";
import { formatIndonesianDate } from "../../utils/function";
import useAppStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import InputCheckbox from "../../components/checkbox/InputCheckbox";
import Loading from "../../components/loading/Loading";

export default function TabelKas() {
  const [isModal, setIsModal] = useState(false);
  const [idDelete, setIdDelete] = useState(undefined);
  const [nameDelete, setNameDelete] = useState(undefined);
  const [dataKas, setDataKas] = useState([]);

  const { invalidateListQuery } = useInvalidate();
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { data, isFetching } = useDataKas();
  const { mutate, isPending } = useDeleteKas();
  const { data: user } = useUserLogin();
  const navigate = useNavigate();

  const [isDelete] = useAppStore(useShallow((state) => [state.isDelete]));

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const cariKas = (input) => {
    if (data) {
      const dataKas = data.filter((kas) => {
        const byStatus = kas.status == input.toLowerCase();
        const byUser = kas.user == input.toLowerCase();
        const byTanggal = formatIndonesianDate(kas.tgl_transaksi)
          .toLowerCase()
          .includes(input.toLowerCase());

        return byStatus || byUser || byTanggal;
      });
      if (dataKas.length > 0) {
        setDataKas(dataKas);
      } else {
        handleAlert("info", "Data Kas tidak ditemukan");
      }
    }
  };

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
    return (
      <div className="relative w-full h-max overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full h-max  text-sm text-left rtl:text-right text-white p-2">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-max">
            <tr className="">
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
                  <p
                    className={`capitalize ${
                      row.jabatan == "ketua kelas"
                        ? "bg-red-500"
                        : "bg-teal-600"
                    }  py-1 px-3 rounded-md text-white text-center`}
                  >
                    {row.user}
                  </p>
                </td>
                <td className="px-6 py-4 ">{row.deskripsi}</td>
                {user?.jabatan == "ketua kelas" ||
                user?.jabatan == "bendahara" ? (
                  <td className="px-6 py-4">
                    <div className="flex gap-2 text-white">
                      <button
                        className="bg-sky-400 py-1 px-4 rounded-md hover:bg-sky-500"
                        title="edit"
                        onClick={() =>
                          navigate(`/kas/edit-transaksi/${row.id}`)
                        }
                      >
                        <LuPencilLine size={20} />
                      </button>
                      <button
                        className="bg-[crimson] py-1 px-4 rounded-md hover:bg-[#af364e] disabled:bg-red-400 disabled:cursor-not-allowed"
                        onClick={() =>
                          showModal(row.id, row.nominal.toLocaleString("id-ID"))
                        }
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

  const columns = [
    "No",
    "Nominal",
    "Status",
    "Tgl Transaksi",
    "User",
    "Deskripsi",
    "Aksi",
  ];

  useEffect(() => {
    if (query) {
      cariKas(query);
    } else {
      setDataKas(data);
    }
  }, [query, data]);

  return (
    <div className="pb-[21%] lg:pb-[10%]">
      <>
        <Alert
          status={status}
          type={dataAlert.type}
          message={dataAlert.message}
        />
        {isFetching && <Loading />}
      </>
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
      <TableKas
        columns={
          user?.jabatan == "ketua kelas" || user?.jabatan == "bendahara"
            ? columns
            : columns.slice(0, 6)
        }
        dataTable={dataKas && dataKas.length > 0 ? dataKas : []}
      />
    </div>
  );
}
