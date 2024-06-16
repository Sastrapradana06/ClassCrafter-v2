import ImportCsv from "../../components/import-csv/ImportScv";
import { useTambahMapel } from "../../services/useMapelQuery";

export default function ImportCsvMapel() {
  const { mutate, isPending } = useTambahMapel();

  return <ImportCsv page={"mapel"} mutate={mutate} isPending={isPending} />;
}
