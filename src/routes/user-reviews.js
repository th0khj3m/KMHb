import React from "react";
import { Container } from "@mui/material";
import ModalRender from "../components/modal-render";
import ReviewModal from "../components/modal/review-modal";
import useModal from "../hooks/useModal";
import { useSelector, useDispatch } from "react-redux";
import { removeReview } from "../store/review/review.actions";
import ReviewCard from "../components/review-card";

const options = ["Edit", "Delete"];

export default function UserReviews() {
  const dispatch = useDispatch();
  const { userReviews } = useSelector((state) => state.review);
  const { openModal, handleOpenModal, handleCloseModal, modalIndex } =
    useModal();

  const handleOptionSelect = (option, review) => {
    // Additional logic can be added here based on the selected option
    if (option === "Edit") {
      handleOpenModal(review);
      // Handle edit action
      // Example: handleEdit(review);
      // You can pass the review data to the edit modal using state or props
    } else if (option === "Delete") {
      dispatch(removeReview(review.review_id));
    }
  };

  return (
    <Container maxWidth="xl">
      {userReviews?.map((review) => (
        <ReviewCard
          key={review.review_id}
          review={review}
          options={options}
          handleOptionSelect={handleOptionSelect}
          isUser={true}
        />
      ))}
      <ModalRender
        isOpen={openModal}
        handleClose={handleCloseModal}
        Component={ReviewModal}
        modalProps={{
          review: modalIndex,
          handleCloseModal,
        }}
      />
    </Container>
  );
}
