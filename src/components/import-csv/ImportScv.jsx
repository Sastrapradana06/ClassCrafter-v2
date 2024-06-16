/* eslint-disable react/prop-types */
import { useCallback, useRef, useState } from "react";
import useHandleAlert from "../../hooks/useHandleAlert";
import { useInvalidate } from "../../services/useCustomQuery";
import { convertCsvFile } from "../../utils/function";
import { useDropzone } from "react-dropzone";
import ShowModal from "../modal/ShowModal";
import { MdOutlineFileUpload } from "react-icons/md";
import { SlCloudUpload } from "react-icons/sl";
import Loading from "../loading/Loading";
import Alert from "../alert/alert";
import { CiImport } from "react-icons/ci";

export default function ImportCsv({ page, mutate, isPending }) {
  const [isModal, setIsModal] = useState(false);
  const [fileImport, setFileImport] = useState(null);
  const [data, setData] = useState(undefined);
  const refFile = useRef(null);

  const { data: alert, status, handleAlert } = useHandleAlert();
  const { invalidateListQuery } = useInvalidate();

  const donwloadContohFile = () => {
    const fileUrl = `/${page}.csv`;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `${page}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const prosesFile = async (file) => {
    if (file && file.type == "text/csv") {
      const handleDropFile = await convertCsvFile(file);
      if (handleDropFile.status) {
        setData(handleDropFile.data);
        setFileImport(file);
      } else {
        handleAlert("error", handleDropFile.message);
      }
    } else {
      handleAlert("info", "Pastikan format file berformat .csv");
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    await prosesFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  const pilihFile = () => {
    console.log("di klik");
    refFile.current.click();
  };

  const handleFileChange = async (e) => {
    const files = e.target.files[0];
    await prosesFile(files);
  };

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
      <ShowModal
        closeModal={() => {
          setIsModal(false);
          setFileImport(null);
          setData(undefined);
        }}
      >
        <div className="w-[90%] lg:w-[50%] h-max bg-white p-4 rounded-md">
          <div className="w-full h-max flex justify-between mb-3">
            <button
              className="p-2 rounded-md bg-blue-500 font-semibold  text-[.8rem] hover:bg-blue-600"
              onClick={donwloadContohFile}
            >
              Donwload contoh file
            </button>
            <button
              className="p-2 rounded-md bg-red-500 font-semibold  text-[.8rem] hover:bg-red-600 flex gap-2"
              onClick={pilihFile}
            >
              <MdOutlineFileUpload size={20} fill="white" />
              Upload
            </button>
          </div>
          <div className="flex items-center justify-center w-full">
            <div
              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-700  hover:bg-gray-800 ${
                isDragActive && "bg-gray-500"
              }`}
            >
              <div
                className="flex flex-col items-center justify-center pt-5 pb-6"
                {...getRootProps()}
              >
                <SlCloudUpload size={30} className="mb-2 text-gray-400" />
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
              </div>
              <input {...getInputProps()} />
              <input
                ref={refFile}
                onChange={handleFileChange}
                type="file"
                id="file-input"
                className="hidden"
              />
            </div>
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
