import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateReviewForm from "./index";

function CreateReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="add_review" onClick={() => setShowModal(true)}>
        Add Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReviewForm
            closeReviewModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;
