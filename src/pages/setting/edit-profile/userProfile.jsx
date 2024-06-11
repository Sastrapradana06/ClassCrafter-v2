import { useCallback, useEffect, useRef, useState } from "react";
import Alert from "../../../components/alert/alert";
import {
  useDeleteImage,
  useInvalidate,
  useUploadUserProfile,
  useUserLogin,
} from "../../../services/useCustomQuery";
import useHandleAlert from "../../../hooks/useHandleAlert";
import { useDropzone } from "react-dropzone";
import { getToken } from "../../../utils/function";
import Loading from "../../../components/loading/Loading";

export default function UserProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const [imgUser, setImgUser] = useState("");
  const [fileImg, setFileImg] = useState(null);
  const fileInputRef = useRef(null);

  const { invalidateListQuery } = useInvalidate();
  const uploadProfile = useUploadUserProfile();
  const deleteImg = useDeleteImage();
  const { data: user } = useUserLogin();
  const { data: alert, status, handleAlert } = useHandleAlert();

  const handleFoto = (e) => {
    console.log("di klik");
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const avatarFile = e.target.files[0];
    setFileImg(avatarFile);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileImg(file);
      const imageUrl = URL.createObjectURL(file);
      setImgUser(imageUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("jalan");
    const formData = new FormData();
    const id = getToken("idUser");
    formData.append("idUser", parseInt(id));
    formData.append("file", fileImg);
    formData.append("urlImgLama", user.image);
    uploadProfile.mutate(formData, {
      onSuccess: (data) => {
        const newData = data[0];
        invalidateListQuery("userLogin");
        handleAlert("success", "Berhasil update foto profil");
        setImgUser(newData.image);
        setFileImg(null);
        setIsEdit(false);
      },
      onError: (error) => {
        console.log({ error });
        handleAlert("error", error.message);
      },
    });
  };

  const handleDeleteImg = () => {
    const data = {
      idUser: user.id,
      urlImgLama: user.image,
    };
    deleteImg.mutate(data, {
      onSuccess: () => {
        invalidateListQuery("userLogin");
        handleAlert("success", "Berhasil hapus image profil");
      },
      onError: (error) => {
        console.log({ error });
        handleAlert("error", error.message);
      },
    });
  };

  useEffect(() => {
    if (user?.image != "") {
      setImgUser(user?.image);
    } else {
      if (user?.jekel === "laki-laki") {
        setImgUser("/men-user.jfif");
      } else {
        setImgUser("/women.jfif");
      }
    }
  }, [user]);
  return (
    <>
      <Alert status={status} type={alert.type} message={alert.message} />
      {uploadProfile.isPending || deleteImg.isPending ? <Loading /> : null}
      <div
        className={`w-full h-max rounded-xl bg-gray-700 flex flex-col items-center py-3`}
      >
        <div
          className={`w-full h-max   p-2 rounded-lg ${
            isDragActive && "ring-2 ring-gray-300"
          }`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          {isDragActive ? (
            <img
              src={imgUser}
              alt="profile-user"
              className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-full object-cover m-auto p-1 ring-2 ring-white"
            />
          ) : (
            <img
              src={imgUser}
              alt="profile-user"
              className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-full object-cover m-auto p-1 ring-2 ring-white"
            />
          )}

          {!isEdit ? (
            <button
              className="bg-purple-500 px-3 py-1 lg:py-2 lg:px-4 lg:text-[.9rem] rounded-md text-white m-auto mt-3 text-[.8rem] block hover:bg-purple-600"
              onClick={() => setIsEdit(true)}
            >
              Edit Photo
            </button>
          ) : (
            <>
              <div className="w-max h-max flex gap-2 m-auto">
                <button
                  className="bg-red-500 px-3 py-1 lg:py-2 lg:px-4 lg:text-[.9rem] rounded-md text-white m-auto mt-3 text-[.8rem] block hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
                  disabled={user?.image == ""}
                  onClick={handleDeleteImg}
                >
                  Delete
                </button>
                <button
                  className="bg-green-500 px-3 py-1 lg:py-2 lg:px-4 lg:text-[.9rem] rounded-md text-white m-auto mt-3 text-[.8rem] block hover:bg-green-600"
                  onClick={handleFoto}
                >
                  Pilih File
                </button>
              </div>
              <p className="italic text-center text-[.7rem] text-white lg:text-[.8rem]">
                * Klik File atau Drop image disini
              </p>
            </>
          )}
        </div>
        {isEdit && (
          <form
            className={`w-full h-max
              }`}
            onSubmit={handleSubmit}
          >
            <input
              type="file"
              id="file-input"
              className="file-input hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              className="bg-blue-500 px-3 py-1 lg:px-5 lg:py-2 rounded-md text-white m-auto mt-3 text-[.8rem] lg:text-[.9rem] block hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={fileImg == null}
              type="submit"
            >
              Simpan Perubahan
            </button>
          </form>
        )}
      </div>
    </>
  );
}
