import { useEffect } from "react";
import Container from "../../components/container/Container";
// import { addGuru, getGuruById } from "../../utils/api";
// import { ToastContainer } from 'react-toastify';
// import { handleToast } from "../../utils/function";

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
// import { useNavigate, useParams } from "react-router-dom";
// import Loading from "../../components/loading/Loading";

export default function TambahMapel() {
  // const [idUbah, setIdUbah] = useState(undefined)
  // const [isLoading, setIsLoading] = useState(false)
  // const [imgGuru, setImgGuru] = useState('')
  // const [dataGuru, setDataGuru] = useState({
  //   image: '',
  //   nama_guru: '',
  //   jekel: '',
  //   mapel: '',
  //   jadwal: ''
  // })

  const [dataGuru, getDataGuru] = useAppStore(
    useShallow((state) => [state.dataGuru, state.getDataGuru])
  )

  console.log({ dataGuru });

  // const { id } = useParams()
  // const navigate = useNavigate()
  // const fileInputRef = useRef(null);

  useEffect(() => {
    // if (id) {
    //   editGuru(id)
    // }
    if (dataGuru == undefined) {
      getDataGuru()
    }
  }, [])

  // const editGuru = async (id) => {
  //   const { data } = await getGuruById(id)
  //   setImgGuru(data.image)
  //   setDataGuru(data)
  //   setIdUbah(data.id)
  // }

  // const reset = () => {
  //   setDataGuru({
  //     image: '',
  //     nama_guru: '',
  //     jekel: '',
  //     mapel: '',
  //     jadwal: '',
  //   });
  //   setImgGuru('')
  //   setIdUbah(undefined)
  // }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   const newDataGuru = { ...dataGuru }
  //   newDataGuru[name] = value
  //   setDataGuru(newDataGuru)
  // }

  // const handleFoto = (e) => {
  //   e.preventDefault();
  //   fileInputRef.current.click();
  // };

  // const handleFileChange = (e) => {
  //   const file = URL.createObjectURL(e.target.files[0]);
  //   setImgGuru(file)
  //   const newDataGuru = { ...dataGuru }
  //   newDataGuru.image = file
  //   setDataGuru(newDataGuru)
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true)
  //   const newDataGuru = { idUbah, ...dataGuru }
  //   const { status, message, data } = await addGuru(newDataGuru)
  //   if (status) {
  //     updateDataGuru(data)
  //     handleToast(message, 'success')
  //     reset()
  //     setTimeout(() => {
  //       navigate('/guru')
  //     }, 1000)
  //   } else {
  //     handleToast(message, 'error')
  //   }
  //   setIsLoading(false)
  // }

  return (
    <Container>
      {/* <ToastContainer />
      {isLoading ? (
        <Loading />
      ) : null} */}
      <div className="w-full h-max pt-[80px] flex flex-col items-center gap-2 justify-center lg:pl-[20%]  pb-[100px]">
        <div className="w-[90%] h-max rounded-md bg-[#ffff]">
          <div className="w-[100%] m-auto h-[60px] border-b border-gray-300 flex items-center p-4">
            <p className=" text-[#4D44B5] font-medium">Tambah Mapel</p>
          </div>
          <form action="" className="w-full h-max  flex flex-col gap-3 p-4 lg:flex-row lg:justify-center lg:gap-0 ">
            <div className="w-full h-max flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={'mapel'}>Mata Pelajaran  <span className="text-[crimson]">*</span></label>
                <input
                  type="text"
                  name='mapel'
                  // value={dataGuru.nama_guru}
                  // onChange={handleInputChange}
                  placeholder="Bahasa Indonesia"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={'jam'}>Jam Pelajaran  <span className="text-[crimson]">*</span></label>
                <input
                  type="text"
                  name='jam'
                  // value={dataGuru.nama_guru}
                  // onChange={handleInputChange}
                  placeholder="08:00 - 11:00"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="jekel">Hari  <span className="text-[crimson]">*</span></label>
                <select
                  name="hari"
                  // value={dataGuru.jekel}
                  // onChange={handleInputChange}
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                >
                  <option value="none">Pilih Hari</option>
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                  <option value="Sabtu">Sabtu</option>
                </select>
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="guru">Nama Guru  <span className="text-[crimson]">*</span></label>
                <select
                  name="guru"
                  // value={dataGuru.jekel}
                  // onChange={handleInputChange}
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                >
                  <option value="none">Pilih Guru</option>
                  {dataGuru && (
                    dataGuru.map((item) => {
                      return (
                        <option value={item.nama_guru} key={item.id}>{item.nama_guru}</option>
                      )
                    })
                  )}
                </select>
              </div>
              {/* <div className="w-full">
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
              </div> */}
              <div className="w-full">
                <button className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]" type="submit">
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}