const mongoose = require('mongoose');
const { RequestStatus } = require('../utils/enums');


const Schema = mongoose.Schema;


const requestSchema = new Schema({
    userReqId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    adoptedId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    status: {
        type: String,
        enum: Object.values(RequestStatus), 
        default: RequestStatus.PENDING
    },
    petName: {
        type: String
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    },
    message: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: null
    }
});


const Request = mongoose.model('Request', requestSchema);

module.exports = { Request, requestSchema};




