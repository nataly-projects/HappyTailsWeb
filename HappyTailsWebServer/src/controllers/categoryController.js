const { Category } = require('../models/categoryModel');
const { PetStatus } = require('../utils/enums');


async function getCategories(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function addCategory(req, res) {
    const { name } = req.body;
  console.log('addCategory: ', name);
    if (!name) {
      return res.status(400).json({ error: 'Name is required for a category' });
    }
  
    try {
      // check if a category with the same name already exists
      const existingCategory = await Category.findOne({ name: { $regex: new RegExp(name , 'i') } });

console.log(existingCategory);
      if (existingCategory) {
        return res.status(409).json({ error: 'Category with this name already exists' });
      }
  
      // if no existing category, create a new one
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

async function deleteCategory(categoryId) {
  try {

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
        return res.status(404).json({ error: 'Category not found.' });
    }
    return res.json({ message: 'Category deleted successfully.' });    
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
  }

}
  

module.exports = {
    getCategories,
    addCategory
};