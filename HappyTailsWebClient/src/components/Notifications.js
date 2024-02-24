import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchUserNotifications } from '../services/requestService';
import NotificationItem from './NotificationItem';
import '../styles/Requests.css';

const Notifications = () => {

  const userId = useSelector((state) => state.userId);
  const [notifications, setNotifications] = useState([]);

  
  useEffect(() => {
    const loadNotifications = async () => {
        try {
          const notifications = await fetchUserNotifications(userId);
          if (notifications) {
            setNotifications(notifications);
          }
        } catch (error) {
          console.error('Error loading requests:', error);
          toast.error('An error occurred. Please try again later.');
        }
      };
      loadNotifications();
  }, [userId]);

    
  return (
    <div className="notifications-container">
        <h1>Notifications </h1>
        <div className="notifications">
            {notifications.length > 0 ? (
            notifications.map((notification) => (
            <NotificationItem key={notification._id} notification={notification} />
            ))
            ) : (
            <p>There is no notifications.</p>
            )}
        </div>
  </div>
);
};

export default Notifications;