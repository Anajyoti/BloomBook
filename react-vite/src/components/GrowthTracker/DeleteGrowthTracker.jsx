import React from 'react';
import './DeleteGrowthTracker.css'; 

const DeleteGrowthTracker = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this growth tracker entry? This action cannot be undone.</p>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>
            Delete
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteGrowthTracker;
