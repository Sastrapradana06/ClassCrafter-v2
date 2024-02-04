import PropTypes from 'prop-types';
import NavContainer from './NavContainer';
import Footer from '../footer/Footer';

function Container({ children }) {
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