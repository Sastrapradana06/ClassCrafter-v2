
import { CgMenuGridO } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { BsFillPatchExclamationFill } from "react-icons/bs";

import Sidebar from './Sidebar';
import women_user from '/women.jfif'
import men_user from '/men-user.jfif'
import { useNavigate } from 'react-router-dom';

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { deleteCookies } from "../../utils/function";
import ShowModal from "../modal/ShowModal";
import { useState } from "react";

export default function NavContainer() {
  const [isModal, setIsModal] = useState(false)

  const navigate = useNavigate()

  const [sidebar, setSidebar, resetState, user] = useAppStore(
    useShallow((state) => [state.sidebar, state.setSidebar, state.resetState, state.user])
  )

  const logoutUser = () => {
    deleteCookies()
    resetState()
    navigate('/')
  }


  return (
    <>
      <nav className="w-full h-max fixed z-40 flex justify-center items-center top-0 left-0 lg:left-[20%] lg:w-[80%] bg-[#E6EBEE] border-b">
        {isModal ? (
          <ShowModal>
            <div className="w-[90%] h-[200px] border rounded-xl bg-[#ffff] flex flex-col items-center justify-center text-black gap-6 lg:w-[40%]">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="p-2 rounded-full bg-[#dc143c4e]">
                  <BsFillPatchExclamationFill size={25} fill="crimson" />
                </div>
                <p>Apakah Anda Yakin Ingin Keluar ?</p>
              </div>
              <div className="flex gap-2 w-[80%]">
                <button className="w-full bg-slate-200 py-2 px-4 rounded-md hover:bg-slate-300" onClick={logoutUser}>Yakin</button>
                <button className="w-full bg-[#dc143cc0] py-2 px-4 rounded-md text-white hover:bg-[crimson]" onClick={() => setIsModal(false)}>Tidak</button>
              </div>
            </div>
          </ShowModal>
        ) : null}
        <div className="w-[95%] h-max p-2 flex justify-between items-center gap-3">
          <div className="flex justify-center items-center gap-2 ">
            <button onClick={() => setSidebar()} className='lg:hidden '>
              <CgMenuGridO size={28} />
            </button>
            <div className="flex flex-col justify-center">
              <h1 className=' text-[#303972] font-bold text-[1.2rem] tracking-[1px] capitalize lg:text-[1.5rem]'>{user ? user.username : null}</h1>
              <p className="-mt-2 text-[.8rem] capitalize text-slate-500">{user ? user.jabatan : null}</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 lg:gap-4">
            <button className=" p-1 rounded-md bg-[#FFFFFF] lg:p-2 hover:bg-slate-100" onClick={() => setIsModal(true)}>
              <IoLogOutOutline className='size-6 lg:size-8' />
            </button>
            <button>
              {user ? (
                <img 
                  src={
                    user.image == '' 
                    ? user.jekel == 'laki-laki' ? men_user : (user.jekel == 'perempuan' ? women_user : '')
                    : user.image
                  } 
                  alt="" 
                  className=" w-[30px] h-[30px] rounded-md object-cover lg:w-[45px] lg:h-[45px]" />
              ): null}
            </button>
          </div>
        </div>
      </nav>
      <Sidebar idSidebar={sidebar} />
    </>
  )
}