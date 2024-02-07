import PropTypes from 'prop-types';
import NavContainer from './NavContainer';
import Footer from '../footer/Footer';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/function';

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';

function Container({ children }) {
  const [user] = useAppStore(
    useShallow((state) => [state.user])
  )
  const navigate = useNavigate()
  
  useEffect(() => {
    const token = getToken()
    if(!token && !user) {
      navigate('/')
    }
  }, [])

  return (
    <div className="w-full min-h-[100vh] max-h-max relative bg-[#E6EBEE] text-black ">
      <NavContainer />
      {children}
      <Footer />
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;