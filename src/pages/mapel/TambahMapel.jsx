import { useEffect } from "react";
import Container from "../../components/container/Container";

import { useNavigate, useParams } from "react-router-dom";

import Loading from "../../components/loading/Loading";
import { getMapelById } from "../../utils/api";
import useHandleInput from "../../hooks/useHandleInput";
import { useTambahMapel, useUpdateMapel } from "../../services/useMapelQuery";
import { useInvalidate } from "../../services/useCustomQuery";
import Alert from "../../components/alert/alert";
import useHandleAlert from "../../hooks/useHandleAlert";
import { useDataGuru } from "../../services/useGuruQuery";

export default function TambahMapel() {
  const {
    data: mapel,
    handleChange,
    clearInput,
    editData,
  } = useHandleInput({
    mapel: "",
    jam: "",
    durasi: "",
    hari: "",
    nama_guru: "",
  });

  const { data: dataGuru, isFetching } = useDataGuru();
  const { status, data: dataAlert, handleAlert } = useHandleAlert();

  const { invalidateListQuery } = useInvalidate();
  const { mutate, isPending } = useTambahMapel();
  const updateMapel = useUpdateMapel();

  const { id } = useParams();
  const navigate = useNavigate();

  const editMapel = async (id) => {
    const res = await getMapelById(id);
    if (res.status) {
      editData(res.data[0]);
    } else {
      handleAlert("error", res.message);
      editData(mapel);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isNumeric = /^\d+$/.test(mapel.durasi);
    if (!isNumeric)
      return handleAlert("info", "Durasi harus angka, tidak boleh huruf/spasi");
    const newMapel = mapel;
    if (mapel.id) {
      updateMapel.mutate(newMapel, {
        onSuccess: () => {
          invalidateListQuery("dataMapel");
          clearInput();
          navigate("/mapel");
        },
        onError: (error) => {
          console.log({ error });
          handleAlert("error", error.message);
        },
      });
    } else {
      mutate(newMapel, {
        onSuccess: () => {
          invalidateListQuery("dataMapel");
          clearInput();
          navigate("/mapel");
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
      editMapel(id);
    }
  }, []);

  return (
    <Container>
      <Alert
        status={status}
        type={dataAlert.type}
        message={dataAlert.message}
      />
      {isPending || updateMapel.isPending ? <Loading /> : null}
      <div className="w-full h-max pt-[100px] flex flex-col items-center gap-2 justify-center lg:pl-[20%]  pb-[100px]">
        <div className="w-[90%] h-max rounded-md bg-[#ffff]">
          <div className="w-[100%] m-auto h-[60px] border-b border-gray-300 flex items-center p-4">
            <p className=" text-[#4D44B5] font-medium">
              {id ? "Ubah" : "Tambah"} Mata Pelajaran
            </p>
          </div>
          <form
            action=""
            className="w-full h-max  flex flex-col gap-3 p-4 lg:flex-row lg:justify-center lg:gap-0 "
            onSubmit={handleSubmit}
          >
            <div className="w-full h-max flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={"mapel"}>
                  Mata Pelajaran <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="mapel"
                  required
                  value={mapel.mapel}
                  onChange={handleChange}
                  placeholder="Bahasa Indonesia"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={"jam"}>
                  Jam Pelajaran <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="jam"
                  required
                  value={mapel.jam}
                  onChange={handleChange}
                  placeholder="08:00"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={"durasi"}>
                  Durasi Belajar <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="durasi"
                  required
                  value={mapel.durasi}
                  onChange={handleChange}
                  placeholder="60"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="hari">
                  Hari <span className="text-[crimson]">*</span>
                </label>
                <select
                  name="hari"
                  value={mapel.hari}
                  required
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
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="nama_guru">
                  Nama Guru <span className="text-[crimson]">*</span>
                </label>
                <select
                  name="nama_guru"
                  value={mapel.nama_guru}
                  required
                  onChange={handleChange}
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                >
                  <option value="none">Pilih Guru</option>
                  {!isFetching &&
                    dataGuru.map((item) => {
                      return (
                        <option value={item.name} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
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
                      onClick={() => navigate("/mapel")}
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
