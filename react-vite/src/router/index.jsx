import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import JournalList from '../components/Journals/JournalList';
import JournalDetails from '../components/Journals/JournalDetails';
import CreateJournal from '../components/Journals/CreateJournal';
import EditJournal from '../components/Journals/EditJournal';
import GrowthTrackerList from '../components/GrowthTracker/GrowthTrackerList';
import CreateGrowthTracker from '../components/GrowthTracker/CreateGrowthTracker';
import ViewGrowthTracker from '../components/GrowthTracker/ViewGrowthTracker';
import UpdateGrowthTracker from '../components/GrowthTracker/UpdateGrowthTracker';
import DeleteGrowthTracker from '../components/GrowthTracker/DeleteGrowthTracker'; // Import the new DeleteGrowthTracker component
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome To BloomBook!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "journals",
        element: <JournalList />, // List of all journals
      },
      {
        path: "journals/:journalId",
        element: <JournalDetails />, // View details of a single journal
      },
      {
        path: "journals/create",
        element: <CreateJournal />, // Create a new journal
      },
      {
        path: "journals/:journalId/edit",
        element: <EditJournal />, // Edit an existing journal
      },
        {
          path: "growth-tracker",
          element: <GrowthTrackerList />, // List all growth trackers
        },
        {
          path: "growth-tracker/create",
          element: <CreateGrowthTracker />, // Create new growth tracker
        },
        {
          path: "growth-tracker/:trackerId",
          element: <ViewGrowthTracker />, // View details of a specific growth tracker
        },
       {
        path: "/growth-tracker/:trackerId/edit",
        element: <UpdateGrowthTracker />,
       }, 
       {
        path: "growth-tracker/:trackerId/delete",
        element: 
          <DeleteGrowthTracker
            // show={true} // Replace with dynamic state management as needed
            // onConfirm={() => console.log('Deleted!')} // Replace with actual delete logic
            // onCancel={() => console.log('Cancelled!')} // Replace with navigation or close modal logic
          />
         // Delete a specific growth tracker
      },
    ],
  },
]);