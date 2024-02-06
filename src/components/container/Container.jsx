import PropTypes from 'prop-types';
import NavContainer from './NavContainer';
import Footer from '../footer/Footer';
// import Cookies from 'js-cookie';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

function Container({ children }) {

  // const navigate = useNavigate()
  
  // useEffect(() => {
  //   const token = Cookies.get('token');
  //   if(!token) {
  //     navigate('/')
  //   }
  // }, [])

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