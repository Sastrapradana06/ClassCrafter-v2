import Container from "../../components/container/Container";
import TabelKas from "./TabelKas";

import InformasiKas from "./InformasiKas";
import HeaderActionsKas from "./HeaderActionKas";
import InputSearch from "../../components/input-search/inputSearch";

export default function UangKas() {
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[80px] flex  justify-center lg:pl-[20%]">
        <div className="w-[90%] h-[100vh] flex flex-col gap-4">
          <InputSearch placeholder={"Status, User, Tanggal"} />
          <InformasiKas />
          <HeaderActionsKas />
          <TabelKas />
        </div>
      </div>
    </Container>
  );
}
