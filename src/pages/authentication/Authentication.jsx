import { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import { FaRegEye } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { getAuthUser, setAuth } from "../../utils/api";

import { ToastContainer } from 'react-toastify';
import { handleToast } from "../../utils/function";

const initialFormData = {
  ketua_kelas: { id: '', value: '', type: 'password', disabled: true },
  sekretaris: { id: '', value: '', type: 'password', disabled: true },
  bendahara: { id: '', value: '', type: 'password', disabled: true },
  member: { id: '', value: '', type: 'password', disabled: true },
};

export default function Authentication() {
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
  }

  useEffect(() => {
    getAuth()
  }, [])



  return (
    <Container>
      <ToastContainer />
      <div className="w-full h-[100vh] pt-[70px] flex justify-center lg:pl-[20%] ">
        <div className="w-[90%] h-[100vh] flex flex-col gap-4 items-center lg:w-[60%]">
          <h1 className="text-[1.3rem] text-[#4d44D5]">Authentication</h1>
          <div className="w-full h-max bg-[#ffff] rounded-lg flex flex-col gap-7 py-6 px-2">
            {Object.keys(formData).map(key => (
              <div key={key} className={`w-full h-max flex flex-col gap-2 bg-${key === 'ketua_kelas' ? '[crimson]' : key == 'sekretaris' ? '[#307fb8]' : key == 'bendahara' ? '[#2ac12a]' : 'sky-300'} p-2 rounded-md text-white`}>
                <div>
                  <p className="capitalize">{key}</p>
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
                    <button className='bg-sky-400 py-1 px-4 rounded-md hover:bg-sky-500' title='edit' onClick={() => editAuth(formData[key].id, formData[key].value)}>
                      <LuPencilLine size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}