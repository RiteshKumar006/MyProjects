import { useState } from 'react';
import Modal from '../components/Modal';
import Button from '../components/Button';

function ModalPage(){
  const [showModal, setShowModal] = useState(false);
  const handleClick = () =>{
    setShowModal(!showModal);
  }

  const handleClose =() =>{
    setShowModal(false)
  }

  const actionBar  = (<div>
    <Button primary onClick={handleClose}>I Accept</Button>
  </div>)

  const modal = <Modal onClose ={handleClose} onActionBar ={actionBar} >
      <p>Here is the important aggrement for you to accept</p>
    </Modal>
return (
  <div>
    <Button primary onClick={handleClick} >Open Modal</Button>
    {showModal && modal}
  </div>
)

}

export default ModalPage;