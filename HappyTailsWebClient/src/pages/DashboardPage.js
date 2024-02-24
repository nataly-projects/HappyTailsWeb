import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UserProfile from './UserProfile';
import PetsSection from '../components/PetsSection';
import AdoptSection from '../components/AdoptSection';
import Sidebar from '../components/DashboardSideBar';
import Requests from '../components/Requests';
import Notifications from '../components/Notifications';
import '../styles/Dashboard.css';


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Routes>
        <Route path="/requests" element={<Requests />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/pets" element={<PetsSection />} />
          <Route path="/adopt" element={<AdoptSection />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>

      </div>
    </div>
  );
};

export default Dashboard;


