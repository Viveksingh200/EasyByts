import React from 'react';
import './SignupModal.css';

export default function SignupModal({ closeModal, setIsLoggedIn }) {
  const handleSignup = (e) => {
    e.preventDefault();
    // TODO: call backend API and on success:
    setIsLoggedIn(true);
    closeModal();
  };

  return (
    <div className="signup-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>×</button>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
