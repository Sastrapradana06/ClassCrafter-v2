import { useEffect } from "react";
import Container from "../../components/container/Container";

import { useNavigate, useParams } from "react-router-dom";

import Loading from "../../components/loading/Loading";
import { getKasById } from "../../utils/api";

import useHandleInput from "../../hooks/useHandleInput";
import { useTambahKas, useUpdateKas } from "../../services/useKasQuery";
import { useInvalidate, useUserLogin } from "../../services/useCustomQuery";
import Alert from "../../components/alert/alert";
import useHandleAlert from "../../hooks/useHandleAlert";

export default function BuatTransaksi() {
  const { data, handleChange, clearInput, editData } = useHandleInput({
    nominal: "",
    status: "masuk",
    tgl_transaksi: "",
  });
  const { status, data: dataAlert, handleAlert } = useHandleAlert();

  const { data: user } = useUserLogin();
  const { invalidateListQuery } = useInvalidate();
  const { mutate, isPending } = useTambahKas();
  const updateKas = useUpdateKas();

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.id) {
      const dataInput = {
        id: data.id,
        nominal: data.nominal,
        status: data.status,
        tgl_transaksi: data.tgl_transaksi,
        user: user.username,
        jabatan: user.jabatan,
        deskripsi: data.deskripsi,
      };

      updateKas.mutate(dataInput, {
        onSuccess: () => {
          invalidateListQuery("dataKas");
          handleAlert("success", "Transaksi Berhasil Dirubah");
          clearInput();
          navigate("/kas");
        },
        onError: (error) => {
          handleAlert("error", error.message);
        },
      });
    } else {
      const dataInput = { ...data, user: user.username, jabatan: user.jabatan };
      mutate(dataInput, {
        onSuccess: () => {
          invalidateListQuery("dataKas");
          handleAlert("success", "Transaksi Berhasil");
          clearInput();
          navigate("/kas");
        },
        onError: (error) => {
          handleAlert("error", error);
        },
      });
    }
  };

  const editKas = async (id) => {
    const res = await getKasById(id);
    if (res.status) {
      editData(res.data[0]);
    } else {
      editData(data);
    }
  };

  useEffect(() => {
    if (id) {
      editKas(id);
    }
  }, []);

  return (
    <Container>
      <Alert
        status={status}
        type={dataAlert.type}
        message={dataAlert.message}
      />
      {isPending || updateKas.isPending ? <Loading /> : null}
      <div className="w-full h-max pt-[130px] flex flex-col items-center gap-2 justify-center lg:pl-[20%]  pb-[100px]">
        <div className="w-[90%] h-max rounded-md bg-[#ffff]">
          <div className="w-[100%] m-auto h-[60px] border-b border-gray-300 flex items-center p-4">
            <p className=" text-[#4D44B5] font-medium">
              {id ? "Ubah" : "Buat"} Transaksi Kas
            </p>
          </div>
          <form
            action=""
            className="w-full h-max  flex flex-col gap-3 p-4 lg:flex-row lg:justify-center lg:gap-0 "
            onSubmit={handleSubmit}
          >
            <div className="w-full h-max flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={"jumlah"}>
                  Jumlah <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="nominal"
                  required
                  value={data.nominal}
                  onChange={handleChange}
                  placeholder="120000"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={"tanggal"}>
                  Tanggal Transaksi <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="date"
                  name="tgl_transaksi"
                  value={data.tgl_transaksi}
                  onChange={handleChange}
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                  required
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="status">
                  Status Transaksi <span className="text-[crimson]">*</span>
                </label>
                <select
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                  // disabled={idUbah}
                >
                  <option value="none">Pilih</option>
                  <option value="masuk">Masuk</option>
                  <option value="keluar">Keluar</option>
                </select>
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={"deskripsi"}>
                  Deskripsi <span className="text-[crimson]">*</span>
                </label>
                <textarea
                  name="deskripsi"
                  value={data.deskripsi}
                  required
                  onChange={handleChange}
                  placeholder="Masukkan deskripsi di sini"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                  rows="4"
                />
              </div>
              <div className="w-full">
                {id ? (
                  <>
                    <button className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]">
                      Ubah
                    </button>
                    <button
                      className="ml-2 py-[6px] px-4 text-[.8rem] bg-[#dc143cd5] text-white rounded-lg hover:bg-[crimson]"
                      onClick={() => navigate("/kas")}
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
