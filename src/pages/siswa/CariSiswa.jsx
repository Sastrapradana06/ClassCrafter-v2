import { useShallow } from "zustand/react/shallow";
import InputSearch from "../../components/input-search/inputSearch";
import useAppStore from "../../store/store";
import { useEffect, useState } from "react";
import Alert from "../../components/alert/alert";
import useHandleAlert from "../../hooks/useHandleAlert";
import { useDataSiswa } from "../../services/useDataSiswa";

export default function CariSiswa() {
  const [input, setInput] = useState("");
  const { data } = useDataSiswa();

  const [setDataSearchSiswa] = useAppStore(
    useShallow((state) => [state.setDataSearchSiswa])
  );

  const { data: alert, status, handleAlert } = useHandleAlert();

  const cariSiswa = (input) => {
    if (data) {
      const dataSiswa = data.filter((siswa) =>
        siswa.name.toLowerCase().includes(input.toLowerCase())
      );
      if (dataSiswa.length > 0) {
        setDataSearchSiswa(dataSiswa);
      } else {
        handleAlert("info", "Nama siswa tidak ditemukan");
      }
    }
  };

  useEffect(() => {
    if (input == "") {
      setDataSearchSiswa([]);
    }
  }, [input]);

  return (
    <>
      <Alert status={status} type={alert.type} message={alert.message} />
      <InputSearch
        placeholder={"Nama Siswa"}
        func={cariSiswa}
        setState={setInput}
      />
    </>
  );
}
