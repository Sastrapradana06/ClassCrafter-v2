import Container from "../../components/container/Container";
import CariSiswa from "./CariSiswa";
import TabelSiswa from "./TabelSiswa";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function Siswa() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[80px] flex  justify-center lg:pl-[20%]">
        <div className="w-[90%] h-[100vh] flex flex-col gap-4">
          <CariSiswa />
          <div className="w-full h-max  flex justify-between items-center">
            <h1 className="text-[1.2rem] text-black font-semibold tracking-[2px]">
              Data Siswa
            </h1>
            <button
              className="p-2 bg-sky-500 rounded-xl"
              title="tambah data"
              onClick={() => navigate("/tambah-siswa")}
            >
              <CiCirclePlus fill="white" className="text-[1.2rem] font-bold" />
            </button>
          </div>
          <TabelSiswa />
        </div>
      </div>
    </Container>
  );
}
