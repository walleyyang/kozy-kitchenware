import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';

import 'bootstrap/dist/css/bootstrap.min.css';
import './product.styles.css';

export const Product = props => {
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  }

  const hideModal = () => {
    setIsOpen(false);
  }

  return (
    <div className='product-container'>
      <h5>{props.product.name}</h5>
      <img alt={props.product.name} src={`${process.env.PUBLIC_URL}images/${props.product.image}`} />
      <p className='description'>{props.product.description}</p>
      <p className='learn-more' onClick={showModal}>Learn More</p>
      <div className='product-tag-container'>{props.product.tags.map((tag, index) => <span key={index} className='tag'>{tag}</span>)}</div>
      <Modal show={isOpen} onHide={hideModal}>
        <ModalHeader>
          <ModalTitle><h3>{props.product.name}</h3></ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div>
            <img alt={props.product.name} src={`${process.env.PUBLIC_URL}images/${props.product.image}`} />
          </div>
          <div className='modal-description'>
            {props.product.description}
          </div>
        </ModalBody>
        <ModalFooter>
          <button onClick={hideModal}>Cancel</button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
