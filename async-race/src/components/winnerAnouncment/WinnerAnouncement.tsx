import { useState, useEffect } from 'react';
import Modal from './modal/Modal';
import { WinnerDataForModal } from '../../types';

interface Props {
  winner: WinnerDataForModal | null;
}

const WinnerAnnouncement = ({ winner }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowWinner = () => {
    setShowModal(true);
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 5000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (winner) {
      handleShowWinner();
    }
  }, [winner]);

  return (
    <div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Winner:</h2>
        <h1>{winner?.name}</h1>
        <p>Speed: {winner?.time}!</p>
      </Modal>
    </div>
  );
};

export default WinnerAnnouncement;
