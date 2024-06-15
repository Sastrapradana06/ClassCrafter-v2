/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

export default function ShowModal({ children, closeModal }) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-[1000] text-white"
      onClick={closeModal}
    >
      {children}
    </div>
  );
}

ShowModal.propTypes = {
  children: PropTypes.node,
};
