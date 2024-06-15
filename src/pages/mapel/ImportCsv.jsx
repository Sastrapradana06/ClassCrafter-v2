import { CiImport } from "react-icons/ci";
import ShowModal from "../../components/modal/ShowModal";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import Alert from "../../components/alert/alert";
import useHandleAlert from "../../hooks/useHandleAlert";
import { useTambahMapel } from "../../services/useMapelQuery";
import Loading from "../../components/loading/Loading";
import { useInvalidate } from "../../services/useCustomQuery";

export default function ImportCsvMapel() {
  const [isModal, setIsModal] = useState(false);
  const [fileImport, setFileImport] = useState(null);
  const [data, setData] = useState(undefined);
  const refFile = useRef(null);

  const { data: alert, status, handleAlert } = useHandleAlert();
  const { mutate, isPending } = useTambahMapel();
  const { invalidateListQuery } = useInvalidate();

  const donwloadContohFile = () => {
    const fileUrl = "/mapel.csv";

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "sastra-pradana-cv.pdf";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const pilihFile = () => {
    refFile.current.click();
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileImport(file);
      const reader = new FileReader();

      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading has failed");
      reader.onload = () => {
        const csvString = reader.result;

        Papa.parse(csvString, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data);
          },
          error: (error) => {
            handleAlert("error", "Gagal mengimpor data");
            console.error("Error parsing CSV:", error);
          },
        });
      };

      reader.readAsText(file);
    } else {
      handleAlert("info", "Pastikan format file berformat .csv");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  const handleImport = () => {
    setIsModal(false);
    mutate(data, {
      onSuccess: () => {
        invalidateListQuery("dataMapel");
        handleAlert("success", "Berhasil mengimpor data");
        setFileImport(null);
        setData(undefined);
      },
      onError: (error) => {
        handleAlert("error", error.message);
        setFileImport(null);
        setData(undefined);
      },
    });
  };

  const Modal = () => {
    return (
      <ShowModal closeModal={() => setIsModal(false)}>
        <div className="w-[90%] lg:w-[50%] h-max bg-white p-4 rounded-md">
          <button
            className="p-2 rounded-md bg-blue-500 font-semibold mb-2 text-[.8rem] hover:bg-blue-600"
            onClick={donwloadContohFile}
          >
            Donwload contoh file
          </button>
          <div
            className="flex items-center justify-center w-full"
            onClick={pilihFile}
            {...getRootProps()}
          >
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-700  hover:bg-gray-800 ${
                isDragActive && "bg-gray-500"
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                {fileImport ? (
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">{fileImport.name}</span>
                  </p>
                ) : (
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}

                <p className="text-xs text-gray-500 dark:text-gray-400">CSV</p>
              </div>
              <input {...getInputProps()} />
              <input
                id="dropzone-file"
                ref={refFile}
                type="file"
                className="hidden"
              />
            </label>
          </div>
          <button
            className="w-full p-2 rounded-md bg-green-500 font-semibold mt-2 text-[.8rem] disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleImport}
            disabled={data == undefined}
          >
            Import
          </button>
        </div>
      </ShowModal>
    );
  };

  return (
    <>
      {isPending ? <Loading /> : null}
      <Alert status={status} type={alert.type} message={alert.message} />

      {isModal && <Modal />}
      <button
        className="p-2 bg-green-500 rounded-lg flex items-center gap-2 text-[.8rem] text-white hover:bg-green-600"
        onClick={() => setIsModal(true)}
      >
        <CiImport size={20} fill="white" />
        Import CSV
      </button>
    </>
  );
}
