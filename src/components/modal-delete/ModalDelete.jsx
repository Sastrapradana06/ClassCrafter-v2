import './style.css'
import PropTypes from 'prop-types';


import ShowModal from "../modal/ShowModal";
import { RiDeleteBin6Line } from "react-icons/ri";


export default function ModalDelete({ modalData }) {

  return (
    <ShowModal>
      <div className="w-[90%] h-[200px] border rounded-xl bg-[#ffff] flex flex-col items-center justify-center text-black gap-2 lg:w-[40%]">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-[80px] w-[80px] flex justify-center items-center rounded-full  -mt-[50px] bg-gray-300">
            <RiDeleteBin6Line size={50} fill="crimson" />
          </div>
        </div>
        <div className="text-center flex justify-center items-center flex-col gap-2">
          <p>Apakah Anda Yakin Ingin Menghapus <span className='text-[crimson] font-semibold uppercase'>{modalData.data} </span> ?</p>
          <p className='text-[.8rem] text-slate-400 w-[70%] '>&quot; Data yang terhapus maka tidak bisa dikembalikkan &quot;</p>
        </div>
        <div className="flex gap-4 w-[80%] ">
          <button className="w-full bg-slate-200 py-2 px-4 rounded-md hover:bg-slate-300" onClick={modalData.delete}>{modalData.loading ? 'Loading...' : 'Yakin'} </button>
          <button className="w-full bg-[#dc143cc0] py-2 px-4 rounded-md text-white hover:bg-[crimson]" onClick={modalData.close}>Tidak</button>
        </div>
      </div>
    </ShowModal>
  )
}

ModalDelete.propTypes = {
  modalData: PropTypes.shape({
    delete: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    data: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
  }).isRequired,
};