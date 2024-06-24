import { useInvalidate } from "../../services/useCustomQuery";

import useHandleAlert from "../../hooks/useHandleAlert";
import Alert from "../../components/alert/alert";
import HeaderAction from "../../components/header-action/HeaderAction";
import {
  useDataSiswa,
  useDeleteSiswaRecords,
} from "../../services/useDataSiswa";
import { exportToPDF } from "../../utils/function";

export default function HeaderActionsSiswa() {
  const { data: siswa } = useDataSiswa();
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { mutate, isPending } = useDeleteSiswaRecords();
  const { invalidateListQuery } = useInvalidate();

  const deleteMapel = async (selectedId) => {
    if (selectedId.length == 0) {
      return handleAlert("info", "Pilih siswa yang ingin di hapus");
    }
    mutate(selectedId, {
      onSuccess: () => {
        invalidateListQuery("dataSiswa");
        handleAlert("success", "Berhasil menghapus siswa");
      },
      onError: (error) => {
        console.log({ error });
        handleAlert("info", "Gagal menghapus siswa");
      },
    });
  };

  const columnsTable = [
    "Nama Siswa",
    "Email",
    "No Hp/Wa",
    "Tgl Lahir",
    "Jekel",
    "Alamat",
    "Orang Tua",
  ];
  const columnsData = [
    "name",
    "email",
    "notel",
    "tanggal_lahir",
    "jekel",
    "alamat",
    "nama_ortu",
  ];

  const handleExportExel = async () => {
    if (!siswa || siswa.length == 0)
      return handleAlert("info", "Tidak ada data mata pelajaran");
    await exportToPDF(columnsTable, columnsData, siswa, "Data siswa");
  };

  return (
    <>
      <Alert
        status={status}
        type={dataAlert.type}
        message={dataAlert.message}
      />
      <HeaderAction
        page={"siswa"}
        isPending={isPending}
        funcDelete={deleteMapel}
        columnsData={columnsData}
        columnsTable={columnsTable}
        data={siswa ? siswa : []}
      />
    </>
  );
}
