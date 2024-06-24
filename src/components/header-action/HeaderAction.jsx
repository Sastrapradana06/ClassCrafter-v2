/* eslint-disable react/prop-types */
import { CiCirclePlus } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUserLogin } from "../../services/useCustomQuery";
import useAppStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import ImportCsvGuru from "../../pages/guru/ImportCsvGuru";
import ImportCsvMapel from "../../pages/mapel/ImportCsv";

import Loading from "../loading/Loading";
import { useEffect } from "react";
import ImportCsvSiswa from "../../pages/siswa/ImportCsvSiswa";
import { FaFileExport } from "react-icons/fa6";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ExportPdf from "../react-pdf/ExportPdf";
export default function HeaderAction({
  page,
  isPending,
  funcDelete,
  columnsTable,
  columnsData,
  data,
}) {
  const navigate = useNavigate();
  const { data: user } = useUserLogin();
  const [isDelete, setIsDelete, selectedId, deleteSelectedId] = useAppStore(
    useShallow((state) => [
      state.isDelete,
      state.setIsDelete,
      state.selectedId,
      state.deleteSelectedId,
    ])
  );

  const handleDelete = async () => {
    if (selectedId.length > 0) {
      deleteSelectedId();
      setIsDelete(false);
    }
    await funcDelete(selectedId);
  };

  const componentImportCsv = {
    guru: <ImportCsvGuru />,
    mapel: <ImportCsvMapel />,
    siswa: <ImportCsvSiswa />,
  };

  useEffect(() => {
    deleteSelectedId();
    setIsDelete(false);
  }, []);

  return (
    <>
      {isPending && <Loading />}

      <div className="w-full h-max  flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
        <h1 className="text-[1.2rem] text-black font-semibold tracking-[2px] capitalize">
          Data {page}
        </h1>
        {(user?.jabatan == "ketua kelas" || user?.jabatan == "sekretaris") && (
          <div className="w-max flex gap-1 lg:gap-3 items-center">
            <div>
              <PDFDownloadLink
                document={
                  <ExportPdf
                    columnsTable={columnsTable}
                    columnsData={columnsData}
                    data={data}
                    page={page}
                  />
                }
                fileName={page}
              >
                <button
                  className="p-2 bg-purple-500 text-white text-[.9rem] rounded-md flex gap-2 items-center hover:bg-purple-700"
                  title="donwload pdf"
                >
                  <FaFileExport size={20} className="text-purple-200" />
                  <p>Cetak</p>
                </button>
                {/* {({ loading }) =>
                  loading ? (
                    <button
                      type="button"
                      className="p-2 bg-purple-500 text-white text-[.9rem] rounded-md flex gap-2 items-center hover:bg-purple-700"
                      disabled
                    >
                      <FaSpinner
                        className="animate-spin"
                        size={18}
                        fill="white"
                      />
                    </button>
                  ) : (
                    <button
                      className="p-2 bg-purple-500 text-white text-[.9rem] rounded-md flex gap-2 items-center hover:bg-purple-700"
                      title="donwload pdf"
                    >
                      <FaFileExport size={20} className="text-purple-200" />
                      <p>Cetak</p>
                    </button>
                  )
                } */}
              </PDFDownloadLink>
            </div>

            {page != "kas" && componentImportCsv[page]}
            {isDelete ? (
              <button
                className="p-2 bg-red-700 text-white text-[.9rem] rounded-md flex gap-2 items-center hover:bg-red-800"
                title="delete data"
                onClick={handleDelete}
              >
                <MdDelete size={20} className="text-red-500" />
                <p>Delete All</p>
              </button>
            ) : (
              <button
                className="p-2 bg-red-300 text-white text-[.9rem] rounded-md flex gap-2 items-center hover:bg-red-700"
                title="delete data"
                onClick={() => setIsDelete(true)}
              >
                <MdDelete size={20} className="text-red-500" />
                <p>Delete</p>
              </button>
            )}

            <button
              className="p-2 bg-sky-500 rounded-xl"
              title={isDelete ? "close" : "tambahkan data"}
              onClick={
                isDelete
                  ? () => {
                      setIsDelete(false);
                      deleteSelectedId();
                    }
                  : () => {
                      page != "kas"
                        ? navigate(`/tambah-${page}`)
                        : navigate(`/buat-transaksi`);
                    }
              }
            >
              {isDelete ? (
                <IoClose fill="white" className="text-[1.2rem] font-bold" />
              ) : (
                <CiCirclePlus
                  fill="white"
                  className="text-[1.2rem] font-bold"
                />
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
