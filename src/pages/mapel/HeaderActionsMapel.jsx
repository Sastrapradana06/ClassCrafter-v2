import { useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { useInvalidate, useUserLogin } from "../../services/useCustomQuery";
import ImportCsvMapel from "./ImportCsv";
import { MdDelete } from "react-icons/md";
import useAppStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import { IoClose } from "react-icons/io5";
import useHandleAlert from "../../hooks/useHandleAlert";
import Alert from "../../components/alert/alert";
import { useDeleteMapelRecords } from "../../services/useMapelQuery";
import Loading from "../../components/loading/Loading";

export default function HeaderActionsMapel() {
  const { data: user } = useUserLogin();

  const navigate = useNavigate();
  const [isDelete, setIsDelete, selectedId, deleteSelectedId] = useAppStore(
    useShallow((state) => [
      state.isDelete,
      state.setIsDelete,
      state.selectedId,
      state.deleteSelectedId,
    ])
  );

  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { mutate, isPending } = useDeleteMapelRecords();
  const { invalidateListQuery } = useInvalidate();

  const deleteMapel = async () => {
    if (selectedId.length == 0) {
      return handleAlert("info", "Pilih mata pelajaran yang ingin di hapus");
    }
    mutate(selectedId, {
      onSuccess: () => {
        invalidateListQuery("dataMapel");
        handleAlert("success", "Berhasil menghapus mata pelajaran");
        deleteSelectedId();
        setIsDelete(false);
      },
      onError: (error) => {
        console.log({ error });
        handleAlert("info", "Gagal menghapus mata pelajaran");
      },
    });
  };

  return (
    <>
      <Alert
        status={status}
        type={dataAlert.type}
        message={dataAlert.message}
      />
      {isPending && <Loading />}
      <div className="w-full h-max  flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
        <h1 className="text-[1.2rem] text-black font-semibold tracking-[2px]">
          Data Mapel
        </h1>
        {(user?.jabatan == "ketua kelas" || user?.jabatan == "sekretaris") && (
          <div className="w-max flex gap-3 items-center">
            <ImportCsvMapel />
            {isDelete ? (
              <button
                className="p-2 bg-red-700 text-white text-[.9rem] rounded-md flex gap-2 items-center hover:bg-red-800"
                title="delete data"
                onClick={deleteMapel}
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
                  : () => navigate("/tambah-mapel")
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
