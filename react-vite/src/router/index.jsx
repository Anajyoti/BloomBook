import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import JournalList from '../components/Journals/JournalList';
import JournalDetails from '../components/Journals/JournalDetails';
import CreateJournal from '../components/Journals/CreateJournal';
import EditJournal from '../components/Journals/EditJournal';
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
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
    ],
  },
]);