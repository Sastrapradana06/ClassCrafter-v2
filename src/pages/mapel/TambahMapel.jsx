import { useEffect, useState } from "react";
import Container from "../../components/container/Container";

import { ToastContainer } from 'react-toastify';
import { handleToast } from "../../utils/function";

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';

import { useNavigate, useParams } from "react-router-dom";

import Loading from "../../components/loading/Loading";
import { addMapel, getMapelById } from "../../utils/api";

export default function TambahMapel() {
  const [idUbah, setIdUbah] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const [mapel, setMapel] = useState({
    mapel: '',
    jam: '',
    hari: '',
    nama_guru: ''
  })

  const [dataGuru, getDataGuru, updateDataMapel] = useAppStore(
    useShallow((state) => [state.dataGuru, state.getDataGuru, state.updateDataMapel])
  )

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      editMapel(id)
    }

    if (dataGuru == undefined) {
      getDataGuru()
    }
  }, [])

  const reset = () => {
    setMapel({
      mapel: '',
      jam: '',
      hari: '',
      nama_guru: '',
    });
    setIdUbah(undefined)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const newMapel = { ...mapel }
    newMapel[name] = value
    setMapel(newMapel)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const newMapel = { idUbah, ...mapel }
    const { status, message, data } = await addMapel(newMapel)
    if (status) {
      updateDataMapel(data)
      handleToast(message, 'success')
      reset()
      setTimeout(() => {
        navigate('/mapel')
      }, 1000)
    } else {
      handleToast(message, 'error')
    }
    setIsLoading(false)
  }


  const editMapel = async (id) => {
    setIsLoading(true)
    const { data } = await getMapelById(id)
    setMapel(data)
    setIdUbah(data.id)
    setIsLoading(false)
  }

  return (
    <Container>
      <ToastContainer />
      {isLoading ? (
        <Loading />
      ) : null}
      <div className="w-full h-max pt-[100px] flex flex-col items-center gap-2 justify-center lg:pl-[20%]  pb-[100px]">
        <div className="w-[90%] h-max rounded-md bg-[#ffff]">
          <div className="w-[100%] m-auto h-[60px] border-b border-gray-300 flex items-center p-4">
            <p className=" text-[#4D44B5] font-medium">{idUbah ? 'Ubah' : 'Tambah'} Mata Pelajaran</p>
          </div>
          <form action="" className="w-full h-max  flex flex-col gap-3 p-4 lg:flex-row lg:justify-center lg:gap-0 " onSubmit={handleSubmit}>
            <div className="w-full h-max flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={'mapel'}>Mata Pelajaran  <span className="text-[crimson]">*</span></label>
                <input
                  type="text"
                  name='mapel'
                  value={mapel.mapel}
                  onChange={handleInputChange}
                  placeholder="Bahasa Indonesia"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={'jam'}>Jam Pelajaran  <span className="text-[crimson]">*</span></label>
                <input
                  type="text"
                  name='jam'
                  value={mapel.jam}
                  onChange={handleInputChange}
                  placeholder="08:00"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="jekel">Hari  <span className="text-[crimson]">*</span></label>
                <select
                  name="hari"
                  value={mapel.hari}
                  onChange={handleInputChange}
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
                <label htmlFor="nama_guru">Nama Guru  <span className="text-[crimson]">*</span></label>
                <select
                  name="nama_guru"
                  value={mapel.nama_guru}
                  onChange={handleInputChange}
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
              <div className="w-full">
                {idUbah ? (
                  <>
                    <button className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]">
                      Ubah
                    </button>
                    <button className="ml-2 py-[6px] px-4 text-[.8rem] bg-[#dc143cd5] text-white rounded-lg hover:bg-[crimson]" onClick={() => navigate('/mapel')}>
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