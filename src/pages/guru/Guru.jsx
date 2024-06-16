import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import CariGuru from "./CariGuru";
import TabelGuru from "./TabelGuru";
import { CiCirclePlus } from "react-icons/ci";
import { useUserLogin } from "../../services/useCustomQuery";
import ImportCsvGuru from "./ImportCsvGuru";

export default function Guru() {
  const navigate = useNavigate();
  const { data: user } = useUserLogin();

  return (
    <Container>
      <div className="w-full h-[100vh] pt-[80px] flex  justify-center lg:pl-[20%]">
        <div className="w-[90%] h-[100vh] flex flex-col gap-4">
          <CariGuru />
          <div className="w-full h-max  flex justify-between items-center">
            <h1 className="text-[1.2rem] text-black font-semibold tracking-[2px]">
              Data Guru
            </h1>
            {(user?.jabatan == "ketua kelas" ||
              user?.jabatan == "sekretaris") && (
              <div className="w-max flex gap-3">
                <ImportCsvGuru />
                <button
                  className="p-2 bg-sky-500 rounded-xl"
                  title="tambah data"
                  onClick={() => navigate("/tambah-guru")}
                >
                  <CiCirclePlus
                    fill="white"
                    className="text-[1.2rem] font-bold"
                  />
                </button>
              </div>
            )}
          </div>
          <TabelGuru />
        </div>
      </div>
    </Container>
  );
}
