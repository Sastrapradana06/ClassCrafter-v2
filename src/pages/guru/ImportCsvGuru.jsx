import ImportCsv from "../../components/import-csv/ImportScv";
import { useTambahGuruQuery } from "../../services/useGuruQuery";

export default function ImportCsvGuru() {
  const { mutate, isPending } = useTambahGuruQuery();

  return <ImportCsv page={"guru"} mutate={mutate} isPending={isPending} />;
}
