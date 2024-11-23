

import './GrowthTrackerList.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  thunkFetchGrowthTrackers,
  thunkDeleteGrowthTracker,
} from '../../redux/growthtracker';
import { useNavigate } from 'react-router-dom';
import DeleteGrowthTracker from './DeleteGrowthTracker'; // Modal Component for deletion

function GrowthTrackerList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const growthTrackers = useSelector((state) => state.growthTracker.growthTrackers);

  const [showModal, setShowModal] = useState(false);
  const [trackerToDelete, setTrackerToDelete] = useState(null);

  useEffect(() => {
    dispatch(thunkFetchGrowthTrackers());
  }, [dispatch]);

  const handleEdit = (trackerId) => {
    navigate(`/growth-tracker/${trackerId}/edit`);
  };

  const handleViewDetails = (trackerId) => {
    navigate(`/growth-tracker/${trackerId}`);
  };

  const handleDelete = (trackerId) => {
    setTrackerToDelete(trackerId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (trackerToDelete) {
      dispatch(thunkDeleteGrowthTracker(trackerToDelete));
      setShowModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  if (!growthTrackers || growthTrackers.length === 0) {
    return <p>No growth trackers found. Start tracking your progress today!</p>;
  }

  return (
    <div className="page-wrapper">
      <div className="header">
        <h1>Your Growth Trackers</h1>
        <button
          className="create-btn"
          onClick={() => navigate('/growth-tracker/create')}
        >
          Create New Tracker
        </button>
      </div>

      <div className="growth-trackers-grid">
        {growthTrackers.map((tracker) => (
          <div className="growth-tracker-card" key={tracker.id}>
            <h2>{tracker.metric}</h2>
            <p>
              <strong>Progress:</strong> {tracker.progress}/{tracker.target}
            </p>
            <p>
              <strong>Date Logged:</strong> {tracker.date_logged}
            </p>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${(tracker.progress / tracker.target) * 100}%`,
                 backgroundColor: tracker.progress >= tracker.target ? '#e83e8c' : '#f06292',
                }}
              >
                <span className="progress-label">
                  {((tracker.progress / tracker.target) * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="tracker-buttons">
              <button
                onClick={() => handleViewDetails(tracker.id)}
                className="view-btn"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(tracker.id)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tracker.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <DeleteGrowthTracker
          show={showModal}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default GrowthTrackerList;
