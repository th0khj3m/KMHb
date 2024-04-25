import { useState } from "react";

// Custom hook for modal handling
export default function useModal() {
  const [openModal, setOpenModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);

  const handleOpenModal = (modalIndex) => {
    setOpenModal(true);
    setModalIndex(modalIndex);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalIndex(null);
  };

  return {
    openModal,
    modalIndex,
    handleOpenModal,
    handleCloseModal,
  };
}
