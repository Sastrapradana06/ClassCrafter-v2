import { useEffect } from "react";
import useHandleInput from "../../../hooks/useHandleInput";
import { useInvalidate, useUserLogin } from "../../../services/useCustomQuery";
import Alert from "../../../components/alert/alert";
import useHandleAlert from "../../../hooks/useHandleAlert";
import { useUpdateSiswa } from "../../../services/useDataSiswa";
import Loading from "../../../components/loading/Loading";

export default function FormEditUser() {
  const { data: user } = useUserLogin();

  const {
    data: input,
    handleChange,
    editData,
  } = useHandleInput({
    id: "",
    username: "",
    email: "",
    notel: "",
    tanggal_lahir: "",
    jabatan: "",
    nama_ortu: "",
    alamat: "",
    jekel: "",
    image: "",
  });
  //   console.log({ user, input });

  const { data: alert, status, handleAlert } = useHandleAlert();
  const updateSiswa = useUpdateSiswa();
  const { invalidateListQuery } = useInvalidate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataBody = {
      id: user.id,
      name: input.username,
      image: user.image,
      email: input.email,
      notel: input.notel,
      tanggal_lahir: input.tanggal_lahir.replace(/-/g, " "),
      jabatan: input.jabatan,
      nama_ortu: input.nama_ortu,
      alamat: input.alamat,
      jekel: input.jekel,
    };

    updateSiswa.mutate(dataBody, {
      onSuccess: () => {
        invalidateListQuery("userLogin");
        invalidateListQuery("dataSiswa");
        handleAlert("success", "Profile anda berhasil dirubah");
      },
      onError: (error) => {
        console.log({ error });
        handleAlert("error", error.message);
      },
    });

    console.log({ dataBody });
  };

  useEffect(() => {
    if (user) {
      editData(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {updateSiswa.isPending && <Loading />}
      <Alert status={status} type={alert.type} message={alert.message} />
      <div
        className={`w-full h-max rounded-xl bg-gray-700 flex flex-col items-center py-3 mb-[100px]`}
      >
        <form onSubmit={handleSubmit} className="w-[90%] h-max ">
          <div className="w-full h-max flex flex-col lg:flex-row lg:justify-between gap-4 ">
            <div className="w-full lg:w-[47%] h-max gap-5 flex flex-col">
              <div className="w-full flex flex-col  text-[.9rem]">
                <label htmlFor={"username"} className="text-gray-300">
                  Nama Lengkap <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={handleChange}
                  placeholder="Lorem Ipsum"
                  className="w-full border-b border-purple-500  p-3 outline-none   bg-transparent text-white focus:border-b-2 focus:border-purple-500"
                />
              </div>
              <div className="w-full flex flex-col  text-[.9rem]">
                <label htmlFor={"email"} className="text-gray-300">
                  Email <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  placeholder="halo@example.com"
                  className="w-full border-b border-purple-500  p-3 outline-none   bg-transparent text-white focus:border-b-2 focus:border-purple-500"
                />
              </div>
              <div className="w-full flex flex-col  text-[.9rem]">
                <label htmlFor={"notel"} className="text-gray-300">
                  No Telepon | Wa <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="notel"
                  value={input.notel}
                  onChange={handleChange}
                  placeholder="halo@example.com"
                  className="w-full border-b border-purple-500  p-3 outline-none   bg-transparent text-white focus:border-b-2 focus:border-purple-500"
                />
              </div>
              <div className="w-full flex flex-col text-[.9rem]">
                <label htmlFor={"tanggal_lahir"} className="text-gray-300">
                  Tgl Lahir <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="tanggal_lahir"
                  value={input.tanggal_lahir.replace(/-/g, " ")}
                  onChange={handleChange}
                  placeholder="halo@example.com"
                  className="w-full border-b border-purple-500  p-3 outline-none   bg-transparent text-white focus:border-b-2 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="w-full lg:w-[47%] h-max gap-5 flex flex-col">
              <div className="w-full flex flex-col text-[.9rem]">
                <label htmlFor={"nama_ortu"} className="text-gray-300">
                  Nama ortu<span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="nama_ortu"
                  value={input.nama_ortu}
                  onChange={handleChange}
                  className="w-full border-b border-purple-500  p-3 outline-none   bg-transparent text-white focus:border-b-2 focus:border-purple-500"
                />
              </div>
              <div className="w-full flex flex-col text-[.9rem]">
                <label htmlFor={"alamat"} className="text-gray-300">
                  Alamat<span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="alamat"
                  value={input.alamat}
                  onChange={handleChange}
                  placeholder="halo@example.com"
                  className="w-full border-b border-purple-500  p-3 outline-none   bg-transparent text-white focus:border-b-2 focus:border-purple-500"
                />
              </div>
              <div className="w-full flex flex-col text-[.9rem]">
                <label htmlFor={"jekel"} className="text-gray-300">
                  Jenis Kelamin<span className="text-[crimson]">*</span>
                </label>
                <select
                  name="jekel"
                  value={input.jekel}
                  onChange={handleChange}
                  className="w-full border-b border-purple-500  p-3 outline-none   bg-transparent text-white focus:border-b-2 focus:border-purple-500"
                >
                  <option value="laki-laki">Laki-Laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>
              <div className="w-full flex flex-col text-[.9rem]">
                <label htmlFor={"alamat"} className="text-gray-300">
                  Alamat<span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="alamat"
                  value={input.alamat}
                  onChange={handleChange}
                  placeholder="Medan"
                  className="w-full border-b border-purple-500  p-3 outline-none   bg-transparent text-white focus:border-b-2 focus:border-purple-500"
                />
              </div>
            </div>
          </div>
          <div className="w-max h-max mt-6">
            <button
              className="px-5 py-2 bg-sky-500 text-white text-[.9rem] rounded-full hover:bg-sky-600"
              type="submit"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
