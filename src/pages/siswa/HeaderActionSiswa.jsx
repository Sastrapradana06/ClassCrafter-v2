import { useInvalidate } from "../../services/useCustomQuery";

import useHandleAlert from "../../hooks/useHandleAlert";
import Alert from "../../components/alert/alert";
import HeaderAction from "../../components/header-action/HeaderAction";
import { useDeleteSiswaRecords } from "../../services/useDataSiswa";

export default function HeaderActionsSiswa() {
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
      />
    </>
  );
}
