import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import CariMapel from "./CariMapel";
import TabelMapel from "./TabelMapel";
import { CiCirclePlus } from "react-icons/ci";

export default function Mapel() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[80px] flex  justify-center lg:pl-[20%]">
        <div className="w-[90%] h-[100vh] flex flex-col gap-4">
          <CariMapel />
          <div className="w-full h-max  flex justify-between items-center">
            <h1 className="text-[1.2rem] text-black font-semibold tracking-[2px]">
              Data Mapel
            </h1>
            <button
              className="p-2 bg-sky-500 rounded-xl"
              title="tambah data"
              onClick={() => navigate("/tambah-mapel")}
            >
              <CiCirclePlus fill="white" className="text-[1.2rem] font-bold" />
            </button>
          </div>
          <TabelMapel />
        </div>
      </div>
    </Container>
  );
}
