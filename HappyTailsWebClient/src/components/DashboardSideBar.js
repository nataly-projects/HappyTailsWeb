import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBell, faUser, faPaw, faHandHoldingHeart, faComment, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/DashboardSideBar.css';

const Sidebar = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action when the "Logout" link is clicked
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div className="sidebar">
      <ul>
      <li>
            <FontAwesomeIcon icon={faHandHoldingHeart} />
            <Link to="/dashboard/adopt">Adopt Section</Link>
        </li>
        <li>
            <FontAwesomeIcon icon={faComment} />
            <Link to="/dashboard/requests">Requests</Link>
        </li>
        <li>
            <FontAwesomeIcon icon={faBell} />
            <Link to="/dashboard/notifications">Notifications</Link>
        </li>
        <li>
            <FontAwesomeIcon icon={faUser} />
            <Link to="/dashboard/profile">User Profile</Link>
        </li>
        <li>
            <FontAwesomeIcon icon={faPaw} />
            <Link to="/dashboard/pets">Pets Section</Link>
        </li>
        
        <li>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <Link to="/login"  onClick={handleLogout}>Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
