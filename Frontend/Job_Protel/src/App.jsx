import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Jobs from './Components/Jobs'
import Home from './Components/Home'
import JobDescription from './Components/JobDescription'
import Login from './Components/auth/login'
import Singup from './Components/auth/signup'
import Profile from './Components/Profile'
import PostJob from './Components/PostedJobs'
import Companies from './Components/Companies'
import CompanySetup from './Components/CompanySetup'
import CompanyCreate from './Components/CompanyCreate'
import Browse from './Components/Browse'
import CreateJobs from './Components/admin/CreateJobs'
import ProtectedRoute from './Components/admin/ProtectedRoute'
import Applicants from './Components/admin/Applicants'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Singup />
  },
  {
    path:"/profile",
    element: <Profile/>
  },
  // Admin Dashboard Route Started
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><CreateJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
  {
    path:"/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
   {
    future: {
      v7_startTransition: true, // 👈 enable the upcoming feature
    },
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App