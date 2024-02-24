import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserAddedPets, getUserAdoptedPets } from '../services/petService';
import AddPet from './AddPet';
import PetList from './PetList';
import '../styles/PetSection.css';

const PetsSection = () => {

    const [userAddedPets, setUserAddedPets] = useState([]);
    const [adoptedPets, setAdoptedPets] = useState([]);
    const [showAddPetForm, setShowAddPetForm] = useState(false);

    const userId = useSelector((state) => state.userId);
console.log('userId: ', userId);

    const fetchPetsData = async () => {
      if (userId) {
        try {
          const response = await getUserAddedPets(userId);
      console.log('response: ', response);
          setUserAddedPets(response);
  
          const adoptResponse = await getUserAdoptedPets(userId);
      console.log('adoptResponse: ', adoptResponse);
          setAdoptedPets(adoptResponse);
        } catch (error) {
          console.error('Error fetching pets data:', error);
          toast.error(`Error fetching pets data: ${error}`);
        }
      }  
    };

    useEffect(() => {
        fetchPetsData();
      }, [userId]);

    const handleAddPetsClick = () => {
        setShowAddPetForm(true);
    };

    const handleUpdatePets = () => {
      setShowAddPetForm(false);
      fetchPetsData(); // Refetch pets data after an update
    };

    const onClose = () => {
      setShowAddPetForm(false);
    };


    return (
    <div>
    {!showAddPetForm ?
    ( <div className='pet-section-container'>
      <p>
        Welcome to the Pets Section! <br></br> Here, you can view the pets you've added for adoption
        and the pets you've adopted.
      </p>
      <section>
        <h2>Pets Added for Adoption</h2>
        {userAddedPets.length > 0 ? (
            <PetList 
            pets={userAddedPets}
            onUpdate={handleUpdatePets}
            />
        ) : (
          <p>No pets added for adoption.</p>
        )}
      </section>

      <section>
        <h2>Pets Adopted</h2>
        {adoptedPets.length > 0 ? (
            <PetList pets={adoptedPets} />
        ) : (
          <p>No pets adopted.</p>
        )}
      </section>

      <button onClick={handleAddPetsClick}>Add Pets for Adoption</button>
      </div>
    ) : (
        <AddPet 
        onUpdate={handleUpdatePets} 
        onClose={onClose} 
        />
    )}

    </div>
    );
};

export default PetsSection;