import PropTypes from 'prop-types'
import './Nav.css'
import image2 from '/student2.svg'


import { PiStudentFill } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation  } from 'react-router-dom';

export default function Sidebar({ idSidebar }) {
  const navigate = useNavigate()
  const {pathname} = useLocation ();

  const [dropdownStates, setDropdownStates] = useState({
    Siswa: 'hidden',
    Guru: 'hidden'
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
      parent_link: [
        {
          nama_link: 'Dashboard',
          url: '/dashboard'
        },
      ]
    },
    {
      nama_link: 'Siswa',
      parent_link: [
        {
          nama_link: 'Daftar Siswa',
          url: '/siswa'
        },
        {
          nama_link: 'Tambah Siswa',
          url: '/tambah-siswa'
        },
      ]
    },
    {
      nama_link: 'Guru',
      parent_link: [
        {
          nama_link: 'Daftar Guru',
          url: '/'
        },
        {
          nama_link: 'Tambah Guru',
          url: '/'
        },
      ]
    },
  ]

  return (
    <div className="top-[50px] h-[100vh] fixed w-[65%] lg:top-0 lg:h-[100vh] lg:w-[20%] p-4 bg-[#4D44B5] text-[#BDB9E3] flex flex-col gap-3" id={idSidebar}>
      <div className="flex items-center gap-2 lg:justify-center lg:gap-4 lg:mt-1">
        <h2 className="text-lg font-semibold lg:hidden capitalize">{pathname.replace(/[/-]/g, ' ')}</h2>
        <img src={image2} alt=""  width={30} className='hidden lg:block'/>
        <h2 className="text-lg font-semibold hidden lg:block  lg:text-[1.5rem] text-white">ClassCrafter</h2>
      </div>
      <div className="flex flex-col gap-3 w-full h-[400px] lg:mt-4 lg:pl-4">
        {listLink.map((item, i) => {
          return (
            <div className="w-full flex flex-col " key={i}>
              <div className="flex items-center w-[70%] ml-2  gap-1 justify-between text-[.9rem] lg:text-[1rem] rounded-md cursor-pointer hover:bg-[#ede9f13f] py-2  lg:w-[60%]" onClick={() => showDropdown(item.nama_link)}>
                <div className="flex gap-4 items-center">
                  <PiStudentFill size={20}/>
                  <p className='font-semibold'>{item.nama_link}</p>
                </div>
                <div className="">
                  <button className='ml-[30px] group'>
                    <IoIosArrowDown size={16}/>
                  </button>
                </div>
              </div>
              <div className={`${dropdownStates[item.nama_link]} pl-8 text-[.8rem] pt-2 flex flex-col gap-3  lg:text-[.9rem]`}>
                {item.parent_link.map((items, index) => {
                  return (
                    <button className=' w-max hover:text-white  transition-all' key={index} onClick={() => navigate(items.url)}>{items.nama_link}</button>
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