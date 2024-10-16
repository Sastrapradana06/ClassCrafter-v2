import Alert from "../../components/alert/alert";
import Container from "../../components/container/Container";
import Loading from "../../components/loading/Loading";
import useHandleAlert from "../../hooks/useHandleAlert";
import useHandleInput from "../../hooks/useHandleInput";
import { useSendNotif } from "../../services/useNotifQuery";

export default function Notifikasi() {
  const { data, handleChange, clearInput } = useHandleInput({
    tema: "",
    judul: "",
    catatan: "",
  });

  const { status, data: dataAlert, handleAlert } = useHandleAlert();

  const { mutate, isPending } = useSendNotif();

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataNotf = data;

    mutate(dataNotf, {
      onSuccess: (res) => {
        handleAlert("success", res.message);
        clearInput();
      },
      onError: (error) => {
        console.log({ error });
        handleAlert("error", "Terjadi kesalahan saat mengirim notifikasi");
      },
    });
  };

  return (
    <Container>
      <>
        <Alert
          status={status}
          type={dataAlert.type}
          message={dataAlert.message}
        />
        {isPending && <Loading />}
      </>
      <div className="w-full h-max pt-[100px] flex flex-col items-center gap-2 justify-center lg:pl-[20%]  pb-[100px]">
        <div className="w-[90%] h-max rounded-md bg-[#ffff]">
          <div className="w-[90%] h-max rounded-md bg-[#ffff]">
            <div className="w-[100%] m-auto h-[60px] border-b border-gray-300 flex items-center p-4">
              <p className=" text-[#4D44B5] font-medium">
                Buat email notifikasi
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full h-max  flex flex-col gap-3 p-4 lg:flex-row lg:justify-center lg:gap-0 "
          >
            <div className="w-full h-max flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="tema">
                  Tema<span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="tema"
                  value={data.tema}
                  onChange={handleChange}
                  placeholder="Acara/Pengumuman"
                  required
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="judul">
                  Judul <span className="text-[crimson]">*</span>
                </label>
                <input
                  type="text"
                  name="judul"
                  value={data.judul}
                  onChange={handleChange}
                  placeholder="Hari Kemerdekaan"
                  required
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>

              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="catatan">
                  Catatan <span className="text-[crimson]">*</span>
                </label>
                <textarea
                  type="text"
                  name="catatan"
                  value={data.catatan}
                  onChange={handleChange}
                  placeholder="Buat catatan"
                  required
                  className="w-full h-[150px] border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full">
                <button
                  className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]"
                  type="submit"
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
