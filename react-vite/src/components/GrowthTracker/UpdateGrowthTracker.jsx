// src/components/GrowthTracker/UpdateGrowthTracker.jsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkUpdateGrowthTracker } from '../../redux/growthtracker';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateGrowthTracker.css';

function UpdateGrowthTracker() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trackerId } = useParams();
  
  const growthTrackers = useSelector((state) => state.growthTracker.growthTrackers);
  const trackerToEdit = growthTrackers.find((tracker) => tracker.id === parseInt(trackerId));
  
  // State to store the form data
  const [metric, setMetric] = useState('');
  const [progress, setProgress] = useState('');
  const [target, setTarget] = useState('');
  //const [dateLogged, setDateLogged] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (trackerToEdit) {
      setMetric(trackerToEdit.metric);
      setProgress(trackerToEdit.progress);
      setTarget(trackerToEdit.target);
      //setDateLogged(trackerToEdit.date_logged);
    } else {
      navigate('/growth-tracker');
    }
  }, [trackerToEdit, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form input
    if (!metric || !progress || !target) {
      setError('Please fill out all fields.');
      return;
    }

    // Ensure the date is in YYYY-MM-DD format
    // const formattedDate = new Date(dateLogged);
    // if (isNaN(formattedDate.getTime())) {
    //   setError('Invalid date format');
    //   return;
    // }

    // Convert to 'YYYY-MM-DD' format
    // const dateString = formattedDate.toISOString().split('T')[0];

    const updatedTracker = {
      metric,
      progress: parseFloat(progress),
      target: parseFloat(target),
      //date_logged: dateString, // Ensure the date is in the correct format
    };

    // Dispatch the action to update the tracker
    try {
      await dispatch(thunkUpdateGrowthTracker(trackerId, updatedTracker));
      navigate('/growth-tracker');
    } catch (err) {
      setError('Failed to update growth tracker');
    }
  };

  return (
    <div className="update-tracker-page">
      <h1>Update Growth Tracker</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="update-tracker-form">
        <div className="form-group">
          <label htmlFor="metric">Metric</label>
          <input
            type="text"
            id="metric"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            placeholder="Enter growth metric (e.g. Mindfulness)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="progress">Progress</label>
          <input
            type="number"
            id="progress"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            placeholder="Enter your current progress"
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="target">Target</label>
          <input
            type="number"
            id="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Enter your target"
            required
            min="0"
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="date_logged">Date Logged</label>
          <input
            type="date"
            id="date_logged"
            value={dateLogged}
            onChange={(e) => setDateLogged(e.target.value)}
          />
        </div> */}

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Update Tracker
          </button>
          <button type="button" onClick={() => navigate('/growth-tracker')} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateGrowthTracker;
