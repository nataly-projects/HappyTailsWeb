import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import RequestItem from './RequestItem';
import { fetchUserRequests, acceptRequest, denyRequest } from '../services/requestService';
import '../styles/Requests.css';

const Requests = () => {

  const pendingStatus = 'PENDING';
  const userId = useSelector((state) => state.userId);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [pendingRequests, setPendingRequests] = useState([]);
  const [historyRequests, setHistoryRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const requests = await fetchUserRequests(userId);
      if (requests) {
        if (requests.length > 0) {
          setPendingRequests(requests.filter((request) => request.status === pendingStatus));
          setHistoryRequests(requests.filter((request) => request.status !== pendingStatus));
        }
      }
    } catch (error) {
      console.error('Error loading requests:', error);
      toast.error('An error occurred. Please try again later.');

    }
  };

  useEffect(() => {
    loadRequests();
  });

  const handleAccept = async (request) => {
    setSelectedRequest(request);
    try {
      const response = await acceptRequest(request._id, request.petId);
      console.log('accept res: ', response);
      if (response) {
        loadRequests();
        toast.success('The request accepted successfully');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }

  };

  const handleDeny = async (request) => {
    try {
      const response = await denyRequest(request._id, request.petId);
      console.log('accept res: ', response);
      if (response) {
        loadRequests();
        toast.success('The request denied successfully');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  };


  return (
    <div className="requests-container">
      <div className="pending-requests">
        <h1>Pending Requests: </h1>
        {pendingRequests.length > 0 ? (
          pendingRequests.map((request) => (
            <RequestItem
              key={request._id}
              request={request}
              onAccept={() => handleAccept(request)}
              onDeny={() => handleDeny(request)} />
          ))
        ) : (
          <p>There is no pending requests.</p>
        )}
      </div>
      <div className="history-requests">
        <h1>History Requests: </h1>
        {historyRequests.length > 0 ? (
          historyRequests.map((request) => (
            <RequestItem
              key={request._id}
              request={request} />
          ))
        ) : (
          <p>There is no pending requests.</p>
        )}
      </div>
    </div>
  );
};

export default Requests;