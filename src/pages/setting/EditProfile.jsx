import { useCallback, useEffect, useRef, useState } from "react";
import Container from "../../components/container/Container";
import { useDropzone } from "react-dropzone";
import {
  useDeleteImage,
  useInvalidate,
  useUploadUserProfile,
  useUserLogin,
} from "../../services/useCustomQuery";
import Alert from "../../components/alert/alert";
import useHandleAlert from "../../hooks/useHandleAlert";
import Loading from "../../components/loading/Loading";
import { getToken } from "../../utils/function";

export default function EditProfile() {
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
    <Container>
      <Alert status={status} type={alert.type} message={alert.message} />
      {uploadProfile.isPending || deleteImg.isPending ? <Loading /> : null}
      <div className="w-full h-[100vh] pt-[70px] lg:pl-[20%]">
        <div className="w-[90%] h-max m-auto flex flex-col items-center gap-4">
          <h1 className="text-[1.3rem] text-[#4d44D5] font-semibold tracking-[2px]">
            Edit Profile
          </h1>
          <div className="w-full h-max rounded-lg bg-[#404556] flex flex-col items-center p-2">
            <div
              className={`w-full h-max   p-2 rounded-lg ${
                isDragActive && "border border-gray-300"
              }`}
              {...getRootProps()}
            >
              <input {...getInputProps()} />

              {isDragActive ? (
                <img
                  src={imgUser}
                  alt="profile-user"
                  className="w-[100px] h-[100px] rounded-full object-cover m-auto p-1 ring-2 ring-gray-500"
                />
              ) : (
                <img
                  src={imgUser}
                  alt="profile-user"
                  className="w-[100px] h-[100px] rounded-full object-cover m-auto p-1 ring-2 ring-gray-500"
                />
              )}

              <div className="w-max h-max flex gap-2 m-auto">
                <button
                  className="bg-red-500 px-3 py-1 rounded-md text-white m-auto mt-3 text-[.8rem] block hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
                  disabled={user?.image == ""}
                  onClick={handleDeleteImg}
                >
                  Delete
                </button>
                <button
                  className="bg-green-500 px-3 py-1 rounded-md text-white m-auto mt-3 text-[.8rem] block hover:bg-green-600"
                  onClick={handleFoto}
                >
                  Pilih File
                </button>
              </div>
              <p className="italic text-center text-[.7rem] text-gray-200">
                * Klik File atau Drop image disini
              </p>
            </div>
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
                className="bg-blue-500 px-3 py-1 rounded-md text-white m-auto mt-3 text-[.8rem] block hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                disabled={fileImg == null}
                type="submit"
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}
