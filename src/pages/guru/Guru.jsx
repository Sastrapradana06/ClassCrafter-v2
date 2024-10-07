import Container from "../../components/container/Container";
import InputSearch from "../../components/input-search/inputSearch";
import HeaderActionGuru from "./HeaderActionGuru";
import TabelGuru from "./TabelGuru";

export default function Guru() {
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[80px] flex  justify-center lg:pl-[20%]">
        <div className="w-[90%] h-[100vh] flex flex-col gap-4">
          <InputSearch placeholder={"nama guru"} />
          <HeaderActionGuru />
          <TabelGuru />
        </div>
      </div>
    </Container>
  );
}
