
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkUpdateJournal } from '../../redux/journals';
import UpdateConfirmationModal from './UpdateJournal';
import './EditJournal.css';

const EditJournal = () => {
  const { journalId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [journal, setJournal] = useState({ title: '', content: '' });
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await fetch(`/api/journals/${journalId}`);
        if (response.ok) {
          const data = await response.json();
          setJournal(data);
        } else {
          setError('Failed to fetch journal details');
        }
      } catch (err) {
        setError('Error fetching journal');
      }
    };

    fetchJournal();
  }, [journalId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirmUpdate = async () => {
    const updatedJournal = {
      title: journal.title,
      content: journal.content,
    };

    try {
      const response = await fetch(`/api/journals/${journalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJournal),
      });

      if (response.ok) {
        const updatedData = await response.json();
        dispatch(thunkUpdateJournal(journalId, updatedData));
        setShowModal(false);
        navigate('/journals');
      } else {
        const result = await response.json();
        setError(result.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Error updating journal');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    navigate('/journals');
  };

  return (
    <div className="edit-journal-container">
      <h1>Edit Journal</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={journal.title}
            onChange={(e) => setJournal({ ...journal, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Reflection, Goals & Today’s Accomplishment:</label>
          <textarea
            id="content"
            value={journal.content}
            onChange={(e) => setJournal({ ...journal, content: e.target.value })}
            required
          />
        </div>

        <div className="edit-buttons-container">
          <button className="update-button" type="submit">
            Update Journal
          </button>
          <button className="cancel-button" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>

      <UpdateConfirmationModal
        show={showModal}
        onConfirm={handleConfirmUpdate}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditJournal;
