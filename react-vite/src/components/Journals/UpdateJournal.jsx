const UpdateConfirmationModal = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Are you sure you want to update this journal?</h2>
          <div className="modal-buttons">
            <button onClick={onConfirm} className="confirm-update-button">
              Yes, Update
            </button>
            <button onClick={onCancel} className="cancel-update-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UpdateConfirmationModal;