import { useState } from "react";

// Custom hook for modal handling
export function useModal() {
  const [openModal, setOpenModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);

  const handleOpenModal = (index) => {
    setOpenModal(true);
    setModalIndex(index);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalIndex(null);
    // Optionally reset rating state here if needed
  };

  return {
    openModal,
    modalIndex,
    handleOpenModal,
    handleCloseModal,
  };
}
