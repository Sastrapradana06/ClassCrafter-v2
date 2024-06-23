import { useInvalidate } from "../../services/useCustomQuery";

import useHandleAlert from "../../hooks/useHandleAlert";
import Alert from "../../components/alert/alert";
import {
  useDataMapel,
  useDeleteMapelRecords,
} from "../../services/useMapelQuery";
import HeaderAction from "../../components/header-action/HeaderAction";
import { exportToPDF } from "../../utils/function";

export default function HeaderActionsMapel() {
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { mutate, isPending } = useDeleteMapelRecords();
  const { invalidateListQuery } = useInvalidate();
  const { data: mapel } = useDataMapel();

  const deleteMapel = async (selectedId) => {
    if (selectedId.length == 0) {
      return handleAlert("info", "Pilih mata pelajaran yang ingin di hapus");
    }
    mutate(selectedId, {
      onSuccess: () => {
        invalidateListQuery("dataMapel");
        handleAlert("success", "Berhasil menghapus mata pelajaran");
      },
      onError: (error) => {
        console.log({ error });
        handleAlert("info", "Gagal menghapus mata pelajaran");
      },
    });
  };
  const columnsTable = [
    "Mata Pelajaran",
    "Jam",
    "Durasi (Menit)",
    "Hari",
    "Nama Guru",
  ];
  const columnsData = ["Mapel", "Jam", "Durasi", "Hari", "Nama_Guru"];

  const handleExportExel = async () => {
    if (!mapel || mapel.length == 0)
      return handleAlert("info", "Tidak ada data mata pelajaran");
    await exportToPDF(columnsTable, columnsData, mapel, "Data Mapel");
  };

  return (
    <>
      <Alert
        status={status}
        type={dataAlert.type}
        message={dataAlert.message}
      />
      <HeaderAction
        page={"mapel"}
        isPending={isPending}
        funcDelete={deleteMapel}
        funcExport={handleExportExel}
      />
    </>
  );
}
