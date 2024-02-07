import PropTypes from 'prop-types';

export default function ShowModal({children}) {

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-[1000] text-white">
      {children}
    </div>
  )
}

ShowModal.propTypes = {
  children: PropTypes.node,
};