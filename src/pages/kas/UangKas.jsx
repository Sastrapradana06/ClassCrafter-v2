import { CiCirclePlus } from "react-icons/ci";
import Container from "../../components/container/Container";
import CariKas from "./CariKas";
import TabelKas from "./TabelKas";
import { useNavigate } from "react-router-dom";
import { useUserLogin } from "../../services/useCustomQuery";
import InformasiKas from "./InformasiKas";

export default function UangKas() {
  const navigate = useNavigate();
  const { data: user } = useUserLogin();

  return (
    <Container>
      <div className="w-full h-[100vh] pt-[80px] flex  justify-center lg:pl-[20%]">
        <div className="w-[90%] h-[100vh] flex flex-col gap-4">
          <CariKas />
          <InformasiKas />
          <div className="w-full h-max  flex justify-between items-center">
            <h1 className="text-[1.2rem] text-black font-semibold tracking-[2px]">
              Data Kas
            </h1>
            {(user?.jabatan == "ketua kelas" ||
              user?.jabatan == "bendahara") && (
              <button
                className="p-2 bg-sky-500 rounded-xl"
                title="tambah data"
                onClick={() => navigate("/buat-transaksi")}
              >
                <CiCirclePlus
                  fill="white"
                  className="text-[1.2rem] font-bold"
                />
              </button>
            )}
          </div>
          <TabelKas />
        </div>
      </div>
    </Container>
  );
}
