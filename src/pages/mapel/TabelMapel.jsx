/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { LuPencilLine } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import ModalDelete from "../../components/modal-delete/ModalDelete";

import { useDataMapel, useDeleteMapel } from "../../services/useMapelQuery";
import Alert from "../../components/alert/alert";
import useHandleAlert from "../../hooks/useHandleAlert";
import { useInvalidate, useUserLogin } from "../../services/useCustomQuery";
import useAppStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import { dayColors } from "../../utils/function";
import InputCheckbox from "../../components/checkbox/InputCheckbox";
import Loading from "../../components/loading/Loading";

export default function TabelMapel() {
  const [isModal, setIsModal] = useState(false);
  const [idDelete, setIdDelete] = useState(undefined);
  const [nameDelete, setNameDelete] = useState(undefined);
  const [dataMapel, setDataMapel] = useState([]);

  const { data, isFetching } = useDataMapel();
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { mutate, isPending } = useDeleteMapel();
  const { invalidateListQuery } = useInvalidate();

  const navigate = useNavigate();

  const { data: user } = useUserLogin();

  const [isDelete] = useAppStore(useShallow((state) => [state.isDelete]));

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const cariMapel = (input) => {
    if (data) {
      const dataMapel = data.filter((mapel) =>
        mapel.mapel.toLowerCase().includes(input.toLowerCase())
      );
      if (dataMapel.length > 0) {
        setDataMapel(dataMapel);
      } else {
        handleAlert("info", "Mata pelajaran tidak ditemukan");
      }
    }
  };

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

  useEffect(() => {
    if (query) {
      cariMapel(query);
    } else {
      setDataMapel(data);
    }
  }, [query, data]);

  const TableMapel = ({ columns, dataTable }) => {
    return (
      <div className="relative w-full h-max overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full   text-sm text-left rtl:text-right text-white p-2">
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
                <td className="px-6 py-4 capitalize">
                  <p className={`capitalize text-[#dda15e] font-semibold`}>
                    {row.mapel}
                  </p>
                </td>
                <td className="px-6 py-4 capitalize">{row.jam}</td>
                <td className="px-6 py-4 capitalize">{row.durasi} M</td>

                <td className="px-6 py-4">
                  <p
                    className={`capitalize ${
                      dayColors[row.hari]
                    } p-2 text-white rounded-md max-w-[170px] text-center`}
                  >
                    {row.hari}
                  </p>
                </td>
                <td className="px-6 py-4 capitalize">{row.nama_guru}</td>
                {user?.jabatan == "ketua kelas" ||
                user?.jabatan == "sekretaris" ? (
                  <td className="px-6 py-4">
                    <div className="flex gap-2 text-white">
                      <button
                        className="bg-sky-400 py-1 px-4 rounded-md hover:bg-sky-500"
                        onClick={() => navigate(`/mapel/edit-mapel/${row.id}`)}
                        title="edit"
                      >
                        <LuPencilLine size={20} />
                      </button>
                      <button
                        className="bg-[crimson] py-1 px-4 rounded-md hover:bg-[#af364e] disabled:bg-red-300 disabled:cursor-not-allowed"
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

  const columns = [
    "No",
    "Mata Pelajaran",
    "Jam Masuk",
    "Durasi Belajar (Menit)",
    "Hari",
    "Guru",
    "Aksi",
  ];

  return (
    <div className="pb-[21%] lg:pb-[10%]">
      <>
        {isModal ? (
          <ModalDelete
            modalData={{
              delete: deleteMapel,
              close: removeModal,
              data: nameDelete,
              loading: isPending,
            }}
            setIsModal={setIsModal}
          />
        ) : null}
        {isFetching && <Loading />}
      </>
      <Alert
        status={status}
        type={dataAlert.type}
        message={dataAlert.message}
      />
      <TableMapel
        columns={
          user?.jabatan == "ketua kelas" || user?.jabatan == "sekretaris"
            ? columns
            : columns.slice(0, 6)
        }
        dataTable={dataMapel && dataMapel.length > 0 ? dataMapel : []}
      />
    </div>
  );
}
