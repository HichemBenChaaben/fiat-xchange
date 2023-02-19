import useEscapeKey from '../../hooks/useEscapeKey';

const Modal = ({ children, onClose }) => {
  useEscapeKey(onClose);
  return (
    <>
      <div className="modal">{children}</div>
      <div className="overlay" onClick={onClose}></div>
    </>
  );
};
export default Modal;
