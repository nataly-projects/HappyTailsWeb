import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchCategoryPets } from '../services/petService';
import PetList from '../components/PetList';
import '../styles/CategoryDetailsPage.css';

const CategoryDetailsPage = ({categoryName, setSelectedCategory}) => {
    console.log(categoryName);
    const [pets, setPets] = useState([]);
    const userId = useSelector((state) => state.userId);
console.log(userId);

  const handleBackButtonClick = () => {
    setSelectedCategory(null);
  };

    useEffect(() => {
      const loadPets = async () => {
        try {
          const petsArray = await fetchCategoryPets(categoryName, userId);
          if (petsArray) {
            setPets(petsArray);
          }
        } catch (error) {
          toast.error('An error occurred. Please try again later.');
        }
      };
      loadPets();
    }, [categoryName, userId]);
  
  
    return (
      <div className='pet-category-container'>
        <h2>{categoryName}</h2>
        <button onClick={handleBackButtonClick}>Back</button>
        {pets.length > 0 ? (
        <PetList pets={pets} />
        ) : (
          <p>There is no pets in this category yet.</p>
        )}
      </div>
    );
  };

export default CategoryDetailsPage;


