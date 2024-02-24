import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/AdoptionForm.css';

const AdoptionForm = ({notification, onCancel}) => {
 
  const [signature, setSignature] = useState('');
  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
  };

  return (
    <div className='adoption-form'>
      <h2>Adoption Form</h2>

      <section>
        <h3>Pet Information</h3>
        <form>
          <label htmlFor="petName">Pet Name:</label>
          <input
            type="text"
            id="petName"
            value={notification.petName || ''}
            readOnly
          />
        </form>
      </section>

      <section>
        <h3>Adoption Process</h3>
        <p>
          Congratulations on your decision to adopt! The adoption process is a
          crucial step to ensure a happy and healthy life for your new furry
          friend. Here's a brief overview:
        </p>
        <ul>
          <li>
            <strong>Meet and Greet:</strong> Arrange a meeting with the pet to
            get to know each other and ensure compatibility.
          </li>
          <li>
            <strong>Prepare Your Home:</strong> Make sure you have all the
            essentials the pet needs in your home, including food, water bowls,
            a comfortable bed, toys, and any specific items based on the pet's
            breed and requirements.
          </li>
          <li>
            <strong>Application:</strong> Fill out this adoption form with
            accurate information about yourself and your living situation.
          </li>
          <li>
            <strong>Finalization:</strong> Complete the adoption process and
            welcome your new pet into your home!
          </li>
        </ul>
        <p>
          For more detailed information, please refer to our{' '}
          <a href="/info" target="_blank" rel="noopener noreferrer">
            adoption guide
          </a>{' '}
          in the Information section.
        </p>
      </section>

      <section>
        <h3>Adopter Responsibilities</h3>
        <p>
          By submitting this form, you agree to the following responsibilities
          as the adopter:
        </p>
        <ul>
          <li>
            <strong>Provide a Loving Home:</strong> Create a warm and loving
            environment for your new pet to thrive.
          </li>
          <li>
            <strong>Regular Veterinary Care:</strong> Schedule routine
            veterinary check-ups, vaccinations, and preventive care.
          </li>
          <li>
            <strong>Nutritious Diet:</strong> Feed your pet a balanced and
            nutritious diet suitable for their age and health.
          </li>
          <li>
            <strong>Exercise and Play:</strong> Engage in regular physical
            activities and playtime to keep your pet active and happy.
          </li>
          <li>
            <strong>Training and Socialization:</strong> Invest time in
            training and socializing your pet for a well-behaved companion.
          </li>
          <li>
            <strong>Identification:</strong> Ensure your pet wears proper
            identification, including a collar with tags and a microchip.
          </li>
          <li>
            <strong>Emergency Preparedness:</strong> Be prepared for emergencies
            with a pet first aid kit and knowledge of emergency procedures.
          </li>
        </ul>
        <p>
          By fulfilling these responsibilities, you contribute to the well-being
          and happiness of your adopted pet. Thank you for choosing to adopt!
        </p>
      </section>

      <section>
        <h3>Adopter Information</h3>
        <form>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={user.fullName}
            readOnly
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={user.email}
            readOnly
          />
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={user.phone}
            readOnly
          />

        </form>
      </section>

      <section>
        <h3>Signature</h3>
        <form className='form' onSubmit={handleSubmit}>
        <p>Date: {new Date(Date.now()).toLocaleString()}</p>

          <label htmlFor="signature">Your Signature:</label>
          <input
            type="text"
            id="signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />
          <div className='actions'>
            <button type="submit">Submit</button>
            <button onClick={onCancel} type='button'> Cancel</button>
          </div>
          
        </form>
      </section>
    </div>
  );

  
};

export default AdoptionForm;
