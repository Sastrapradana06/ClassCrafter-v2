/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { IoManSharp, IoWoman } from "react-icons/io5";

import { useNavigate, useSearchParams } from "react-router-dom";

import { LuPencilLine } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import ModalDelete from "../../components/modal-delete/ModalDelete";

import { useDataSiswa, useDeleteSiswa } from "../../services/useDataSiswa";
import useHandleAlert from "../../hooks/useHandleAlert";
import Alert from "../../components/alert/alert";
import { useInvalidate, useUserLogin } from "../../services/useCustomQuery";
import useAppStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import InputCheckbox from "../../components/checkbox/InputCheckbox";
import Loading from "../../components/loading/Loading";
export default function TabelSiswa() {
  const [isModal, setIsModal] = useState(false);
  const [idDelete, setIdDelete] = useState(undefined);
  const [nameDelete, setNameDelete] = useState(undefined);
  const [dataSiswa, setDataSiswa] = useState([]);

  const { data, isFetching } = useDataSiswa();
  const { isPending, mutate } = useDeleteSiswa();
  const { invalidateListQuery } = useInvalidate();
  const navigate = useNavigate();
  const { data: user } = useUserLogin();

  const [isDelete] = useAppStore(useShallow((state) => [state.isDelete]));
  const { status, data: dataAlert, handleAlert } = useHandleAlert();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const cariSiswa = (input) => {
    if (data) {
      const dataSiswa = data.filter((siswa) => {
        const nama = siswa.name.toLowerCase().includes(input.toLowerCase());
        const jekel = siswa.jekel.toLowerCase() == input.toLowerCase();

        return nama || jekel;
      });
      if (dataSiswa.length > 0) {
        setDataSiswa(dataSiswa);
      } else {
        handleAlert("info", "Nama siswa tidak ditemukan");
      }
    }
  };

  const deleteSiswa = async () => {
    mutate(idDelete, {
      onSuccess: () => {
        invalidateListQuery("dataSiswa");
        handleAlert("success", "Berhasil menghapus siswa");
        setIsModal(false);
      },
      onError: () => {
        handleAlert("error", "Gagal menghapus siswa");
        setIsModal(false);
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

  const handleNavigateEdit = (id) => {
    if (id == user.id) {
      navigate("/setting");
    } else {
      navigate(`/siswa/edit-siswa/${id}`);
    }
  };

  const handleNavigateDetail = (id) => {
    if (id == user.id) {
      navigate("/siswa/detail-siswa");
    } else {
      navigate(`/siswa/detail-siswa/${id}`);
    }
  };

  useEffect(() => {
    if (query) {
      cariSiswa(query);
    } else {
      setDataSiswa(data);
    }
  }, [query, data]);

  const TableSiswa = ({ columns, dataTable }) => {
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
                      row.image == "" && row.jekel == "laki-laki"
                        ? "/men-user.jfif"
                        : row.image == "" && row.jekel == "perempuan"
                        ? "/women.jfif"
                        : row.image
                    }
                    alt="User Avatar"
                    className="w-[35px] h-[35px] border border-black rounded-full object-cover mx-auto"
                  />
                </td>
                <td className="px-6 py-4 text-white">
                  <p
                    className={`capitalize w-max p-2 border rounded-lg ${
                      row.jabatan === "ketua kelas"
                        ? "bg-[#B80000] text-white"
                        : row.jabatan === "sekretaris"
                        ? "bg-[#40679E] text-white"
                        : row.jabatan === "bendahara"
                        ? "bg-[#0D9276] text-white"
                        : " border-none"
                    }`}
                  >
                    {row.jabatan}
                  </p>
                </td>
                <td className="px-6 py-4">{row.email}</td>
                <td className="px-6 py-4">{row.notel}</td>
                <td className="px-6 py-4 capitalize w-max">
                  {row.tanggal_lahir}
                </td>
                <td className="px-6 py-4 capitalize">
                  <div className="capitalize flex items-center gap-1">
                    {row.jekel == "laki-laki" ? (
                      <IoManSharp size={20} fill="#64B5F6" />
                    ) : (
                      <IoWoman size={20} fill="#F48FB1" />
                    )}
                    <p>{row.jekel}</p>
                  </div>
                </td>
                <td className="px-6 py-4 capitalize">{row.nama_ortu}</td>
                <td className="px-6 py-4 capitalize">{row.alamat}</td>
                <td className="px-6 py-4">
                  {user &&
                    (user.jabatan === "ketua kelas" ||
                    user.jabatan === "sekretaris" ? (
                      <div className="flex gap-2 text-white">
                        <button
                          className="bg-[#dca714] py-1 px-4 rounded-md hover:bg-[#af8936] cursor-pointer"
                          title="detail"
                          onClick={() => handleNavigateDetail(row.id)}
                        >
                          <FaRegEye size={20} />
                        </button>
                        <button
                          className="bg-sky-400 py-1 px-4 rounded-md hover:bg-sky-500"
                          onClick={() => handleNavigateEdit(row.id)}
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
                    ) : (
                      <div className="flex gap-2 text-white">
                        <button
                          className="bg-[#dca714] py-1 px-4 rounded-md hover:bg-[#af8936] cursor-pointer"
                          title="detail"
                          onClick={() => handleNavigateDetail(row.id)}
                        >
                          <FaRegEye size={20} />
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
      <>
        {isModal ? (
          <ModalDelete
            modalData={{
              delete: deleteSiswa,
              close: removeModal,
              data: nameDelete,
              loading: isPending,
            }}
          />
        ) : null}
        {isFetching && <Loading />}
      </>
      <Alert
        status={status}
        type={dataAlert.type}
        message={dataAlert.message}
      />

      <TableSiswa
        columns={[
          "No",
          "Nama",
          "Foto",
          "Jabatan",
          "Email",
          "No. Hp",
          "Tgl. Lahir",
          "Jenis Kelamin",
          "Nama",
          "Kota",
          "Aksi",
        ]}
        dataTable={dataSiswa && dataSiswa.length > 0 ? dataSiswa : []}
      />
    </div>
  );
}
