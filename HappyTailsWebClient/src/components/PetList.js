import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories } from '../services/categoryService';
import { adoptPet, deletePet, editPet } from '../services/petService';
import PetCard from './PetCard';
import PetEdit from './PetEdit';
import AdoptionConfirmation from './AdoptionConfirmation';
import '../styles/PetList.css';

const PetList = ({ pets, onUpdate  }) => {

    const [showAdoptionConfirmation, setShowAdoptionConfirmation] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
    const [adoptMessage, setAdoptMessage] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);

    const userId = useSelector((state) => state.userId);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await getCategories();
          if (response) {
            setCategoryOptions(response);
          }
        } catch (error) {
          toast.error('An error occurred. Please try again later.');
        }
      };
      fetchCategories();
    }, []);

    const handleAdopt = (pet) => {
      setSelectedPet(pet);
      setShowAdoptionConfirmation(true);
    };

    const handleAdoptRequest = () => {
      setShowAdoptionConfirmation(false);
  console.log('handleAdoptRequest: ', selectedPet);
      onAdopt(selectedPet, adoptMessage);
    }

    const onAdopt = async (pet, adoptMessage) => {
    console.log('onAdopt: ', adoptMessage);
    try {
      const response = await adoptPet(pet, adoptMessage, userId);
      console.log('response: ', response);
      if (response) {
        //TODO - need to refresh the page - now the pet should not be shown;
        toast.success(`Request for adopt ${pet.name} sent successfully`);
      }
    } catch(error){
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
          toast.error('An error occurred. Please try again later.');
      }
    }
      
  }

    const handleEdit = (pet) => {
      setSelectedPet(pet);
      setShowEditForm(true);
    };

  
    const handleDelete = (pet) => {
      console.log('handleDelete');
      const isConfirmed = window.confirm(`Are you sure you want to delete ${pet.name}?`);

      if (isConfirmed) {
        setSelectedPet(pet);
        onDelete(pet._id);
      }
    };

    const onDelete = async (petId) => {
        try {
          const response = await deletePet(petId);
          if (response) {
            onUpdate();
              //TODO - need to refresh the page
              toast.success(`Pet deleted successfully`);
          }
        } catch(error) {
          if (error.response && error.response.data && error.response.data.error) {
            toast.error(`Error: ${error.response.data.error}`);
          } else {
            toast.error('An error occurred. Please try again later.');
          }
        }
       
    }

    const handleClose = () => {
      setShowAdoptionConfirmation(false);
      setShowEditForm(false);
      setSelectedPet(null);
    };

    const handleSaveEdit = (pet) => {
      setShowEditForm(false);
      onEdit(pet);
    };

    const onEdit = async (pet) => {
      try {
        const response = await editPet(pet);
        console.log('response: ', response);
        if (response) {
            onUpdate();
            //TODO - need to refresh the page
            toast.success(`${pet.name} details updated successfully`);
        }
      } catch(error) {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(`Error: ${error.response.data.error}`);
        } else {
          toast.error('An error occurred. Please try again later.');
        }
      }   
  }

    return (
      <div className='list'>
       {showEditForm ? 
       (
        <PetEdit 
        pet={selectedPet} 
        categories={categoryOptions} 
        onClose={handleClose} 
        onSave={handleSaveEdit}/>
        ) : (
        pets.map((pet) => (
          <PetCard  
            key={pet.id}
            pet={pet}
            onAdopt={() => handleAdopt(pet)} 
            onEdit={() => handleEdit(pet)}
            onDelete={() => handleDelete(pet)}
            onClose={handleClose}
          />
        ))
      )}
      {showAdoptionConfirmation && (
        <AdoptionConfirmation
          pet={selectedPet}
          onClose={handleClose}
          setAdoptMessage={setAdoptMessage}
          onAdopt={handleAdoptRequest} 
        />
      )}
      </div>
    );

};

export default PetList;
