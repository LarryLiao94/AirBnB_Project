import { Modal } from "../../context/Modal";
import React, {useState} from 'react';
import CreateSpotForm from "./CreateSpotForm";
import './CreateSpotFormModal.css';

export default function CreateSpotFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='add_listing_button edit_button' onClick={() => setShowModal(true)}>Become a Host</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm closeModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

