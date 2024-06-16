/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

export default function ShowModal({ children, closeModal }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-[1000] text-white">
      <div className="w-full h-[100vh] " onClick={closeModal}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-max flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}

ShowModal.propTypes = {
  children: PropTypes.node,
};
