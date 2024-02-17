import Container from "../../components/container/Container";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { RiCalendarEventLine } from "react-icons/ri";
import { FaMoneyCheckAlt } from "react-icons/fa";
import TabelAcara from "./TabelAcara";
import Kalender from "./Kalender";

export default function Home() {
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[65px] flex justify-center lg:pl-[20%] ">
        <div className="w-[90%] h-[200px]  flex flex-col gap-6 lg:mt-6 lg:w-[95%]">
          <div className="w-full h-[150px] rounded-md flex justify-between flex-wrap bg-[#FFFFFF] lg:flex-nowrap lg:h-max lg:items-center">
            <div className="w-[50%] h-[50%] flex p-3 items-center gap-2 ">
              <div className="p-4 bg-[#4D44B5] rounded-full">
                <BsFileEarmarkPerson fill="white" className="size-5" />
              </div>
              <div className="flex flex-col">
                <p className="text-[.8rem] text-[#7c7e86]">Siswa</p>
                <p className="text-[#4D44B5] font-semibold text-[1.2rem]">923</p>
              </div>
            </div>
            <div className="w-[50%] h-[50%] flex p-3 items-center gap-2  ">
              <div className="p-4 bg-[#e65e39] rounded-full">
                <GiTeacher fill="white" className="size-5" />
              </div>
              <div className="flex flex-col">
                <p className="text-[.8rem] text-[#7c7e86]">Guru</p>
                <p className="text-[#4D44B5] font-semibold text-[1.2rem]">754</p>
              </div>
            </div>
            <div className="w-[50%] h-[50%] flex p-3 items-center gap-2 ">
              <div className="p-4 bg-[#FCC43E] rounded-full">
                <RiCalendarEventLine fill="white" className="size-5" />
              </div>
              <div className="flex flex-col">
                <p className="text-[.8rem] text-[#7c7e86]">Acara</p>
                <p className="text-[#4D44B5] font-semibold text-[1.2rem]">6</p>
              </div>
            </div>
            <div className="w-[50%] h-[50%] flex p-3 items-center gap-2 ">
              <div className="p-4 bg-[#44aa44] rounded-full">
                <FaMoneyCheckAlt fill="white" className="size-5" />
              </div>
              <div className="flex flex-col">
                <p className="text-[.8rem] text-[#7c7e86]">Kas</p>
                <p className="text-[#4D44B5] font-semibold text-[1.2rem]">504.000</p>
              </div>
            </div>
          </div>
          <div className="w-[100%] h-max  flex flex-col gap-5 lg:flex-row  lg:mt-10 pb-[100px]">
            <TabelAcara />
            <Kalender />
          </div>
        </div>
      </div>
    </Container>
  )
}