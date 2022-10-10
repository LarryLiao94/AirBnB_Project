import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from './EditSpotForm';

function EditSpotFormModal({ userSpotId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit_button' onClick={() => setShowModal(true)}>Edit Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm userSpotId={userSpotId} closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default EditSpotFormModal;