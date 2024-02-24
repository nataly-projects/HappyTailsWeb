import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCategories } from '../services/categoryService';
import '../styles/CategoryCard.css';

const CategoryList = ({handleCategoryClick }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories();
        if (response) {
          setCategories(response);
        }
      } catch (error) {
        toast.error('An error occurred. Please try again later.');
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

  return (
    <ul>
        {categories.map((category) => (
            <li key={category._id} onClick={() => handleCategoryClick(category)}>
                <div className="card">{category.name}</div>
            </li>
        ))}
    </ul>
  );


};

export default CategoryList;
