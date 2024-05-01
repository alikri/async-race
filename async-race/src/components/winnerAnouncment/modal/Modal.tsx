import './modal.styles.scss';
import { ReactNode } from 'react';
import CloseIcon from '../../images/close.png';

interface Props {
  show: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ show, children, onClose }: Props) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-window-wrapper">
      <div className="modal-window">
        {children}
        <button className="close-button" type="button" onClick={onClose}>
          <img className="close-icon" src={CloseIcon} alt="Close" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
