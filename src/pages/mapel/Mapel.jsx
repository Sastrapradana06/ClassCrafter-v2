import Container from "../../components/container/Container";
import InputSearch from "../../components/input-search/inputSearch";
import HeaderActionsMapel from "./HeaderActionsMapel";
import TabelMapel from "./TabelMapel";

export default function Mapel() {
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[80px] flex  justify-center lg:pl-[20%]">
        <div className="w-[90%] h-[100vh] flex flex-col gap-4">
          <InputSearch placeholder={"Mapel"} />
          <HeaderActionsMapel />
          <TabelMapel />
        </div>
      </div>
    </Container>
  );
}
