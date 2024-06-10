import Container from "../../components/container/Container";

import { CiUser } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSiswaById } from "../../utils/api";
import Loading from "../../components/loading/Loading";
import { useUserLogin } from "../../services/useCustomQuery";

export default function DetailSiswa() {
  const [showAvatar, setShowAvatar] = useState(false);
  const [detSiswa, setDetSiswa] = useState(undefined);
  const { data: user } = useUserLogin();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      siswaById(id);
    } else {
      setDetSiswa(user);
    }
  }, [user, id]);

  const siswaById = async (id) => {
    const { data } = await getSiswaById(id);
    console.log(data);
    if (data.length === 0) return;
    setDetSiswa(data[0]);
  };

  const handleShowAvatar = () => {
    setShowAvatar(!showAvatar);
  };

  const ShowAvatar = () => {
    return (
      <div className="w-full h-[100vh] fixed top-0 left-0 z-[10000] flex justify-center items-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm">
        <div
          className="w-full h-full absolute top-0 left-0"
          onClick={handleShowAvatar}
        ></div>
        <div className="w-max h-max bg-gray-700 rounded-full">
          <img
            src={detSiswa ? detSiswa.image : "/men-user.jfif"}
            alt="avatar"
            className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] object-cover rounded-full p-2 ring-2 ring-white"
          />
        </div>
      </div>
    );
  };

  return (
    <Container>
      {showAvatar ? <ShowAvatar /> : null}
      {detSiswa ? (
        <div className="w-full h-max pt-[80px] pb-[100px] flex  justify-center lg:pl-[20%]">
          <div className="w-[90%] h-[550px]  bg-white flex flex-col rounded-lg overflow-hidden lg:h-[520px]">
            <div className="w-full h-[170px] bg-[#4D44B5] flex flex-col justify-end items-center  lg:h-[180px]">
              <div className="w-[85%] h-[70px] flex justify-end items-end lg:h-[80%]">
                <div className="w-[18%] h-[80%] rounded-tl-xl bg-[#e67151]"></div>
                <div className="w-[38%] h-full rounded-t-xl bg-[#e9b438]"></div>
              </div>
            </div>
            <div className="w-full h-maxflex flex-col relative p-4 lg:pl-6">
              <div className="w-[110px] h-[110px] border-4 border-white absolute -top-[60px] rounded-full lg:left-7 lg:h-[130px] lg:w-[130px] lg:border-8">
                <img
                  src={detSiswa.image}
                  alt="avatar"
                  onClick={handleShowAvatar}
                  className="w-full h-full object-cover rounded-full cursor-pointer"
                />
              </div>
              <div className="mt-10 lg:pt-4">
                <h1 className="text-[1.3rem] font-semibold lg:text-[1.5rem] capitalize">
                  {detSiswa.username || detSiswa.name}
                </h1>
                <p className="text-[.9rem] font-medium text-[#312a83] capitalize">
                  {detSiswa.jabatan}
                </p>
              </div>
            </div>
            <div className="w-full h-[300px] p-4 flex flex-col justify-between gap-3 lg:flex-row lg:flex-wrap  lg:h-max lg:gap-6 lg:pl-6">
              <div className="w-full h-max flex gap-2 items-center  lg:w-[45%]">
                <div className="p-3 rounded-full bg-[#FB7D5B] w-max">
                  <CiUser size={30} color="white" />
                </div>
                <div className="flex flex-col ">
                  <p className="text-[.8rem]">Orang Tua:</p>
                  <h1 className="font-semibold capitalize">
                    {detSiswa.nama_ortu}
                  </h1>
                </div>
              </div>
              <div className="w-full h-max flex gap-2 items-center  lg:w-[45%]">
                <div className="p-3 rounded-full bg-[#FB7D5B] w-max">
                  <IoLocationOutline size={30} color="white" />
                </div>
                <div className="flex flex-col ">
                  <p className="text-[.8rem]">Alamat:</p>
                  <h1 className="font-semibold capitalize">
                    {detSiswa.alamat}
                  </h1>
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
  );
}
