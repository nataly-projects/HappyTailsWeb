const mongoose = require('mongoose');
const { PetGender, PetStatus } = require('../utils/enums');


const Schema = mongoose.Schema;


const petSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a name'
    },
    age: {
        type: Number,
        required: 'Enter a age'
    },
    gender: {
        type: String,
        enum: Object.values(PetGender), 
        required: 'Enter a gender'
    },
    weight: {
        type: Number,
        required: 'Enter a weight'
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(PetStatus), 
        default: PetStatus.ACTIVE
    },
    image: {
        type: String,
        required: true
    },
    additionalImages: [{
        type: String,
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
    },
    location: {
        type: String,
        required: 'Enter a location'
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});


const Pet = mongoose.model('Pet', petSchema);

module.exports = { Pet, petSchema};




