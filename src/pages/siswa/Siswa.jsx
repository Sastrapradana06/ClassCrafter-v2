import Container from "../../components/container/Container";
import { IoIosSearch } from "react-icons/io";
import TabelSiswa from "./TabelSiswa";

export default function Siswa() {
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[80px] flex  justify-center lg:pl-[20%]">
        <div className="w-[90%] h-[100vh] flex flex-col gap-10">
          <div className="w-full h-max flex flex-col bg-[#ffff] items-center py-3 gap-2">
            <div className="w-[90%] h-[50px] rounded-md  flex border border-gray flex items-center p-2 gap-2">
              <IoIosSearch size={25} fill="#4D44B5"/>
              <input 
                type="text"
                placeholder="Cari di sini..." 
                className="w-full outline-none"
              />
            </div>
            <div className="w-[90%] flex gap-4">
              <button className="py-[4px] px-6 bg-[crimson] rounded-md text-white">Reset</button>
              <button className="py-[4px] px-6 bg-sky-300 rounded-md text-white">Cari</button>
            </div>
          </div>
          <TabelSiswa />
        </div>
      </div>
    </Container>
  )
}