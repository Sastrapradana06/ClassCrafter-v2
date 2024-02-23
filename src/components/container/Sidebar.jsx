import PropTypes from 'prop-types'
import './Nav.css'
import image2 from '/student2.svg'

import { PiStudentFill } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiLockPasswordLine, RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa6";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';

export default function Sidebar({ idSidebar }) {
  const navigate = useNavigate()

  const [setSidebar, user] = useAppStore(
    useShallow((state) => [state.setSidebar, state.user])
  )

  const [dropdownStates, setDropdownStates] = useState({
    Home: 'hidden',
    Siswa: 'hidden',
    Guru: 'hidden',
    Setting: 'hidden',
    Mapel: 'hidden',
    Transaksi: 'hidden'
  });

  const showDropdown = (nama) => {
    setDropdownStates((prev) => ({
      ...prev,
      [nama]: prev[nama] === 'hidden' ? 'block' : 'hidden',
    }));
  };

  const listLink = [
    {
      nama_link: 'Home',
      icons: <TiHome size={20} />,
      parent_link: [
        {
          nama_link: 'Dashboard',
          url: '/dashboard'
        },
      ]
    },
    {
      nama_link: 'Siswa',
      icons: <PiStudentFill size={20} />,
      parent_link: [
        {
          nama_link: 'Daftar Siswa',
          url: '/siswa'
        },
        {
          nama_link: 'Detail Siswa',
          url: '/detail-siswa'
        },
        ...(user && (user.jabatan === 'ketua kelas' || user.jabatan === 'sekretaris') ? [{
          nama_link: 'Tambah Siswa',
          url: '/tambah-siswa'
        }] : [])
      ]
    },
    {
      nama_link: 'Guru',
      icons: <FaChalkboardTeacher size={20} />,
      parent_link: [
        {
          nama_link: 'Daftar Guru',
          url: '/guru'
        },
        ...(user && (user.jabatan === 'ketua kelas' || user.jabatan === 'sekretaris') ? [{
          nama_link: 'Tambah Guru',
          url: '/tambah-guru'
        }] : []),
      ]
    },
    {
      nama_link: 'Mapel',
      icons: <FaBook size={20} />,
      parent_link: [
        {
          nama_link: 'Daftar Mapel',
          url: '/mapel'
        },
        ...(user && (user.jabatan === 'ketua kelas' || user.jabatan === 'sekretaris') ? [{
          nama_link: 'Tambah Mapel',
          url: '/tambah-mapel'
        }] : []),
      ]
    },
    {
      nama_link: 'Transaksi',
      icons: <RiMoneyDollarCircleFill size={20} />,
      parent_link: [
        {
          nama_link: 'Uang Kas',
          url: '/kas'
        },
        ...(user && (user.jabatan === 'ketua kelas' || user.jabatan === 'sekretaris') ? [{
          nama_link: 'Buat Transaksi',
          url: '/buat-transaksi'
        }] : []),
      ]
    },
    ...(user && (user.jabatan === 'ketua kelas' || user.jabatan === 'sekretaris') ? [{
      nama_link: 'Setting',
      icons: <RiLockPasswordLine size={20} />,
      parent_link: [
        {
          nama_link: 'Authentication',
          url: '/auth'
        },
      ]
    }] : [])
  ];


  return (
    <div className="top-[50px] h-[100vh] fixed w-[60%] lg:top-0 lg:h-[100vh] lg:w-[20%] p-4 bg-[#4D44B5] text-[#BDB9E3] flex flex-col gap-3" id={idSidebar}>
      <div className="flex items-center gap-2 ml-4 lg:ml-0 lg:justify-center lg:gap-4 mt-1">
        <img src={image2} alt="" width={30} className='' />
        <h2 className="text-lg font-semibold  lg:text-[1.5rem] text-white">ClassCrafter</h2>
      </div>
      <div className="flex flex-col gap-3 w-full h-[400px] lg:mt-4 lg:pl-4">
        {listLink.map((item, i) => {
          return (
            <div className="w-full flex-col  " key={i}>
              <div className="flex items-center w-[70%] ml-2  gap-1 justify-between text-[.9rem] lg:text-[1rem] rounded-md cursor-pointer hover:bg-[#ede9f13f] py-2  lg:w-[65%]" onClick={() => showDropdown(item.nama_link)}>
                <div className="flex gap-4 items-center">
                  {item.icons}
                  <p className='font-semibold mt-1'>{item.nama_link}</p>
                </div>
                <div className="">
                  <button className='ml-[30px] group'>
                    <IoIosArrowDown size={16} />
                  </button>
                </div>
              </div>
              <div className={`${dropdownStates[item.nama_link]} pl-8 text-[.8rem] pt-2 flex flex-col gap-3  lg:text-[.9rem]`}>
                {item.parent_link.map((items, index) => {
                  return (
                    <button className=' w-max hover:text-white  transition-all' key={index} onClick={() => { navigate(items.url); setSidebar() }}>{items.nama_link}</button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  idSidebar: PropTypes.node.isRequired,
};