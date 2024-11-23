
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { thunkFetchGrowthTrackerDetails } from '../../redux/growthtracker';
import './ViewGrowthTracker.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function ViewGrowthTracker() {
  const { trackerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trackerDetails = useSelector((state) => state.growthTracker.currentTracker);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    dispatch(thunkFetchGrowthTrackerDetails(trackerId));
  }, [dispatch, trackerId]);

  useEffect(() => {
    if (trackerDetails) {
      setChartData({
        labels: ['Progress', 'Remaining'],
        datasets: [
          {
            data: [
              trackerDetails.progress,
              Math.max(trackerDetails.target - trackerDetails.progress, 0),
            ],
            // backgroundColor: ['#4caf50', '#f44336'],
            // hoverBackgroundColor: ['#388e3c', '#d32f2f'],
            backgroundColor: ['#f06292', '#f8bbd0'], // Pink gradient shades
            hoverBackgroundColor: ['#c2185b', '#f48fb1'], // Darker pink on hover
          },
        ],
      });
    }
  }, [trackerDetails]);

  if (!trackerDetails) {
    return <p>Loading tracker details...</p>;
  }

  return (
    <div className="tracker-details-container">
      <h1>Growth Tracker Details</h1>
      <div className="tracker-details-card">
        <h2>{trackerDetails.metric}</h2>
        <p>
          <strong>Progress:</strong> {trackerDetails.progress}/{trackerDetails.target}
        </p>
        <p>
          <strong>Date Logged:</strong> {trackerDetails.date_logged}
        </p>
        <p>
          <strong>Created At:</strong> {trackerDetails.created_at}
        </p>
        <p>
          <strong>Last Updated:</strong> {trackerDetails.updated_at}
        </p>
      </div>

      <div className="tracker-chart">
        {chartData && (
          <Doughnut
            data={chartData}
            // options={{
            //   plugins: {
            //     legend: { display: true, position: 'bottom' },
            //     tooltip: {
            //       callbacks: {
            //         label: (context) => `${context.label}: ${context.raw}`,
            //       },
            //     },
            //   },
            //   maintainAspectRatio: false,
            // }}
            options={{
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                      color: '#880e4f', // Pink text for the legend
                      font: {
                        weight: 'bold',
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}`,
                    },
                    backgroundColor: '#f06292', // Tooltip background color
                    titleColor: '#fff', // Tooltip title text color
                    bodyColor: '#fff', // Tooltip body text color
                  },
                },
                maintainAspectRatio: false,
              }}              
          />
        )}
      </div>

      <div className="tracker-buttons">
        <button onClick={() => navigate(`/growth-tracker/${trackerId}/edit`)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => navigate('/growth-tracker')} className="back-btn">
          Back to List
        </button>
      </div>
    </div>
  );
}

export default ViewGrowthTracker;
