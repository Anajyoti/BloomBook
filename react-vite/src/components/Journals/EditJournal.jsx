import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchJournalDetails, thunkUpdateJournal } from '../../redux/journals';
import { useNavigate, useParams } from 'react-router-dom';

function EditJournal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { journalId } = useParams();
  const journal = useSelector((state) => state.journals.currentJournal);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(thunkFetchJournalDetails(journalId));
  }, [dispatch, journalId]);

  useEffect(() => {
    if (journal) {
      setTitle(journal.title);
      setContent(journal.content);
    }
  }, [journal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(thunkUpdateJournal(journalId, { title, content }));
    navigate('/journals');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Journal</h1>
      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      <label>Content</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditJournal;
