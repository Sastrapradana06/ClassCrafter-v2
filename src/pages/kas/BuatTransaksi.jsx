import { useEffect, useState } from "react";
import Container from "../../components/container/Container";

import { ToastContainer } from 'react-toastify';
import { handleToast } from "../../utils/function";

import { useNavigate, useParams } from "react-router-dom";

import Loading from "../../components/loading/Loading";
import { addTransaksi, getKasById } from "../../utils/api";

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';

export default function BuatTransaksi() {
  const [idUbah, setIdUbah] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const [transaksiKas, setTransaksiKas] = useState({
    jumlah: '',
    status: '',
    tanggal: '',
  })

  const [user, updateDataKas, updateDataKelas] = useAppStore(
    useShallow((state) => [state.user, state.updateDataKas, state.updateDataKelas])
  )

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      editKas(id)
    }

  }, [])

  const reset = () => {
    setTransaksiKas({
      jumlah: '',
      status: '',
      tanggal: '',
    });
    setIdUbah(undefined)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const newTransaksi = { ...transaksiKas }
    newTransaksi[name] = value.toLocaleString('id-ID')
    setTransaksiKas(newTransaksi)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const transaksi = { idUbah, user: user.username, ...transaksiKas }

    const { status, message, data } = await addTransaksi(transaksi)
    if (status) {
      updateDataKas(data.dataKas)
      updateDataKelas(data.updateSaldoKas)
      handleToast(message, 'success')
      reset()
      setTimeout(() => {
        navigate('/kas')
      }, 1000)
    } else {
      handleToast(message, 'error')
    }
    setIsLoading(false)
  }


  const editKas = async (id) => {
    setIsLoading(true)
    const { data } = await getKasById(id)
    setTransaksiKas({
      jumlah: data.jumlah,
      status: data.status,
      tanggal: data.tanggal,
    })
    setIdUbah(data.id)
    setIsLoading(false)
  }


  return (
    <Container>
      <ToastContainer />
      {isLoading ? (
        <Loading />
      ) : null}
      <div className="w-full h-max pt-[130px] flex flex-col items-center gap-2 justify-center lg:pl-[20%]  pb-[100px]">
        <div className="w-[90%] h-max rounded-md bg-[#ffff]">
          <div className="w-[100%] m-auto h-[60px] border-b border-gray-300 flex items-center p-4">
            <p className=" text-[#4D44B5] font-medium">{idUbah ? 'Ubah' : 'Buat'} Transaksi Kas</p>
          </div>
          <form action="" className="w-full h-max  flex flex-col gap-3 p-4 lg:flex-row lg:justify-center lg:gap-0 " onSubmit={handleSubmit}>
            <div className="w-full h-max flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={'jumlah'}>Jumlah  <span className="text-[crimson]">*</span></label>
                <input
                  type="text"
                  name='jumlah'
                  value={transaksiKas.jumlah}
                  onChange={handleInputChange}
                  placeholder="120000"
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor={'tanggal'}>Tanggal Transaksi  <span className="text-[crimson]">*</span></label>
                <input
                  type="date"
                  name='tanggal'
                  value={transaksiKas.tanggal}
                  onChange={handleInputChange}
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                  required
                />
              </div>
              <div className="w-full flex flex-col gap-2 text-[.9rem]">
                <label htmlFor="status">Status Transaksi  <span className="text-[crimson]">*</span></label>
                <select
                  name="status"
                  value={transaksiKas.status}
                  onChange={handleInputChange}
                  className="w-full border p-3 outline-[#4D44B5] rounded-lg"
                  disabled={idUbah}
                >
                  <option value="none">Pilih</option>
                  <option value="Masuk">Masuk</option>
                  <option value="Keluar">Keluar</option>
                </select>
              </div>
              <div className="w-full">
                {idUbah ? (
                  <>
                    <button className="py-[6px] px-4 text-[.8rem] bg-[#4D44B5] text-white rounded-lg hover:bg-[#383085]">
                      Ubah
                    </button>
                    <button className="ml-2 py-[6px] px-4 text-[.8rem] bg-[#dc143cd5] text-white rounded-lg hover:bg-[crimson]" onClick={() => navigate('/kas')}>
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