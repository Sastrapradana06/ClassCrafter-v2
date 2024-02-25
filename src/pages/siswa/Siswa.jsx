import Container from "../../components/container/Container";
import CariSiswa from "./CariSiswa";
import TabelSiswa from "./TabelSiswa";

export default function Siswa() {
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[80px] flex  justify-center lg:pl-[20%]">
        <div className="w-[90%] h-[100vh] flex flex-col gap-4">
          <CariSiswa />
          <TabelSiswa />
        </div>
      </div>
    </Container>
  )
}