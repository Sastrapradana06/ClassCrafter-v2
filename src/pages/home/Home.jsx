import Container from "../../components/container/Container";
import TabelAcara from "./TabelAcara";
import Kalender from "./Kalender";
import Header from "./Header";

export default function Home() {
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[65px] flex justify-center lg:pl-[20%] ">
        <div className="w-[90%] h-[200px]  flex flex-col gap-6 lg:mt-6 lg:w-[95%]">
          <Header />
          <div className="w-[100%] h-max  flex flex-col gap-5   lg:mt-2 pb-[100px]">
            <TabelAcara />
            <Kalender />
          </div>
        </div>
      </div>
    </Container>
  );
}
