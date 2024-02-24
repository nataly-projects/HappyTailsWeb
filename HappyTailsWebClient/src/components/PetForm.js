import React, { useState, useEffect  } from 'react';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import userDefaultImage from "../images/default-profile-image.jpg"; 
import { addCategory } from '../services/categoryService';
import '../styles/PetForm.css';

const PetForm = ({ pet, categories, onSubmit, onClose, titleText  }) => {
    const [editedPet, setEditedPet] = useState({ ...pet });
    const [errors, setErrors] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(pet.category ? editedPet.category.name : editedPet.category);
    const [isAddCategoryPopupOpen, setAddCategoryPopupOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categoriesOption, setCategories] = useState(categories);
    const [additionalPhotos, setAdditionalPhotos] = useState(editedPet.additionalImages.length > 0 ? editedPet.additionalImages : []); 
    console.log('PetForm: ', editedPet);

    useEffect(() => {
        if (categories) {
        setCategories(categories);
        console.log('categoriesOption: ', categoriesOption);

        }
    }, [categories]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    console.log('handleChange: ', name, ' ', value);
        setEditedPet((prevPet) => ({ ...prevPet, [name]: value }));
        console.log(editedPet);
    };

    const dropdownOptions = categoriesOption.map(category => ({
        value: category, // Store the entire object as the 'value'
        label: category.name, // Display the name in the dropdown
    }));

    dropdownOptions.push({
        value: 'add_category',
        label: 'Add Category',
    });

    const openAddCategoryPopup = () => {
        setNewCategoryName(''); 
        setAddCategoryPopupOpen(true);
    };
    
      const closeAddCategoryPopup = () => {
        setAddCategoryPopupOpen(false);
    };


    const handleNewCategorySubmit = async () => {
        const validationErrors = {};

        if (newCategoryName.trim() !== '') {
          try {
            const response = await addCategory(newCategoryName.trim())        
            if (response) {
               const updatedCategories = [...categories, response];
               setCategories(updatedCategories);
               setSelectedCategory(newCategoryName);
                handleChange({
                target: {
                    name: 'category',
                    value: response,
                },
                });
                toast.success(`The ${newCategoryName} category added successfully`);
               closeAddCategoryPopup();
            }
            
          } catch (error) {
            validationErrors.newCategory = error.response.data.error;
            setErrors(validationErrors);
        console.log(errors);
        console.error('Error checking category:', error);
          }
        } else {
          validationErrors.newCategory = 'New category name is required';
      console.log(validationErrors);
          setErrors(validationErrors);
      console.log(errors);
      console.log('Invalid category name');
        }
    };

    const onProfileImageDrop = (acceptedFiles) => {
        const selectedImage = acceptedFiles[0];
        setSelectedFile(selectedImage);
        setEditedPet((prevPet) => ({ ...prevPet, image: selectedImage }));
    };

    const onAdditionalPhotosDrop = (acceptedFiles) => {
        const newPhotos = acceptedFiles[0];
        const updatedAdiitionalPhotos = [...additionalPhotos, newPhotos];
        setAdditionalPhotos(updatedAdiitionalPhotos);
        setEditedPet((prevPet) => ({ ...prevPet, additionalImages: additionalPhotos }));
    };

    const profileImageDropzone = useDropzone({
        onDrop: onProfileImageDrop,
        accept: 'image/*',
        multiple: false,
      });
    
      const additionalPhotosDropzone = useDropzone({
        onDrop: onAdditionalPhotosDrop,
        accept: 'image/*',
        multiple: true,
      });

    const validateForm = () => {
        const validationErrors = {};
    
        if (!editedPet.name) {
          validationErrors.name = 'Name is required';
        }

        if (!editedPet.age) {
            validationErrors.age = 'Age is required';
        }

        if (!editedPet.weight) {
            validationErrors.weight = 'Weight is required';
        }

        if (!editedPet.description) {
            validationErrors.description = 'Description is required';
        }

        if (!editedPet.gender) {
            validationErrors.gender = 'Gender is required';
        }

        if (!editedPet.category) {
            validationErrors.category = 'Category is required';
        }

        if (!editedPet.image) {
            validationErrors.image = 'Image is required';
        }

        if (!editedPet.location) {
            validationErrors.location = 'Location is required';
        }
    
        setErrors(validationErrors);
    
        return Object.keys(validationErrors).length === 0;
    };

    const handleFormSubmit = (event) => {
        console.log('handleFormSubmit');
        event.preventDefault();

        // Validate the form
        const isValid = validateForm();

        if (isValid) {
            // Call the onSubmit function passed as a prop
            onSubmit(editedPet);
        }
    };

    return (
    <div className='pet-profile-card'>
     <div className='pet-header-container'>
         <h2>{titleText}</h2>
         <div className="pet-image-container">
             <img
             className="pet-image"
             src={ (editedPet.image &&  typeof editedPet.image === 'string') ? `http://localhost:3000/${editedPet.image}` : (selectedFile ? URL.createObjectURL(selectedFile) : userDefaultImage)} 
             alt="Pet Profile" />
             <div className="upload-overlay"  {...profileImageDropzone.getRootProps()}>
                 <input  {...profileImageDropzone.getInputProps()} />
                 <button className="upload-button">Upload Image</button>
             </div>
            {errors.image && <div className="error-message">{errors.image}</div>} 
         </div>
      </div>
        <form onSubmit={handleFormSubmit} className='addPetForm'>

        <label>
            Name:
            <input required name="name" type="text" value={editedPet.name} onChange={handleChange} />
            {errors.name && <div className="error-message">{errors.name}</div>}
        </label>

        <label className="gender-label">
            Gender:
            <div className="gender-radio-buttons">
                <label>
                <input
                    required
                    type="radio"
                    name="gender"
                    value="MALE"
                    checked={editedPet.gender === 'MALE'}
                    onChange={handleChange}
                />
                Male
                </label>

                <label>
                <input
                    required
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    checked={editedPet.gender === 'FEMALE'}
                    onChange={handleChange}
                />
                Female
                </label>
            </div>
            {errors.gender && <div className="error-message">{errors.gender}</div>}
        </label>

        <label>
            Age:
            <input required name="age" type="number" value={editedPet.age} onChange={handleChange} />
            {errors.age && <div className="error-message">{errors.age}</div>}
        </label>

        <label>
            Weight:
            <input required name="weight" type="number" value={editedPet.weight} onChange={handleChange} />
            {errors.weight && <div className="error-message">{errors.weight}</div>}
        </label>

        <label>
            Description:
            <textarea required name="description" value={editedPet.description} onChange={handleChange} />
            {errors.description && <div className="error-message">{errors.description}</div>}
        </label>

        <label>
            Category:
            <Select
            required
            className='select'
                name="category"
                options={dropdownOptions}
                value={dropdownOptions.find(option => option.value.name === selectedCategory)}
                onChange={(selectedOption) => {
                    if (selectedOption.value === 'add_category') {
                      openAddCategoryPopup();
                    } else {
                      setSelectedCategory(selectedOption.value.name);
                      handleChange({
                        target: {
                          name: 'category',
                          value: selectedOption.value,
                        },
                      });
                    }
                  }}
            />
            {errors.category && <div className="error-message">{errors.category}</div>}
        </label>

        {isAddCategoryPopupOpen && (
            <div className="add-category-popup">
            <label>
                New Category:
                <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                />
                {errors.newCategory && <div className="error-message">{errors.newCategory}</div>}

            </label>
            <button type="button" onClick={handleNewCategorySubmit}>Add Category</button>
            <button type="button" onClick={closeAddCategoryPopup}>Cancel</button>
            </div>
        )}
        <label>
            Location:
            <input required name="location" type="text" value={editedPet.location} onChange={handleChange} />
            {errors.location && <div className="error-message">{errors.location}</div>}
        </label>

      <div className="additional-photos-container">
        <h3>Additional Photos</h3>
        <div className="additional-photos">
          {additionalPhotos.map((photo, index) => (
            <img
              key={index}
              className="additional-photo"
              src={pet.additionalImages ? `http://localhost:3000/${photo}` : URL.createObjectURL(photo)}
              alt={`Additional Photo ${index + 1}`}
            />
          ))}
        </div>
        <div className="uploadImage" {...additionalPhotosDropzone.getRootProps()}>
          <input {...additionalPhotosDropzone.getInputProps()} />
          <p>Drag 'n' drop an image here, or click to select one</p>
        </div>
      </div>

        <div className='actions'>
            <button className='submitBtn' type="submit">Add</button>
            <button className='close' onClick={onClose}>Cancel</button>
        </div>
       
    </form>
    </div>
    );
};

export default PetForm;
