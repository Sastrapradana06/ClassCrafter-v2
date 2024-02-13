import Container from "../../components/container/Container";

import { CiUser } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSiswaById } from '../../utils/api';
import Loading from "../../components/loading/Loading";


export default function DetailSiswa() {
  const [detSiswa, setDetSiswa] = useState(undefined)
  const [user] = useAppStore(
    useShallow((state) => [state.user])
  )

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      siswaById(id)
    } else {
      setDetSiswa(user)
    }
  }, [user, id])


  const siswaById = async (id) => {
    const { data } = await getSiswaById(id)
    setDetSiswa(data)
  }

  return (
    <Container>
      {detSiswa ? (
        <div className="w-full h-[100vh] pt-[80px] flex  justify-center lg:pl-[20%]">
          <div className="w-[90%] h-[550px] bg-white flex flex-col rounded-lg overflow-hidden lg:h-[520px]">
            <div className="w-full h-[170px] bg-[#4D44B5] flex flex-col justify-end items-center  lg:h-[180px]">
              <div className="w-[85%] h-[70px] flex justify-end items-end lg:h-[80%]">
                <div className="w-[18%] h-[80%] rounded-tl-xl bg-[#e67151]"></div>
                <div className="w-[38%] h-full rounded-t-xl bg-[#e9b438]"></div>
              </div>
            </div>
            <div className="w-full h-maxflex flex-col relative p-4 lg:pl-6">
              <div className="w-[110px] h-[110px] border-4 border-white absolute -top-[60px] rounded-full lg:left-7 lg:h-[130px] lg:w-[130px] lg:border-8">
                <img src={detSiswa.image} alt="" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="mt-10 lg:pt-4">
                <h1 className="text-[1.3rem] font-semibold lg:text-[1.5rem]">{detSiswa.username}</h1>
                <p className="text-[.9rem] font-medium text-[#312a83] capitalize">{detSiswa.jabatan}</p>
              </div>
            </div>
            <div className="w-full h-[300px] p-4 flex flex-col justify-between gap-3 lg:flex-row lg:flex-wrap  lg:h-max lg:gap-6 lg:pl-6">
              <div className="w-full h-max flex gap-2 items-center  lg:w-[45%]">
                <div className="p-3 rounded-full bg-[#FB7D5B] w-max">
                  <CiUser size={30} color="white" />
                </div>
                <div className="flex flex-col ">
                  <p className="text-[.8rem]">Orang Tua:</p>
                  <h1 className="font-semibold capitalize">{detSiswa.nama_ortu}</h1>
                </div>
              </div>
              <div className="w-full h-max flex gap-2 items-center  lg:w-[45%]">
                <div className="p-3 rounded-full bg-[#FB7D5B] w-max">
                  <IoLocationOutline size={30} color="white" />
                </div>
                <div className="flex flex-col ">
                  <p className="text-[.8rem]">Alamat:</p>
                  <h1 className="font-semibold capitalize">{detSiswa.alamat}</h1>
                </div>
              </div>
              <div className="w-full h-max flex gap-2 items-center  lg:w-[45%]">
                <div className="p-3 rounded-full bg-[#FB7D5B] w-max">
                  <FiPhone size={30} color="white" />
                </div>
                <div className="flex flex-col ">
                  <p className="text-[.8rem]">Telepon: </p>
                  <h1 className="font-semibold capitalize">{detSiswa.notel}</h1>
                </div>
              </div>
              <div className="w-full h-max flex gap-2 items-center  lg:w-[45%]">
                <div className="p-3 rounded-full bg-[#FB7D5B] w-max">
                  <HiOutlineMail size={30} color="white" />
                </div>
                <div className="flex flex-col ">
                  <p className="text-[.8rem]">Email:</p>
                  <h1 className="font-semibold">{detSiswa.email}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  )
}