import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchJournalDetails } from '../../redux/journals';
import { useParams } from 'react-router-dom';

function JournalDetails() {
  const dispatch = useDispatch();
  const { journalId } = useParams();
  const journal = useSelector((state) => state.journals.currentJournal);

  useEffect(() => {
    dispatch(thunkFetchJournalDetails(journalId));
  }, [dispatch, journalId]);

  if (!journal) return <div>Loading...</div>;

  return (
    <div>
      <h1>{journal.title}</h1>
      <p>{journal.content}</p>
      <p>Created on: {journal.created_at}</p>
      <p>Last updated: {journal.updated_at}</p>
    </div>
  );
}

export default JournalDetails;
