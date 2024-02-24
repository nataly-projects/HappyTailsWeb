import React, { useState, useEffect  } from 'react';
import Select from 'react-select'; 
import { toast } from 'react-toastify';
import { getPetsByFilters } from '../services/petService';
import { getCategories } from '../services/categoryService';
import '../styles/Filters.css';

const FiltersComponent = ({setFilteredPets} ) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAge, setSelectedAge] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await getCategories();
          if (response) {
            setCategories(response);
          } 
        } catch (error) {
          console.log(error);
          toast.error('An error occurred. Please try again later.');
        }
      };
      fetchCategories();
    }, []);

    const dropdownOptions = categories.map(category => ({
      value: category, 
      label: category.name, 
    }));

    const genderOptions = [
      { value: 'MALE', label: 'Male' },
      { value: 'FEMALE', label: 'Female' },
    ];

    const handleFiltersSubmit = async (event) => {
      event.preventDefault();
      // check if at least one filter is chosen
      if (!selectedCategory && !selectedGender && !selectedAge && !selectedLocation) {
        toast.error('Please select at least one filter.');
        return;
      }
      const updatedFilters = {
        category: selectedCategory || null,
        gender: selectedGender || '',
        age: selectedAge || '',
        location: selectedLocation || '',
      };
      console.log('updatedFilters: ', updatedFilters);

      try{
        const filteredPets = await getPetsByFilters(updatedFilters);
        if (filteredPets.length === 0) {
          toast.info('No pets match the selected filters. Try something else.');
        }
        setFilteredPets(filteredPets);
      } catch (error){
        toast.error('An error occurred. Please try again later.');
      }

  };


    return (
      <div className="filters-container">
        <form className='filter-form' onSubmit={handleFiltersSubmit} >
          <label>
            Category:
            <Select
              className='select'
              name="category"
              options={dropdownOptions}
              value={dropdownOptions.find(option => option.value.name === selectedCategory)}
              onChange={(selectedOption) => {
                setSelectedCategory(selectedOption.value);
                }}
              />
          </label>
          <label>
            Gender:
          <Select
            className="select"
            options={genderOptions}
            value={genderOptions.find((option) => option.value === selectedGender)}
            onChange={(selectedOption) => {
              setSelectedGender(selectedOption.value);
              console.log(selectedGender);
            }}
          />
          </label>
          <label>
            Location:
            <input 
            type="text" 
            value={selectedLocation} 
            onChange={(e) => {
              setSelectedLocation(e.target.value);
            }}
            placeholder="Enter location" 
            />
          </label>
          <label>
            Age:
            <input 
            type="number" 
            value={selectedAge} 
            onChange={(e) => {
              setSelectedAge(e.target.value);
            }}
            placeholder="Enter Age" 
            />
          </label>
          <button type='submit'>Apply Filters</button>
        </form>
      </div>
      
    );
  };

  export default FiltersComponent;