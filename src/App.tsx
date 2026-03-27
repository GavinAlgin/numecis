import { Route, Routes } from "react-router-dom"
import Login from "./components/pages/auth/Login"
import LandingPage from "./components/pages/user/Landing"
import ProtectedRoute from "./components/controllers/ProtectedRoutes"
import ForgotPassword from "./components/pages/auth/ForgotPassword"
import Signup from "./components/pages/auth/SignUp"
import Dashboard from "./components/pages/dashboard/Page"
// import LessonPlayer from "./components/pages/dashboard/LessonPlayer"
import LessonWrapper from "./components/controllers/LessonWrapper"
import AboutUs from "./components/pages/AboutUs"

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<AboutUs />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboards */}
        {/* <Route path="/lesson/:id" element={<LessonPlayer packageId={""} />} /> */}
        <Route path="/lesson/:id" element={<ProtectedRoute><LessonWrapper /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
  )
}