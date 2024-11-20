import './JournalList.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchJournals, thunkDeleteJournal } from '../../redux/journals';
import { useNavigate } from 'react-router-dom';
import DeleteJournal from './DeleteJournal'; 
function JournalList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const journals = useSelector((state) => state.journals.journals);

  const [showModal, setShowModal] = useState(false);
const [journalToDelete, setJournalToDelete] = useState(null);

  useEffect(() => {
    dispatch(thunkFetchJournals());
  }, [dispatch]);

  const handleEdit = (journalId) => {
    navigate(`/journals/${journalId}/edit`);
  };

  const handleViewDetails = (journalId) => {
    navigate(`/journals/${journalId}`);
  };

  const handleDelete = (journalId) => {
    setJournalToDelete(journalId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (journalToDelete) {
      dispatch(thunkDeleteJournal(journalToDelete));
      setShowModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="page-wrapper">
      <div className="header">
        <h1>Your Journals</h1>
        <button
          className="create-btn"
          onClick={() => navigate('/journals/create')}
        >
          Create New Journal
        </button>
      </div>

      <div className="journals-grid">
        {journals.map((journal) => (
          <div className="journal-card" key={journal.id}>
            <h2>{journal.title}</h2>
            <p>{journal.content.slice(0, 100)}...</p>
            <p>Created on: {journal.created_at}</p>
            <p>Last updated: {journal.updated_at}</p>

            <div className="journal-buttons">
              <button
                onClick={() => handleViewDetails(journal.id)}
                className="view-btn"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(journal.id)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(journal.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <DeleteJournal
          show={showModal}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default JournalList;
