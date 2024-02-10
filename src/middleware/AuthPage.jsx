import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../store/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getToken } from '../utils/function';

export default function AuthPage({ children }) {
  const [user, setUser] = useAppStore(
    useShallow((state) => [state.user, state.setUser])
  )

  const navigate = useNavigate()
  const token = getToken('token')
  const idUser = getToken('idUser')

  console.log({token, idUser});

  useEffect(() => {

    if (!token || !idUser) {
      navigate('/')
    }

    if (!user) {
      setUser()
    }


  }, [token, idUser])
  return children
}