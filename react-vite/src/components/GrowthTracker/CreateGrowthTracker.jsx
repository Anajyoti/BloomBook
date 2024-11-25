// import './CreateGrowthTracker.css'; // Optional: Add your custom styles
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { thunkCreateGrowthTracker } from '../../redux/growthtracker';
// import { useNavigate } from 'react-router-dom';

// function CreateGrowthTracker() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [metric, setMetric] = useState('');
//   const [progress, setProgress] = useState('');
//   const [target, setTarget] = useState('');
//   const [dateLogged, setDateLogged] = useState('');

//   const [errors, setErrors] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // // Input validation
//     // const newErrors = [];
//     // if (!metric) newErrors.push('Metric is required.');
//     // if (!progress || isNaN(progress) || progress < 0)
//     //   newErrors.push('Progress must be a non-negative number.');
//     // if (!target || isNaN(target) || target <= 0)
//     //   newErrors.push('Target must be a positive number.');
//     // if (dateLogged && isNaN(Date.parse(dateLogged)))
//     //   newErrors.push('Date Logged must be a valid date.');

//     // if (newErrors.length) {
//     //   setErrors(newErrors);
//     //   return;
//     // }
//     const newErrors = [];
//     if (!metric) newErrors.push('Metric is required.');
//     if (progress === '' || isNaN(progress) || progress < 0)
//       newErrors.push('Progress must be a non-negative number.');
//     if (!target || isNaN(target) || target <= 0)
//       newErrors.push('Target must be a positive number.');
//     if (dateLogged && isNaN(Date.parse(dateLogged)))
//       newErrors.push('Date Logged must be a valid date.');

//     if (newErrors.length) {
//       setErrors(newErrors);
//       return;
//     }

//     // Dispatch the thunk to create a new growth tracker
//     const newTracker = {
//       metric,
//       progress: parseFloat(progress),
//       target: parseFloat(target),
//       date_logged: dateLogged || undefined, // Optional field
//     };

//     try {
//       await dispatch(thunkCreateGrowthTracker(newTracker));
//       navigate('/growth-tracker'); // Redirect to the Growth Tracker list page
//     } catch (error) {
//       console.error('Error creating growth tracker:', error);
//     }
//   };

//   return (
//     <div className="page-wrapper">
//       <h1>Create Growth Tracker</h1>

//       {errors.length > 0 && (
//         <div className="error-messages">
//           <ul>
//             {errors.map((error, idx) => (
//               <li key={idx}>{error}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <form className="growth-tracker-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="metric">Metric</label>
//           <input
//             type="text"
//             id="metric"
//             value={metric}
//             onChange={(e) => setMetric(e.target.value)}
//             placeholder="e.g., Fitness Level, Mindfulness"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="progress">Progress</label>
//           <input
//             type="number"
//             id="progress"
//             value={progress}
//             onChange={(e) => setProgress(e.target.value)}
//             placeholder="e.g., 10, 50"
//             min="0"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="target">Target</label>
//           <input
//             type="number"
//             id="target"
//             value={target}
//             onChange={(e) => setTarget(e.target.value)}
//             placeholder="e.g., 100"
//             min="1"
//             required
//           />
//         </div>

//         {/* <div className="form-group">
//           <label htmlFor="dateLogged">Date Logged (Optional)</label>
//           <input
//             type="date"
//             id="dateLogged"
//             value={dateLogged}
//             onChange={(e) => setDateLogged(e.target.value)}
//           />
//         </div> */}

//         <div className="form-actions">
//           <button type="submit" className="submit-btn">
//             Create Tracker
//           </button>
//           <button
//             type="button"
//             className="cancel-btn"
//             onClick={() => navigate('/growth-tracker')}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CreateGrowthTracker;

import './CreateGrowthTracker.css'; 
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateGrowthTracker } from '../../redux/growthtracker';
import { useNavigate } from 'react-router-dom';

function CreateGrowthTracker() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [metric, setMetric] = useState('');
  const [progress, setProgress] = useState('');
  const [target, setTarget] = useState('');
  const [dateLogged, setDateLogged] = useState('');

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    const newErrors = [];
    if (!metric) newErrors.push('Metric is required.');
    if (progress === '' || isNaN(progress) || progress <= 0)
      newErrors.push('Progress must be a positive number.');
    if (!target || isNaN(target) || target <= 0)
      newErrors.push('Target must be a positive number.');
    if (dateLogged && isNaN(Date.parse(dateLogged)))
      newErrors.push('Date Logged must be a valid date.');

    if (newErrors.length) {
      setErrors(newErrors);
      return;
    }

    // Dispatch the thunk to create a new growth tracker
    const newTracker = {
      metric,
      progress: parseFloat(progress),
      target: parseFloat(target),
      date_logged: dateLogged || undefined, // Optional field
    };

    try {
      await dispatch(thunkCreateGrowthTracker(newTracker));
      navigate('/growth-tracker'); // Redirect to the Growth Tracker list page
    } catch (error) {
      console.error('Error creating growth tracker:', error);
    }
  };

  return (
    <div className="page-wrapper">
      <h1>Create Growth Tracker</h1>

      {errors.length > 0 && (
        <div className="error-messages">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form className="growth-tracker-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="metric">Metric</label>
          <input
            type="text"
            id="metric"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            placeholder="e.g., Fitness Level, Mindfulness"
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
            placeholder="e.g., 10, 50"
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="target">Target</label>
          <input
            type="number"
            id="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="e.g., 100"
            min="1"
            required
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="dateLogged">Date Logged (Optional)</label>
          <input
            type="date"
            id="dateLogged"
            value={dateLogged}
            onChange={(e) => setDateLogged(e.target.value)}
          />
        </div> */}

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Create Tracker
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/growth-tracker')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateGrowthTracker;
