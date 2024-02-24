import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBell } from '@fortawesome/free-solid-svg-icons';
import AdoptionForm from './AdoptionForm';
import '../styles/NotificationItem.css';

const NotificationItem = ({ notification }) => {

  const [showAdoptionForm, setShowAdoptionForm] = useState(false);

  const handleFillAdoptionFormClick = () => {
    setShowAdoptionForm(true);
  };

  const onCancel = () => {
    setShowAdoptionForm(false);
  }

  const renderNotificationMessage = () => {
    if (notification.status === 'ACCEPT') {
      if (showAdoptionForm) {
        return (
          <AdoptionForm 
          notification={notification}
          onCancel={onCancel} />
        );
      } else {
        return (
          <>
          <p>
          Congratulations! Your adoption request for {notification.petName} has been accepted. 
          To complete the adoption process, please follow these steps: <br></br>
          1. Contact the pet owner to coordinate the adoption details. <br></br>
          2. Arrange a meeting to get to know the pet better. <br></br>
          3. Ensure you have all the necessary supplies for your new furry friend. <br></br>
          Thank you for choosing to adopt! To complete the adoption, please fill out the adoption form.
          </p>
          <button onClick={handleFillAdoptionFormClick}>Fill the Adoption Form</button>
          </>
        );
      }
      
    } else if (notification.status === 'DENY') {
      return (
          <p>
          We regret to inform you that your adoption request for {notification.petName} has been denied.
          Please don't be discouraged, and consider exploring other available pets for adoption.
          If you have any questions or concerns, feel free to contact us.
          Thank you for your understanding and continued support.
          </p>
      );
    }
  };
  
  return (
    <div className="notification-item">
      <div className="notification-header">
        <FontAwesomeIcon icon={faBell} />
        <h3>Regarding your adoption request for {notification.petName}</h3>

      </div>
      <div className="notification-body">
        {renderNotificationMessage()}
      </div>
      <p>{new Date(notification.updated_at).toLocaleString()}</p>
    </div>
  );

};
  
export default NotificationItem;