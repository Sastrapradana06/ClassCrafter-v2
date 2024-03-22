import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

export default function TitleTable({ namaTable, link }) {
  const navigate = useNavigate()

  return (
    <div className="w-full h-max flex items-center justify-between">
      <div className='text-black font-medium bg-zinc-100 w-max py-1 px-5 rounded-md text-[1rem] lg:text-[1.1rem]'>{namaTable}</div>
      <button className='p-2 bg-sky-500 rounded-xl' title='tambah data' onClick={() => navigate(`${link}`)}>
        <CiCirclePlus fill='white' className='text-[1.2rem] font-bold' />
      </button>
    </div>
  )
}