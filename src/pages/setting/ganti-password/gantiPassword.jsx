import Container from "../../../components/container/Container";
import FormGantiPassword from "./formGantiPassword";

export default function GantiPassword() {
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[70px] flex justify-center lg:pl-[20%] ">
        <div className="w-[90%] h-[100vh] flex flex-col gap-4 items-center lg:w-[60%]">
          <h1 className="text-[1.3rem] text-[#4d44D5] font-semibold tracking-[2px]">
            Setting
          </h1>
          <FormGantiPassword />
        </div>
      </div>
    </Container>
  );
}
