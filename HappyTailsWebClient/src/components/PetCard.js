import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faLocationDot, faTrash, faEdit, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/PetCard.css';


const PetCard = ({pet, onAdopt, onEdit, onDelete}) => {
    const [extended, setExtended] = useState(false);
    const userId = useSelector((state) => state.userId);
console.log('pet: ', pet);

    const toggleExtended = () => {
        setExtended(!extended);
    };

    
    return (
        <div className={`pet-card ${extended ? 'extended' : ''}`} onClick={toggleExtended}>
        <img src={`http://localhost:3000/${pet.image}`} alt={pet.name} className="pet-image" />

        <div className="pet-details">
            <div className='name-gender-section'>
                <h3>{pet.name}</h3>
                {pet.gender === 'MALE' ? (
                    <FontAwesomeIcon icon={faMars} className="gender-icon" /> 
                ) : (
                    <FontAwesomeIcon icon={faVenus} className="gender-icon" /> 
                )} 
            </div>
            <div>
                <FontAwesomeIcon icon={faLocationDot} className="location-icon" /> 
                <p className="location">{pet.location}</p>
            </div>     
            
        </div>
        {extended && (
            <div className="extended-details">
                <p>About {pet.name}: {pet.description}</p>
                <p>Category: {pet.category.name}</p>
                <p>Age: {pet.age}</p>
                <p>Weight: {pet.weight}</p>
                {
                    pet.additionalImages && pet.additionalImages.length > 0 && (
                    <>
                     <p>Additional Photos:</p>
                    <div className="additional-photos">
                        {pet.additionalImages.map((photo, index) => (
                            <img
                            key={index}
                            className="additional-photo"
                            src={`http://localhost:3000/${pet.image}`}  

                            alt={`Additional Photo ${index + 1}`}
                            />
                        ))}
                    </div>
                    </>
                   
                    )
                }
                <div className='buttons'>
                    {pet.owner === userId ? 
                    (
                    <>
                        <button onClick={onDelete}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                        <button onClick={onEdit}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                    </>
                    ) : (
                        <button onClick={onAdopt}>
                        <FontAwesomeIcon icon={faHandHoldingHeart} /> Adopt Me
                        </button>
                    )}
                    
                </div>

            </div>
        )}
        </div>
    );
};

export default PetCard;
