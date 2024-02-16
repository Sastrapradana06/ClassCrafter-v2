import { useState } from 'react'
import './App.css'

import image2 from '/student2.svg'
import { useNavigate } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import { handleToast, setCookies } from './utils/function';
import { handleLoginSiswa } from './utils/api';

import { useShallow } from 'zustand/react/shallow'
import useAppStore from './store/store';


function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [updateUser] = useAppStore(
    useShallow((state) => [state.updateUser])
  )

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { status, message, token, data } = await handleLoginSiswa(email, password)
      if (status) {
        handleToast(message, 'success')
        setCookies('token', token)
        setCookies('idUser', data.id)
        updateUser(data)
        navigate('/dashboard')
      } else {
        handleToast(message, 'warning')
      }
    } catch (error) {
      console.log(error);
      handleToast('Maaf, Terjadi Kesalahan Teknis', 'error')
    }
    setEmail('')
    setPassword('')
    setIsLoading(false)
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center gap-3 bg-black" >
      <ToastContainer />
      <div className="w-full h-max">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex justify-center items-center gap-2 w-full text-orange-400">
            <img src={image2} alt="" width={50} />
            <p>ClassCrafter.com</p>
          </div>
          <form action="" className='w-[90%] rounded-lg p-2 h-max border flex flex-col gap-3 bg-[#ecebeb] text-black lg:w-[40%] lg:gap-5' onSubmit={handleLogin}>
            <div className="">
              <h1 className='text-[1.3rem] font-medium text-center'>Login to account</h1>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <input
                type="email"
                name='email'
                placeholder='Email Adress'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-[100%] py-2 px-3 rounded-sm bg-slate-200 outline-none border border-black'
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-[100%] py-2 px-3 rounded-sm bg-slate-200 outline-none border border-black'
              />
            </div>
            <div className="">
              <button type='submit' className='bg-orange-400 py-1 px-6 rounded-sm tracking-[2px] text-white hover:bg-[#e8af47] transition-all duration-200' disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
