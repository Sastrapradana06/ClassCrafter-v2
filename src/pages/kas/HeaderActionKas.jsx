import { useInvalidate } from "../../services/useCustomQuery";

import useHandleAlert from "../../hooks/useHandleAlert";
import Alert from "../../components/alert/alert";
import HeaderAction from "../../components/header-action/HeaderAction";
import { useDataKas, useDeleteKasRecords } from "../../services/useKasQuery";

export default function HeaderActionsKas() {
  const { data: kas } = useDataKas();
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { mutate, isPending } = useDeleteKasRecords();
  const { invalidateListQuery } = useInvalidate();

  const deleteKas = async (selectedId) => {
    if (selectedId.length == 0) {
      return handleAlert("info", "Pilih kas yang ingin di hapus");
    }
    mutate(selectedId, {
      onSuccess: () => {
        invalidateListQuery("dataMapel");
        handleAlert("success", "Berhasil menghapus kas");
      },
      onError: (error) => {
        console.log({ error });
        handleAlert("info", "Gagal menghapus kas");
      },
    });
  };

  const columnsTable = [
    "Nominal (Rp)",
    "Status",
    "Tgl Transaksi",
    "Ditambahkan Oleh",
    "Deskripsi",
  ];
  const columnsData = [
    "Nominal",
    "status",
    "tgl_transaksi",
    "user",
    "deskripsi",
  ];

  return (
    <>
      <Alert
        status={status}
        type={dataAlert.type}
        message={dataAlert.message}
      />
      <HeaderAction
        page={"kas"}
        isPending={isPending}
        funcDelete={deleteKas}
        columnsData={columnsData}
        columnsTable={columnsTable}
        data={kas ? kas : []}
      />
    </>
  );
}
