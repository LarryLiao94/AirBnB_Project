import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReviewForm';

function EditReviewFormModal({ userSpotId, id }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit_button' onClick={() => setShowModal(true)}>Edit<i className="fa-solid fa-arrows-rotate"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm reviewId={id} userSpotId={userSpotId} closeModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditReviewFormModal;