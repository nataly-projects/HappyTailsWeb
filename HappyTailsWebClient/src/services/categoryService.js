import axios from 'axios';


export const getCategories = async () => {
    try {
        const response = await axios.get('/api/categories');
        if (response && response.data) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const addCategory = async (newCategoryName) => {
    try {
        const response = await axios.post('/api/categories/', { name: newCategoryName });            
        if (response && response.data) {
            return response.data;
        }
        return null;
    } catch (error) {
        throw error;
    }
};



