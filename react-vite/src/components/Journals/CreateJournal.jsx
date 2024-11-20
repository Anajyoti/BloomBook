import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateJournal } from '../../redux/journals';
import { useNavigate } from 'react-router-dom';

function CreateJournal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(thunkCreateJournal({ title, content }));
    navigate('/journals');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create New Journal</h1>
      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      <label>Content</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateJournal;
