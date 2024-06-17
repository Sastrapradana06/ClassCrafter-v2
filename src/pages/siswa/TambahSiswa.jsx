import Container from "../../components/container/Container";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSiswaById } from "../../utils/api";
import Loading from "../../components/loading/Loading";
import useHandleInput from "../../hooks/useHandleInput";
import useHandleAlert from "../../hooks/useHandleAlert";
import Alert from "../../components/alert/alert";
import { useTambahSiswa, useUpdateSiswa } from "../../services/useDataSiswa";
import { useInvalidate } from "../../services/useCustomQuery";

export default function TambahSiswa() {
  const [idUbah, setIdUbah] = useState(undefined);

  const { invalidateListQuery } = useInvalidate();
  const { isPending, mutate } = useTambahSiswa();
  const updateSiswa = useUpdateSiswa();
  const { status, data: dataAlert, handleAlert } = useHandleAlert();
  const { data, handleChange, clearInput, editData } = useHandleInput({
    name: "",
    image: "",
    tanggal_lahir: "",
    email: "",
    notel: "",
    jabatan: "",
    nama_ortu: "",
    alamat: "",
    jekel: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const editSiswa = async (id) => {
    const { data } = await getSiswaById(id);
    editData(data[0]);
    setIdUbah(data[0].id);
  };

  const resetUserData = () => {
    clearInput();
    setIdUbah(undefined);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataSiswa = data;
    if (data.id) {
      updateSiswa.mutate(dataSiswa, {
        onSuccess: () => {
          invalidateListQuery("dataSiswa");
          resetUserData();
          navigate("/siswa");
        },
        onError: (error) => {
          console.log({ error });
          handleAlert("error", error.message);
        },
      });
    } else {
      mutate(dataSiswa, {
        onSuccess: () => {
          invalidateListQuery("dataSiswa");
          resetUserData;
          navigate("/siswa");
        },
        onError: (error) => {
          console.log({ error });
          handleAlert("error", error.message);
        },
      });
    }
  };

  useEffect(() => {
    if (id) {
      editSiswa(id);
    } else {
      clearInput();
    }
  }, [id]);

  return (
    <Container>
      <Alert
        status={status}
        type={dataAlert.type}
        message={dataAlert.message}
      />
      {isPending ? <Loading /> : updateSiswa.isPending ? <Loading /> : null}
      <div className="w-full h-max pt-[80px] flex flex-col items-center gap-2 justify-center lg:pl-[20%]  pb-[100px]">
        <div className="w-[90%] h-max rounded-md bg-[#ffff]">
          <div className="w-[100%] m-auto h-[60px] border-b border-gray-300 flex items-center p-4">
            <p className=" text-[#4D44B5] font-medium">
              {id ? "Edit Siswa" : "Tambah Siswa"}
            </p>
          </div>
          <form
            action=""
            className="w-full h-max  flex flex-col gap-3 p-4 lg:flex-row lg:justify-center lg:gap-0 "
            onSubmit={handleSubmit}
          >
            <div className="w-full h-max flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={data.name}>
                  Nama Lengkap <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Lorem Ipsum"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="tanggal_lahir">
                  Tanggal Lahir <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="tanggal_lahir"
                  value={data.tanggal_lahir}
                  onChange={handleChange}
                  placeholder="06 November 2001"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="email">
                  Email <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="halo@example.com"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="notel">
                  Telepon / Wa <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="notel"
                  value={data.notel}
                  onChange={handleChange}
                  placeholder="08124567...."
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="jekel">
                  Jenis Kelamin <span className="text-[crimson]">*</span>
                </label>
                <select
                  name="jekel"
                  value={data.jekel}
                  onChange={handleChange}
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                >
                  <option value="none">Pilih Jenis Kelamin</option>
                  <option value="laki-laki">Laki-Laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="jabatan">
                  Jabatan <span className="text-[crimson]">*</span>
                </label>
                <select
                  name="jabatan"
                  value={data.jabatan}
                  onChange={handleChange}
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                >
                  <option value="none">Pilih Jabatan</option>
                  <option value="ketua kelas">Ketua Kelas</option>
                  <option value="sekretaris">Sekretaris</option>
                  <option value="bendahara">Bendahara</option>
                  <option value="member">Member</option>
                </select>
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="nama_ortu">
                  Nama Ortu <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="nama_ortu"
                  value={data.nama_ortu}
                  onChange={handleChange}
                  placeholder="ibu/ayah"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="alamat">
                  Alamat <span className="text-[crimson]">*</span>
                </label>
                <textarea
                  type="text"
                  name="alamat"
                  value={data.alamat}
                  onChange={handleChange}
                  placeholder="Medan"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full">
                {idUbah ? (
                  <>
                    <button className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]">
                      Ubah
                    </button>
                    <button
                      className="ml-2 py-[6px] px-4 text-[.8rem] bg-[#dc143cd5] text-white rounded-lg hover:bg-[crimson]"
                      onClick={() => navigate("/siswa")}
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <button className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]">
                    Simpan
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
