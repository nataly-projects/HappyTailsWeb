import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { resetPasswordRequest, validateResetPasswordCode, resetPassword  } from '../services/userService';
import { isValidEmail, hashPassword } from '../utils/utils';
import '../styles/ForgotPassword.css';

const ForgotPassword = ({ closeModal }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  // handle step 1 - email input
  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!email) {
        setError('Email is required');
        return;
      } else if (!isValidEmail(email)) { 
        setError('Invalid email format');
        return;
      }
    try {
      const response = await resetPasswordRequest(email);
      if(response) {
        toast.success('Email with verification code send to the email');
        setStep(2);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log('in error: ', error);
        setError(`Error: ${error.response.data.error}`);
        toast.error(`Error: ${error.response.data.error}`)
      } else {
        console.log(error);
        setError('An error occurred while processing your request');
        toast.error('An error occurred. Please try again later.');
        closeModal();
      }
    }
  };

  // handle step 2 - code input
  const handleCodeSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!code) {
        setError('Code is required');
        return;
      }
      try {
        const response = await validateResetPasswordCode(email, code);
        if (response) {
          setStep(3);
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
          toast.error(`Error: ${error.response.data.error}`)
        } else {
          setError('An error occurred while processing your request');
          toast.error('An error occurred. Please try again later.');
          closeModal();
        }
      }
  };

  // handle step 3 - reset the password
  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!newPassword) {
        setError('Password is required');
        return;
    }
    else if (!newPassword || newPassword.length < 4) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (!confirmPassword) {
      setError('Confirm password is required');
      return;
    }

    // validate the confirm password
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await resetPassword(email, newPassword);
      if (response) {
        toast.success('The password reset successfully');
        closeModal();
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while updating your password');
      toast.error('An error occurred. Please try again later.');
    }
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>X</button>
        <h2>Reset Password</h2>
        <form>
          {step === 1 && (
            <>
              <label>Email:</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <p>An email with code verification will be sent to your email.</p>
              {error && <p className="error-msg">{error}</p>}
              <button type="button" onClick={handleEmailSubmit}>
                Continue
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <label>Verification Code:</label>
              <input required type="text" value={code} onChange={(e) => setCode(e.target.value)} />
              {error && <p className="error-msg">{error}</p>}
              <button type="button" onClick={handleCodeSubmit}>
                Continue
              </button>
              <p>Enter the verification code you get in the mail</p>
            </>
          )}
          {step === 3 && (
            <>
              <label>New Password:</label>
              <input
                required
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label>Confirm New Password:</label>
              <input
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <p className="error-msg">{error}</p>}
              <button type="button" onClick={handlePasswordSubmit}>
                Submit
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
