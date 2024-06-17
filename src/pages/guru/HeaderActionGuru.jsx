import Alert from "../../components/alert/alert";
import HeaderAction from "../../components/header-action/HeaderAction";
import useHandleAlert from "../../hooks/useHandleAlert";
import { useInvalidate } from "../../services/useCustomQuery";
import { useDeleteGuruRecords } from "../../services/useGuruQuery";

export default function HeaderActionGuru() {
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { mutate, isPending } = useDeleteGuruRecords();
  const { invalidateListQuery } = useInvalidate();

  const deleteGuru = async (selectedId) => {
    if (selectedId.length == 0) {
      return handleAlert("info", "Pilih guru yang ingin di hapus");
    }
    mutate(selectedId, {
      onSuccess: () => {
        invalidateListQuery("dataGuru");
        handleAlert("success", "Berhasil menghapus guru");
      },
      onError: (error) => {
        console.log({ error });
        handleAlert("info", "Gagal menghapus guru");
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
        page={"guru"}
        isPending={isPending}
        funcDelete={deleteGuru}
      />
    </>
  );
}
