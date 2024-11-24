
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkCreateJournal } from '../../redux/journals';
import './CreateJournal.css'; 

const CreateJournal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const journalData = {
      title,
      content,
    };

    try {
      await dispatch(thunkCreateJournal(journalData)); // Dispatch the thunk to create a new journal
      navigate('/journals'); // Redirect to journals page
    } catch (err) {
      setError('Error while creating journal. Please try again.');
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate('/journals'); // Redirect to journals page or a previous page
  };

  return (
    <div className="create-journal-container">
      <h1>Create a New Journal</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Reflection, Goals & Today’s Accomplishment:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="create-button">
            Create Journal
          </button>
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CreateJournal;
