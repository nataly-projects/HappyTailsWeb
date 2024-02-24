const { Request } = require('../models/requestModel');
const { Pet } = require('../models/petModel');
const {User} = require('../models/userModel');

const { updatePetStatus, updatePetAdopt } = require('./petController');
const { RequestStatus, PetStatus } = require('../utils/enums');
const { sendAdoptRequestEmail } = require('../services/mailService');




async function getUserRequests(req, res) {
    const { userId } = req.params;

    try {
        const userRequests = await Request.find({ ownerId: userId }).populate('userReqId');

        if (!userRequests) {
            return res.status(500).json({ error: 'The user not found.' });
        }

        return res.status(200).json(userRequests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getUserAdoptedPets(req, res) {
    const { userId } = req.params;
    try {
        const userAdoptedPets = await Request.find({ adoptedId: userId }).populate('petId');

        if (!userAdoptedPets) {
            return res.status(500).json({ error: 'The user not found.' });
        }
        return res.status(200).json(userAdoptedPets);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function addRequest(req, res) {
    const { userReqId, ownerId, petName, petId, message } = req.body;
    try {
        const newRequest = await Request.create({
            userReqId,
            ownerId,
            petName,
            petId,
            message,
        });

         // update the pet status to 'HIDDEN'
         const petStatusUpdated = await updatePetStatus(petId, PetStatus.HIDDEN);
         if (!petStatusUpdated) {
             return res.status(500).json({ error: 'Failed to update pet status.' });
         }
        // fetch user details based on userReqId
        const userReqDetails = await User.findById(userReqId);

        if (!userReqDetails) {
            return res.status(500).json({ error: 'The user not found.' });
        }

        // fetch user details based on ownerId
        const ownerDetails = await User.findById(ownerId);
        if ( !ownerDetails ) {
            return res.status(500).json({ error: 'The owner user not found.' });
        }

        // fetch pet details based on petId
        const petDetails = await Pet.findById(petId);
        if ( !petDetails ) {
            return res.status(500).json({ error: 'The pet not found.' });
        }

        // send to the owner email
        await sendAdoptRequestEmail(ownerDetails.email, message, petDetails.name, userReqDetails);

        return res.json({ message: 'Request added successfully.', request: newRequest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

async function acceptRequest(req, res) {
    const { reqId, petId } = req.body;
    try {
        const request = await Request.findById(reqId);

        if (!request) {
            return res.status(404).json({ error: 'Request not found.' });
        }

        // change the pet status to 'ADOPTED'
        const petUpdated = await updatePetStatus(petId, PetStatus.ADOPTED);
        console.log('petUpdated: ', petUpdated);
        if ( !petUpdated ) {
            return res.status(500).json({ error: 'Failed to update pet status.' });
        }

        const petAdoptUpdate = await updatePetAdopt(petId);
        if ( !petAdoptUpdate ) {
            return res.status(500).json({ error: 'Failed to update pet adoption.' });
        }
        
        const updatedRequest = await Request.findOneAndUpdate(
            { _id: reqId, status: RequestStatus.PENDING }, // make sure the request is in a PENDING state
            { $set: { status: RequestStatus.ACCEPT, updated_at: Date.now(), adoptedId: request.userReqId } }, 
            { new: true } // return the modified document
        );

        if (!updatedRequest) {
            return res.status(404).json({ error: 'Request not found or already processed.' });
        }
        return res.json({ message: 'Request accepted successfully.', request: updatedRequest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

async function denyRequest(req, res) {
    const { reqId, petId } = req.body;
    try {
        const request = await Request.findById(reqId);
        if (!request) {
            return res.status(404).json({ error: 'Request not found.' });
        }
        // update the pet status to 'ACTIVE'
        const petUpdated = await updatePetStatus(petId, PetStatus.ACTIVE);
        if (!petUpdated) {
            return res.status(500).json({ error: 'Failed to update pet status.' });
        }
    
        const updatedRequest = await Request.findOneAndUpdate(
            { _id: reqId, status: RequestStatus.PENDING }, 
            { $set: { status: RequestStatus.DENY, updated_at: Date.now()} }, 
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ error: 'Request not found or already processed.' });
        }
        return res.json({ message: 'Request denied successfully.', request: updatedRequest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

async function getUserNotifications(req, res) {
    const { userId } = req.params;
    try {
        const userNotifications = await Request.find({ userReqId: userId, status: { $ne: RequestStatus.PENDING }}).populate('petId');

        if (!userNotifications) {
            return res.status(500).json({ error: 'The user not found.' });
        }
        return res.status(200).json(userNotifications);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}




module.exports = {
    getUserRequests,
    addRequest,
    acceptRequest,
    denyRequest,
    getUserNotifications,
    getUserAdoptedPets
};