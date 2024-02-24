import React, { useState, useEffect  } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories } from '../services/categoryService';
import { addPet } from '../services/petService';
import PetForm from './PetForm';
import '../styles/AddPetForm.css';

const AddPet = ({onUpdate, onClose}) => {
    const [categoryError, setCategoryError] = useState(''); 
    const [categoryOptions, setCategoryOptions] = useState([]);
    const pet = {
      name: '',
      gender: '',
      age: '',
      weight: '',
      description: '',
      category: null, 
      location: '',
      image: null, 
      additionalImages: []
    };

    const userId = useSelector((state) => state.userId);
console.log('userId: ', userId);

    useEffect(() => {
        // Fetch categories from the server
        const fetchCategories = async () => {
          try {
            const response = await getCategories();
            if (response) {
              setCategoryOptions(response);
            }
          } catch (error) {
            toast.error('An error occurred. Please try again later.');
            setCategoryError('Error fetching categories');
          }
        };
    
        fetchCategories();
      }, []);

 
  const handleSubmit = async (event) => {
    console.log('handleSubmit on Add pet: ', event);
    const newPet = event;
    console.log('new pet: ', newPet);
    const formData = new FormData();
    formData.append('name', newPet.name);
    formData.append('age', newPet.age);
    formData.append('gender', newPet.gender);
    formData.append('weight', newPet.weight);
    formData.append('description', newPet.description);
    formData.append('location', newPet.location);
    formData.append('owner', userId);
    formData.append('category', newPet.category._id);
    formData.append('image', newPet.image);
    formData.append('additionalImages', newPet.additionalImages);
    try {
      const response = await addPet(formData);
      console.log('response: ', response);
      if (response) {
          onUpdate();
          toast.success(`${newPet.name} added successfully`);
      }
    } catch(error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }   
  };


  return (
    <div className='addPetForm'>
    <PetForm 
      pet={pet} 
      categories={categoryOptions} 
      onSubmit={handleSubmit}
      titleText={'Add new pet for adoption'}
      onClose={onClose}
    />;
    </div>
  );

};

export default AddPet;