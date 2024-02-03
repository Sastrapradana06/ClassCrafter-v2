import PropTypes from 'prop-types';
import NavContainer from './NavContainer';

function Container({children}) {
  return (
    <div className="w-full min-h-[100vh] max-h-max relative bg-[#E6EBEE] text-black">
      <NavContainer />
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;