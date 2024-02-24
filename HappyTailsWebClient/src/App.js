import './App.css';

import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';

import Home from './pages/HomePage';
import Dashboard from './pages/DashboardPage';
import NavBar from './components/NavBar';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ImportantInfoPage from './pages/ImportantInfoPage';
import PetNamesIdea from './components/PetNamesIdea';
import CatAdoptionGuide from './components/CatAdoptionGuide';
import DogAdoptionGuide from './components/DogAdoptionGuide';
import ForgotPassword from './components/ForgotPassword';
import AddPet from './components/AddPet';
import SignupLoginPage from './pages/signupLoginPage';

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
      <div className="App">
        <NavBar  />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* { useSelector(state => state.isLoggedIn) ? (
                <Route path="/" element={<Dashboard />} />
              ) : (
                <Route path="/" element={<Home />} />
              )} */}
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<SignupLoginPage />} />

            <Route path="/login/forgot-password" element={< ForgotPassword />} />

            <Route path="/info" element={<ImportantInfoPage />} />
            <Route path="/info/pet-names" element={< PetNamesIdea />} />
            <Route path="/info/dog-adoption-guide" element={< DogAdoptionGuide />} />
            <Route path="/info/cat-adoption-guide" element={< CatAdoptionGuide />} />

            <Route path="/addPetForm" element={<AddPet />} />
          </Routes>
        </div>
       
      </div>
      </BrowserRouter>
    </Provider>

  );
};


export default App;
