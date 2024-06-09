import Container from "../../components/container/Container";
import GantiPassword from "./GantiPassword";

export default function Setting() {
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[70px] flex justify-center lg:pl-[20%] ">
        <div className="w-[90%] h-[100vh] flex flex-col gap-4 items-center lg:w-[60%]">
          <h1 className="text-[1.3rem] text-[#4d44D5] font-semibold tracking-[2px]">
            Setting
          </h1>
          <GantiPassword />
        </div>
      </div>
    </Container>
  );
}
