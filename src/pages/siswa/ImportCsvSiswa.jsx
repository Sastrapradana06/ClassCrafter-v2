import ImportCsv from "../../components/import-csv/ImportScv";
import { useTambahSiswa } from "../../services/useDataSiswa";

export default function ImportCsvSiswa() {
  const { mutate, isPending } = useTambahSiswa();

  return <ImportCsv page={"siswa"} mutate={mutate} isPending={isPending} />;
}
