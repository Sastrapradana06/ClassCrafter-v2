import { useShallow } from "zustand/react/shallow";
import InputSearch from "../../components/input-search/inputSearch";
import useAppStore from "../../store/store";
import { useEffect, useState } from "react";
import Alert from "../../components/alert/alert";
import useHandleAlert from "../../hooks/useHandleAlert";
import { useDataKas } from "../../services/useKasQuery";
import { formatIndonesianDate } from "../../utils/function";

export default function CariKas() {
  const [input, setInput] = useState("");
  const { data } = useDataKas();

  const [setDataSearchKas] = useAppStore(
    useShallow((state) => [state.setDataSearchKas])
  );

  const { data: alert, status, handleAlert } = useHandleAlert();

  const cariKas = (input) => {
    if (data) {
      const dataKas = data.filter((kas) => {
        const byStatus = kas.status == input.toLowerCase();
        const byUser = kas.user == input.toLowerCase();
        const byTanggal = formatIndonesianDate(kas.tgl_transaksi)
          .toLowerCase()
          .includes(input.toLowerCase());

        return byStatus || byUser || byTanggal;
      });
      if (dataKas.length > 0) {
        setDataSearchKas(dataKas);
      } else {
        handleAlert("info", "Data Kas tidak ditemukan");
      }
    }
  };

  useEffect(() => {
    if (input == "") {
      setDataSearchKas([]);
    }
  }, [input]);

  return (
    <>
      <Alert status={status} type={alert.type} message={alert.message} />
      <InputSearch
        placeholder={"Tanggal, status, user"}
        func={cariKas}
        setState={setInput}
      />
    </>
  );
}
