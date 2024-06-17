import Container from "../../components/container/Container";
import CariKas from "./CariKas";
import TabelKas from "./TabelKas";

import InformasiKas from "./InformasiKas";
import HeaderActionsKas from "./HeaderActionKas";

export default function UangKas() {
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[80px] flex  justify-center lg:pl-[20%]">
        <div className="w-[90%] h-[100vh] flex flex-col gap-4">
          <CariKas />
          <InformasiKas />
          <HeaderActionsKas />
          <TabelKas />
        </div>
      </div>
    </Container>
  );
}
