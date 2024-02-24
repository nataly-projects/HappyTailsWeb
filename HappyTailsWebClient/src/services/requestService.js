import axios from 'axios';

export const fetchUserNotifications = async (userId) => {
    try {
        const response = await axios.get(`/api/requests/notification/${userId}`);
        if (response && response.data) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Error loading notifications:', error);
        throw error;
    }
};

export const fetchUserRequests = async (userId) => {
    try {
        const response = await axios.get(`/api/requests/requests/${userId}`); 
        if (response && response.data) {
            return response.data;
        }
        return null;
    } catch (error) {
        throw error;
    }
};

export const acceptRequest = async (reqId, petId) => {
    try {
        const response = await axios.put('/api/requests/accept/', {reqId, petId});
        if (response && response.data) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

export const denyRequest = async (request) => {
    try {
        const response = await axios.put('/api/requests/deny/', {reqId: request._id, petId: request.petId});
        if (response && response.data) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
};


