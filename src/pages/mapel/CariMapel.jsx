import { useShallow } from "zustand/react/shallow";
import InputSearch from "../../components/input-search/inputSearch";
import { useDataMapel } from "../../services/useMapelQuery";
import useAppStore from "../../store/store";
import { useEffect, useState } from "react";
import Alert from "../../components/alert/alert";
import useHandleAlert from "../../hooks/useHandleAlert";

export default function CariMapel() {
  const [input, setInput] = useState("");
  const { data } = useDataMapel();

  const [setDataSearchMapel] = useAppStore(
    useShallow((state) => [state.setDataSearchMapel])
  );

  const { data: alert, status, handleAlert } = useHandleAlert();

  const cariMapel = (input) => {
    if (data) {
      const dataMapel = data.filter((mapel) =>
        mapel.mapel.toLowerCase().includes(input.toLowerCase())
      );
      if (dataMapel.length > 0) {
        setDataSearchMapel(dataMapel);
      } else {
        handleAlert("info", "Mata pelajaran tidak ditemukan");
      }
    }
  };

  useEffect(() => {
    if (input == "") {
      setDataSearchMapel([]);
    }
  }, [input]);

  return (
    <>
      <Alert status={status} type={alert.type} message={alert.message} />
      <InputSearch
        placeholder={"Mata Pelajaran"}
        func={cariMapel}
        setState={setInput}
      />
    </>
  );
}
