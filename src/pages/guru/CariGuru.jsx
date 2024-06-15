import { useShallow } from "zustand/react/shallow";
import InputSearch from "../../components/input-search/inputSearch";
import useAppStore from "../../store/store";
import { useEffect, useState } from "react";
import Alert from "../../components/alert/alert";
import useHandleAlert from "../../hooks/useHandleAlert";
import { useDataGuru } from "../../services/useGuruQuery";

export default function CariGuru() {
  const [input, setInput] = useState("");
  const { data } = useDataGuru();

  const [setDataSearchGuru] = useAppStore(
    useShallow((state) => [state.setDataSearchGuru])
  );

  const { data: alert, status, handleAlert } = useHandleAlert();

  const cariGuru = (input) => {
    if (data) {
      const dataGuru = data.filter((guru) =>
        guru.name.toLowerCase().includes(input.toLowerCase())
      );
      if (dataGuru.length > 0) {
        setDataSearchGuru(dataGuru);
      } else {
        // setDataSearchGuru([]);
        handleAlert("info", "Nama guru tidak ditemukan");
      }
    }
  };

  useEffect(() => {
    if (input == "") {
      setDataSearchGuru([]);
    }
  }, [input]);

  return (
    <>
      <Alert status={status} type={alert.type} message={alert.message} />
      <InputSearch
        placeholder={"Nama guru"}
        func={cariGuru}
        setState={setInput}
      />
    </>
  );
}
