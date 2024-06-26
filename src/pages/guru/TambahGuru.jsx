import { useEffect } from "react";
import Container from "../../components/container/Container";

import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import useHandleInput from "../../hooks/useHandleInput";
import {
  useTambahGuruQuery,
  useUpdateGuruQuery,
} from "../../services/useGuruQuery";
import { useInvalidate } from "../../services/useCustomQuery";
import Alert from "../../components/alert/alert";
import useHandleAlert from "../../hooks/useHandleAlert";
import { getGuruById } from "../../utils/api";

export default function TambahGuru() {
  const {
    data: dataGuru,
    handleChange,
    clearInput,
    editData,
  } = useHandleInput({
    name: "",
    jekel: "laki-laki",
    mapel: "",
    jadwal: "",
  });

  const { invalidateListQuery } = useInvalidate();
  const { mutate, isPending } = useTambahGuruQuery();
  const updateGuru = useUpdateGuruQuery();
  const { status, data: dataAlert, handleAlert } = useHandleAlert();

  const { id } = useParams();
  const navigate = useNavigate();

  const editGuru = async (id) => {
    const res = await getGuruById(id);
    if (res.status) {
      editData(res.data[0]);
    } else {
      handleAlert("error", res.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDataGuru = dataGuru;
    console.log({ newDataGuru });
    if (dataGuru.id) {
      updateGuru.mutate(newDataGuru, {
        onSuccess: () => {
          invalidateListQuery("dataGuru");
          clearInput();
          navigate("/guru");
        },
        onError: (error) => {
          console.log({ error });
          handleAlert("error", "Gagal mengubah data guru");
        },
      });
    } else {
      mutate(newDataGuru, {
        onSuccess: () => {
          invalidateListQuery("dataGuru");
          clearInput();
          navigate("/guru");
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
      editGuru(id);
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
      {isPending || updateGuru.isPending ? <Loading /> : null}
      <div className="w-full h-max pt-[80px] flex flex-col items-center gap-2 justify-center lg:pl-[20%]  pb-[100px]">
        <div className="w-[90%] h-max rounded-md bg-[#ffff]">
          <div className="w-[100%] m-auto h-[60px] border-b border-gray-300 flex items-center p-4">
            <p className=" text-[#4D44B5] font-medium">
              {id ? "Edit Guru" : "Tambah Guru"}
            </p>
          </div>
          <form
            action=""
            className="w-full h-max  flex flex-col gap-3 p-4 lg:flex-row lg:justify-center lg:gap-0 "
            onSubmit={handleSubmit}
          >
            <div className="w-full h-max flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={"nama_guru"}>
                  Nama Guru <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={dataGuru.name}
                  onChange={handleChange}
                  placeholder="Lorem Ipsum"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="mapel">
                  Mata Pelajaran <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="mapel"
                  required
                  value={dataGuru.mapel}
                  onChange={handleChange}
                  placeholder="Bahasa Indonesia"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>

              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <div className="w-full flex flex-col gap-2 text-[.9rem]">
                  <label htmlFor="hari">
                    Hari <span className="text-[crimson]">*</span>
                  </label>
                  <select
                    name="jadwal"
                    required
                    value={dataGuru.jadwal}
                    onChange={handleChange}
                    className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                  >
                    <option value="none">Pilih Hari</option>
                    <option value="senin">Senin</option>
                    <option value="selasa">Selasa</option>
                    <option value="rabu">Rabu</option>
                    <option value="kamis">Kamis</option>
                    <option value="jumat">Jumat</option>
                    <option value="sabtu">Sabtu</option>
                  </select>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="jekel">
                  Jenis Kelamin <span className="text-[crimson]">*</span>
                </label>
                <select
                  name="jekel"
                  required
                  value={dataGuru.jekel}
                  onChange={handleChange}
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                >
                  <option value="none" disabled>
                    Pilih Jenis Kelamin
                  </option>
                  <option value="laki-laki">Laki-Laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>
              <div className="w-full">
                {id ? (
                  <>
                    <button className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]">
                      Ubah
                    </button>
                    <button
                      className="ml-2 py-[6px] px-4 text-[.8rem] bg-[#dc143cd5] text-white rounded-lg hover:bg-[crimson]"
                      onClick={() => navigate("/guru")}
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <button
                    className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]"
                    type="submit"
                  >
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
