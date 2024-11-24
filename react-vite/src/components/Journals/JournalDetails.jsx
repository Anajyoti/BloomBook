

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchJournalDetails } from '../../redux/journals';
import { useParams, useNavigate } from 'react-router-dom';
import './JournalDetails.css';

function JournalDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { journalId } = useParams();
  const journal = useSelector((state) => state.journals.currentJournal);

  useEffect(() => {
    dispatch(thunkFetchJournalDetails(journalId));
  }, [dispatch, journalId]);

  if (!journal) {
    return <div className="loading">Loading journal details...</div>; 
  }

  return (
    <div className="journal-details-wrapper">
      <h1 className="journal-title">{journal.title}</h1>
      <p className="journal-content">{journal.content}</p>
      <div className="meta-info">
        <p>
          <span className="meta-label">Created on:</span> {journal.created_at}
        </p>
        <p>
          <span className="meta-label">Last updated:</span> {journal.updated_at}
        </p>
      </div>
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back to Journals
      </button>
    </div>
  );
}

export default JournalDetails;
