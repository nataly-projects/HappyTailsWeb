const { Pet } =  require('../models/petModel');
const { Category } =  require('../models/categoryModel');
const multer = require('multer');
const { PetStatus } = require('../utils/enums');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

async function getPetsByFilters(req, res) {

    const { filters } = req.query;
    try {
        const parsedFilters = JSON.parse(filters);
        let query = {};

        // apply filters to the query
        if (parsedFilters.category) {
            console.log('yes category');
            query.category = parsedFilters.category._id;
        }
        if (parsedFilters.gender) {
            console.log('yes sex');
            query.gender = parsedFilters.gender;
        }
        if (parsedFilters.age) {
            console.log('yes age');
            query.age = parsedFilters.age;
        }
        if (parsedFilters.location) {
            console.log('yes location');
            query.location = parsedFilters.location;
        }
        // find pets based on the query
        const pets = await Pet.find(query);

        return res.status(200).json({ pets });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getPetsById(req, res) {
    const { petId } = req.params;
    try {
        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found.' });
        }
        return res.status(200).json({pet});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

async function getPetsByCategory(req, res) {
    const { categoryName } = req.params;
    const { userId } = req.query;
    try {
        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            return res.status(404).json({ error: `Category not found: ${categoryName}` });
        }
        let pets = [];
        if (userId != 'null') {
            pets = await Pet.find({ category: category._id, owner: { $ne: userId }, status: PetStatus.ACTIVE }).populate('category');
        } else {
            pets = await Pet.find({ category: category._id, status: PetStatus.ACTIVE}).populate('category');
        }
        
        return res.status(200).json({ pets });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

async function getPetsByUserId(req, res) {
    const { userId } = req.params;
    console.log(userId != null);

    if (userId != null) {
        try {
            const pets = await Pet.find({ owner: userId }).populate('category');
            return res.status(200).json({pets});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
    return res.status(200).json([]);  
}

async function addPet(req, res) {
    const { name, age, gender, weight, description, category, owner, location } = req.body;
    const imagePath = req.file.path;
    try {
         const newPet = new Pet({
            name,
            age,
            gender,
            weight,
            description,
            image: imagePath,
            category,
            owner,
            location
        });
        const savedPet = await newPet.save();
        return res.json({ message: 'Pet added successfully.', pet: savedPet });
        } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

async function deletePet(req, res) {
    const { petId } = req.params;

    try {
        const deletedPet = await Pet.findByIdAndDelete(petId);
        if (!deletedPet) {
            return res.status(404).json({ error: 'Pet not found.' });
        }
        return res.json({ message: 'Pet deleted successfully.' });    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

async function updatePet(req, res) {
    const { petId } = req.params;
    const {petData} = req.body;
    try {
        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({ error: 'Pet not found.' });
        }
        console.log('pet store: ', pet);
        if (petData.name != pet.name) {
            console.log('name change');
            pet.name = petData.name;
        }

        if (petData.age != pet.age) {
            console.log('age change');
            pet.age = petData.age;
        }

        if (petData.weight != pet.weight) {
            console.log('weight change');
            pet.weight = petData.weight;
        }

        if (petData.description != pet.description) {
            console.log('description change');
            pet.description = petData.description;
        }

        if (petData.category != pet.category) {
            console.log('category change');
            pet.category = petData.category;
        }

        if (petData.gender != pet.gender) {
            console.log('gender change');
            pet.gender = petData.gender;
        }

        if (petData.image != pet.image) {
            console.log('image change');
            pet.image = petData.image;
        }

        const updatedPet = await pet.save();
        return res.json({ message: 'Pet updated successfully.', pet: updatedPet });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

// update pet status by ID
async function updatePetStatus(petId, newStatus) {
    console.log('updatePetStatus: ', petId, ' ', newStatus);
    try {
        const pet = await Pet.findById(petId);

        if (!pet) {
            console.error('Pet not found.');
            return false;
        }

         // update the status
        if (!PetStatus[newStatus]) {
            return false;
        }
        pet.status = newStatus;
        await pet.save();
        return true;
    } catch (error) {
        console.error('Error updating pet status:', error);
        return false;
    }
}

    // update pet status by ID
async function updatePetAdopt(petId) {
    try {
        const pet = await Pet.findById(petId);

        if (!pet) {
            console.error('Pet not found.');
            return false;
        }
        pet.owner = null;
        await pet.save();
        return true;
    } catch (error) {
        console.error('Error updating pet adopt:', error);
        return false;
    }
}




module.exports = {
    getPetsByFilters,
    getPetsById,
    getPetsByCategory,
    getPetsByUserId,
    addPet,
    deletePet,
    updatePet,
    updatePetStatus,
    updatePetAdopt,
    upload
};