import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { getAuthUser, setAuth } from "../../utils/api";

import { ToastContainer } from 'react-toastify';
import { handleToast } from "../../utils/function";
import Loading from "../../components/loading/Loading";


const initialFormData = {
  ketua_kelas: { id: '', value: '', type: 'password', disabled: true },
  sekretaris: { id: '', value: '', type: 'password', disabled: true },
  bendahara: { id: '', value: '', type: 'password', disabled: true },
  member: { id: '', value: '', type: 'password', disabled: true },
};

export default function DataAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value: value
      }
    }));
  };

  const togglePasswordVisibility = (name) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        type: prevData[name].type === 'password' ? 'text' : 'password',
        disabled: !prevData[name].disabled
      }
    }));
  };

  const getAuth = async () => {
    const { data } = await getAuthUser()
    setFormData(prev => ({
      ketua_kelas: { ...prev.ketua_kelas, value: data[0].password, id: data[0].id },
      sekretaris: { ...prev.sekretaris, value: data[1].password, id: data[1].id },
      bendahara: { ...prev.bendahara, value: data[2].password, id: data[2].id },
      member: { ...prev.member, value: data[3].password, id: data[3].id }
    }))
  }

  const editAuth = async (id, value) => {
    setIsLoading(true)
    const { status, message, data } = await setAuth({ id, value })
    if (status) {
      setFormData(prev => ({
        ...prev,
        [data.jabatan]: {
          ...prev[data.jabatan],
          value: data.password
        }
      }))
      handleToast(message, 'info')
    } else {
      handleToast(message, 'error')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getAuth()
  }, [])



  return (
    <div className="w-full h-max bg-[#404556] rounded-lg flex flex-col gap-7 py-6 px-2">
      <ToastContainer />
      {isLoading ? (
        <Loading />
      ) : null}
      {Object.keys(formData).map(key => (
        <div key={key} className={`w-full h-max flex flex-col gap-2 ${key === 'ketua_kelas' ? 'bg-[#B80000]' : key == 'sekretaris' ? 'bg-[#40679E]' : key == 'bendahara' ? 'bg-[#0D9276]' : 'bg-[#4D4D4D] text-black'} p-2 rounded-md text-white`}>
          <div>
            <p className="capitalize">{key == 'ketua_kelas' ? 'Ketua Kelas' : key}</p>
          </div>
          <div className="flex items-center gap-2 lg:gap-5">
            <input
              type={formData[key].type}
              name={key}
              className="bg-transparent border w-[70%] py-1 px-3 rounded-md outline-none"
              value={formData[key].value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              disabled={formData[key].disabled}
            />
            <div className="flex gap-2 lg:gap-4">
              <button className='bg-[#dca714] py-1 px-4 rounded-md hover:bg-[#af8936] cursor-pointer' title='detail' onClick={() => togglePasswordVisibility(key)}>
                <FaRegEye size={20} />
              </button>
              <button className='bg-indigo-600 py-1 px-4 rounded-md hover:bg-sky-500' title='edit' onClick={() => editAuth(formData[key].id, formData[key].value)} disabled={formData[key].disabled}>
                <LuPencilLine size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}