import { useState } from 'react';
// import './Nav.css'
import { CgMenuGridO } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import Sidebar from './Sidebar';
import admin_png from '/admin.jfif'
import { useLocation  } from 'react-router-dom';

export default function NavContainer() {
  const [sidebar, setSidebar] = useState('sidebar_aktif')
  const {pathname} = useLocation ();

  const handleSidebar = () => {
    (sidebar == 'sidebar_non' ? setSidebar('sidebar_aktif') : setSidebar('sidebar_non'))
  }

  return (
    <>
      <nav className="w-full h-max fixed z-40 flex justify-center items-center top-0 left-0 lg:left-[20%] lg:w-[80%]">
        <div className="w-[95%] h-max p-2 flex justify-between items-center gap-3">
          <div className="flex justify-center items-center gap-2 ">
            <button onClick={handleSidebar} className='lg:hidden'>
              <CgMenuGridO size={28} />
            </button>
            <h1 className='hidden lg:block text-[#303972] font-bold text-[1.4rem] tracking-[1px] capitalize'>{pathname.replace(/[/-]/g, ' ')}</h1>
          </div>
          <div className="flex justify-center items-center gap-2 lg:gap-4">
            <button className=" p-1 rounded-md bg-[#FFFFFF] lg:p-2">
              <CiSettings className='size-6 lg:size-8'/>
            </button>
            <button>
              <img src={admin_png} alt="" className=" w-[30px] h-[30px] rounded-md object-cover lg:w-[45px] lg:h-[45px]" />
            </button>
          </div>
        </div>
      </nav>
      <Sidebar idSidebar={sidebar}/>
    </>
  )
}