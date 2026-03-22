import { Route, Routes } from "react-router-dom"
import Login from "./components/pages/auth/Login"
import LandingPage from "./components/pages/user/Landing"
import ProtectedRoute from "./components/controllers/ProtectedRoutes"
import ForgotPassword from "./components/pages/auth/ForgotPassword"
import Signup from "./components/pages/auth/SignUp"
import Dashboard from "./components/pages/dashboard/Page"
import LessonPlayer from "./components/pages/dashboard/LessonPlayer"

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboards */}
        <Route path="/Lessonplayer" element={<LessonPlayer/>} />
        {/* <Route path="/analytics" element={<Page title="Analytics" />} /> */}
        {/* <Route path="/projects" element={<Page title="Projects" />} />
          <Route path="/team" element={<Page title="Team" />} />
          <Route path="/settings" element={<Page title="Settings" />} />
          <Route path="/help" element={<Page title="Help" />} />
          <Route path="/search" element={<Page title="Search" />} />  */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
  )
}