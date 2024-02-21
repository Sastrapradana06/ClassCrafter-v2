import Container from "../../components/container/Container";
import { IoIosSearch } from "react-icons/io";
import TabelGuru from "./TabelGuru";


export default function Guru() {
  return (
    <Container>
      <div className="w-full h-[100vh] pt-[80px] flex  justify-center lg:pl-[20%]">
        <div className="w-[90%] h-[100vh] flex flex-col gap-4">
          <div className="w-full h-max flex flex-col bg-[#404556] items-center py-3 gap-2 rounded-md">
            <div className="w-[90%] h-[50px] rounded-md  flex border border-gray  items-center p-2 gap-2">
              <IoIosSearch size={25} fill="#ffff" />
              <input
                type="text"
                placeholder="Cari di sini..."
                className="w-full outline-none bg-transparent text-white"
              />
            </div>
            <div className="w-[90%] flex gap-4">
              <button className="py-[4px] px-6 bg-[crimson] rounded-md text-white">Reset</button>
              <button className="py-[4px] px-6 bg-sky-300 rounded-md text-white">Cari</button>
            </div>
          </div>
          <TabelGuru />
        </div>
      </div>
    </Container>
  )
}