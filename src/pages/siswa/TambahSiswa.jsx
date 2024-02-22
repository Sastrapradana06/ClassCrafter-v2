import Container from "../../components/container/Container";
import { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleToast } from "../../utils/function";
import { addSiswa } from "../../utils/api";

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { useNavigate, useParams } from "react-router-dom";
import { getSiswaById } from '../../utils/api';
import Loading from "../../components/loading/Loading";

export default function TambahSiswa() {
  const [isLoading, setIsLoading] = useState(false)
  const [idUbah, setIdUbah] = useState(undefined)
  const [imgUser, setImgUser] = useState('')
  const [userData, setUserData] = useState({
    image: '',
    username: '',
    tanggal_lahir: '',
    email: '',
    notel: '',
    jabatan: '',
    nama_ortu: '',
    alamat: '',
    jekel: ''
  })

  const { id } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (id) {
      editSiswa(id)
    }
  }, [])

  const editSiswa = async (id) => {
    setIsLoading(true)
    const { data } = await getSiswaById(id)
    setImgUser(data.image)
    setUserData(data)
    setIdUbah(data.id)
    setIsLoading(false)
  }

  const [setDataSiswa] = useAppStore(
    useShallow((state) => [state.setDataSiswa])
  )

  const resetUserData = () => {
    setUserData({
      image: '',
      username: '',
      tanggal_lahir: '',
      email: '',
      notel: '',
      jabatan: '',
      nama_ortu: '',
      alamat: '',
      jekel: '',
    });
    setIdUbah(undefined)
    setImgUser('')
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedUserData = { ...userData };
    updatedUserData[name] = value;
    setUserData(updatedUserData);
  };

  const handleFoto = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setImgUser(file)
    const updatedUserData = { ...userData };
    updatedUserData.image = file;
    setUserData(updatedUserData);
  }

  const deleteFotoUser = (e) => {
    e.preventDefault()
    const updatedUserData = { ...userData };
    updatedUserData.image = '';
    setUserData(updatedUserData);
    setImgUser('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const dataSiswa = { idUbah, ...userData }
    try {
      const { status, message, data } = await addSiswa(dataSiswa)
      if (status) {
        handleToast(message, 'success')
        setDataSiswa(data)
        setTimeout(() => {
          navigate('/siswa')
        }, 1000)
      } else {
        handleToast(message, 'error')
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
    resetUserData()
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
            <p className=" text-[#4D44B5] font-medium">{id ? 'Edit Siswa' : 'Tambah Siswa'}</p>
          </div>
          <form action="" className="w-full h-max  flex flex-col gap-3 p-4 lg:flex-row lg:justify-center lg:gap-0 " onSubmit={handleSubmit}>
            <div className="w-full h-[200px]  flex flex-col gap-2 lg:w-[40%]">
              <div className="">
                <p>Foto <span className="text-[crimson]">*</span></p>
              </div>
              <div className="">
                <img src={imgUser} alt="" className="w-[120px] h-[120px] border border-sky-300 rounded-md object-cover" />
              </div>
              <div className="w-full flex gap-2">
                <button className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]" onClick={handleFoto}>Pilih File</button>
                <button className="py-[6px] px-4 text-[.8rem] bg-[#FFEAEA] text-[#FD5858] rounded-lg hover:bg-[#FD5858] hover:text-white" onClick={deleteFotoUser}>Hapus</button>
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
                <label htmlFor={userData.username}>Nama Lengkap  <span className="text-[crimson]">*</span></label>
                <input
                  type="text"
                  name='username'
                  value={userData.username}
                  onChange={handleInputChange}
                  placeholder="Lorem Ipsum"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="tanggal_lahir">Tanggal Lahir  <span className="text-[crimson]">*</span></label>
                <input
                  type="text"
                  name='tanggal_lahir'
                  value={userData.tanggal_lahir}
                  onChange={handleInputChange}
                  placeholder="06 November 2001"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="email">Email  <span className="text-[crimson]">*</span></label>
                <input
                  type="email"
                  name='email'
                  value={userData.email}
                  onChange={handleInputChange}
                  placeholder="halo@example.com"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="notel">Notel  <span className="text-[crimson]">*</span></label>
                <input
                  type="text"
                  name='notel'
                  value={userData.notel}
                  onChange={handleInputChange}
                  placeholder="08124567...."
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="jekel">Jenis Kelamin  <span className="text-[crimson]">*</span></label>
                <select
                  name="jekel"
                  value={userData.jekel}
                  onChange={handleInputChange}
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                >
                  <option value="none">Pilih Jenis Kelamin</option>
                  <option value="laki-laki">Laki-Laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="jabatan">Jabatan  <span className="text-[crimson]">*</span></label>
                <select
                  name="jabatan"
                  value={userData.jabatan}
                  onChange={handleInputChange}
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                >
                  <option value="none">Pilih Jabatan</option>
                  <option value="ketua kelas">Ketua Kelas</option>
                  <option value="sekretaris">Sekretaris</option>
                  <option value="bendahara">Bendahara</option>
                  <option value="member">Member</option>
                </select>
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="nama_ortu">Nama Ortu  <span className="text-[crimson]">*</span></label>
                <input
                  type="text"
                  name="nama_ortu"
                  value={userData.nama_ortu}
                  onChange={handleInputChange}
                  placeholder="ibu/ayah"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="alamat">Alamat  <span className="text-[crimson]">*</span></label>
                <textarea
                  type="text"
                  name="alamat"
                  value={userData.alamat}
                  onChange={handleInputChange}
                  placeholder="Medan"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full">
                {idUbah ? (
                  <>
                    <button className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]">
                      Ubah
                    </button>
                    <button className="ml-2 py-[6px] px-4 text-[.8rem] bg-[#dc143cd5] text-white rounded-lg hover:bg-[crimson]" onClick={() => navigate('/siswa')}>
                      Batal
                    </button>
                  </>
                ) : (
                  <button className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]">
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