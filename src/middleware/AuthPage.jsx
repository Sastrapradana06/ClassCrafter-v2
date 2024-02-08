import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../store/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getToken } from '../utils/function';

export default function AuthPage({children }) {
  const [user] = useAppStore(
    useShallow((state) => [state.user])
  )

  const navigate = useNavigate()
  const token = getToken()

  useEffect(() => {

    if(!token || !user) {
      navigate('/')
    }
  }, [token, user])

  return children 
}