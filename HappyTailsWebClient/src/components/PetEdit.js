import React from 'react';
import PetForm from './PetForm';
import '../styles/PetEdit.css';

const PetEdit = ({ pet, categories, onClose, onSave }) => {

console.log('pet: ', pet);

  const handleSave = (event) => {
    onSave(event);
    console.log(event);
    onClose();
  };

  return (
      <div className='details-container'>
        <PetForm 
        pet={pet} 
        categories={categories} 
        onSubmit={handleSave} 
        onClose={onClose}
        titleText={`Edit ${pet.name} information`}
        />
      </div>
  );

};

export default PetEdit;
