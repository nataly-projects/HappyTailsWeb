import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/AdoptionConfirmation.css';

const AdoptionConfirmation = ({ onClose, onAdopt, pet, setAdoptMessage }) => {

  const [adoptionMessage, setAdoptionMessage] = useState('');

  const handleAdopt = () => {
    console.log('adoptionMessage: ', adoptionMessage);
    setAdoptMessage(adoptionMessage);
    onAdopt(); 
    setAdoptionMessage('');
  };

  return (
    <div className="adoption-confirmation">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Request for Adoption {pet.name}</h2>
          <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="modal-body">
          <p>
            Congratulations on choosing to adopt {pet.name}! Before finalizing the adoption, please
            take a moment to provide some information and a message to the pet owner. 
          </p>
          
          <div className="pet-details">
            <h3> Meet {pet.name}: </h3>
            <img src={`http://localhost:3000/${pet.image}`} alt={pet.name} className="pet-image" />
                <p> a {pet.gender.toLowerCase()}{' '} {pet.age}-year-old.</p>
                <p>{pet.description} </p>
                <p>Age: {pet.age}</p>
                <p>Weight: {pet.weight}</p>
            
          </div>
          <label htmlFor="adoptionMessage">Your Message to the Pet Owner:</label>
          <textarea
            id="adoptionMessage"
            name="adoptionMessage"
            rows="4"
            cols="50"
            value={adoptionMessage}
            onChange={(e) => setAdoptionMessage(e.target.value)}
          ></textarea>
          <p>
            Once you click "Adopt", a request will be sent to the pet owner. The owner will receive
            your message and information. You will be notified once the owner responds to your
            request.
          </p>
        </div>
        <div className="modal-footer">
          <button className="adopt-button" onClick={handleAdopt}>
            <FontAwesomeIcon icon={faHandHoldingHeart} /> Adopt {pet.name}
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

};

export default AdoptionConfirmation;
