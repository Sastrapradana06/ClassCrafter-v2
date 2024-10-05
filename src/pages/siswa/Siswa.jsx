import Container from "../../components/container/Container";
import TabelSiswa from "./TabelSiswa";

import HeaderActionsSiswa from "./HeaderActionSiswa";
import InputSearch from "../../components/input-search/inputSearch";

export default function Siswa() {
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[80px] flex  justify-center lg:pl-[20%]">
        <div className="w-[90%] h-[100vh] flex flex-col gap-4">
          <InputSearch placeholder={"Guru"} />
          <HeaderActionsSiswa />
          <TabelSiswa />
        </div>
      </div>
    </Container>
  );
}
