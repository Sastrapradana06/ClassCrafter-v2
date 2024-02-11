import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getToken } from '../utils/function';

export default function AuthPage({ children }) {
  const [user, setUser] = useAppStore(
    useShallow((state) => [state.user, state.setUser])
  )

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const token = getToken('token')
  const idUser = getToken('idUser')

  const protectedRoutes = ['/tambah-siswa']

  useEffect(() => {

    if (!token || !idUser) {
      return navigate('/')
    }

    if (!user && protectedRoutes.includes(pathname)) {
      return navigate('/dashboard')
    }

    if (!user) {
      setUser()
    }


  }, [token, idUser, pathname])
  return children
}