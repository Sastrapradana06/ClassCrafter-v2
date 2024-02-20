import { useState, useRef, useEffect } from "react";
import Container from "../../components/container/Container";
import { addGuru, getGuruById } from "../../utils/api";
import { ToastContainer } from 'react-toastify';
import { handleToast } from "../../utils/function";

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";


export default function TambahGuru() {
  const [idUbah, setIdUbah] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [imgGuru, setImgGuru] = useState('')
  const [dataGuru, setDataGuru] = useState({
    image: '',
    nama_guru: '',
    jekel: '',
    mapel: '',
    jadwal: ''
  })

  const [updateDataGuru] = useAppStore(
    useShallow((state) => [state.updateDataGuru])
  )

  const { id } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (id) {
      editGuru(id)
    }
  }, [])

  const editGuru = async (id) => {
    const { data } = await getGuruById(id)
    setImgGuru(data.image)
    setDataGuru(data)
    setIdUbah(data.id)
  }

  const reset = () => {
    setDataGuru({
      image: '',
      nama_guru: '',
      jekel: '',
      mapel: '',
      jadwal: '',
    });
    setImgGuru('')
    setIdUbah(undefined)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const newDataGuru = { ...dataGuru }
    newDataGuru[name] = value
    setDataGuru(newDataGuru)
  }

  const handleFoto = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setImgGuru(file)
    const newDataGuru = { ...dataGuru }
    newDataGuru.image = file
    setDataGuru(newDataGuru)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const newDataGuru = { idUbah, ...dataGuru }
    const { status, message, data } = await addGuru(newDataGuru)
    if (status) {
      updateDataGuru(data)
      handleToast(message, 'success')
      reset()
      setTimeout(() => {
        navigate('/guru')
      }, 1000)
    } else {
      handleToast(message, 'error')
    }
    setIsLoading(false)
  }



  return (
    <Container>
      <ToastContainer />
      {isLoading ? (
        <Loading />
      ) : null}
      <div className="w-full h-max pt-[80px] flex flex-col items-center gap-2 justify-center lg:pl-[20%]  pb-[100px]">
        <div className="w-[90%] h-max rounded-md bg-[#ffff]">
          <div className="w-[100%] m-auto h-[60px] border-b border-gray-300 flex items-center p-4">
            <p className=" text-[#4D44B5] font-medium">{idUbah ? 'Edit Guru' : 'Tambah Guru'}</p>
          </div>
          <form action="" className="w-full h-max  flex flex-col gap-3 p-4 lg:flex-row lg:justify-center lg:gap-0 " onSubmit={handleSubmit}>
            <div className="w-full h-[200px]  flex flex-col gap-2 lg:w-[40%]">
              <div className="">
                <p>Foto <span className="text-[crimson]">*</span></p>
              </div>
              <div className="">
                <img src={imgGuru} alt="" className="w-[120px] h-[120px] border border-sky-300 rounded-md object-cover" />
              </div>
              <div className="w-full flex gap-2">
                <button className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]" onClick={handleFoto}>Pilih File</button>
                <button className="py-[6px] px-4 text-[.8rem] bg-[#FFEAEA] text-[#FD5858] rounded-lg hover:bg-[#FD5858] hover:text-white" >Hapus</button>
              </div>
              <input
                type="file"
                id="file-input"
                className="file-input hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <div className="w-full h-max flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={'nama_guru'}>Nama Guru  <span className="text-[crimson]">*</span></label>
                <input
                  type="text"
                  name='nama_guru'
                  value={dataGuru.nama_guru}
                  onChange={handleInputChange}
                  placeholder="Lorem Ipsum"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="jekel">Jenis Kelamin  <span className="text-[crimson]">*</span></label>
                <select
                  name="jekel"
                  value={dataGuru.jekel}
                  onChange={handleInputChange}
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                >
                  <option value="none">Pilih Jenis Kelamin</option>
                  <option value="laki-laki">Laki-Laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="mapel">Mata Pelajaran  <span className="text-[crimson]">*</span></label>
                <input
                  type="text"
                  name="mapel"
                  value={dataGuru.mapel}
                  onChange={handleInputChange}
                  placeholder="Bahasa Indonesia"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="jadwal">Jadwal Pelajaran  <span className="text-[crimson]">*</span></label>
                <input
                  type="text"
                  name="jadwal"
                  value={dataGuru.jadwal}
                  onChange={handleInputChange}
                  placeholder="Senin"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full">
                {idUbah ? (
                  <>
                    <button className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]">
                      Ubah
                    </button>
                    <button className="ml-2 py-[6px] px-4 text-[.8rem] bg-[#dc143cd5] text-white rounded-lg hover:bg-[crimson]" onClick={() => navigate('/guru')}>
                      Batal
                    </button>
                  </>
                ) : (
                  <button className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]" type="submit">
                    Simpan
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}