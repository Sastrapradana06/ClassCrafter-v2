import { useInvalidate } from "../../services/useCustomQuery";

import useHandleAlert from "../../hooks/useHandleAlert";
import Alert from "../../components/alert/alert";
import { useDeleteMapelRecords } from "../../services/useMapelQuery";
import HeaderAction from "../../components/header-action/HeaderAction";

export default function HeaderActionsMapel() {
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { mutate, isPending } = useDeleteMapelRecords();
  const { invalidateListQuery } = useInvalidate();

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
      />
    </>
  );
}
