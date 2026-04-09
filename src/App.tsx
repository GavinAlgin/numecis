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
import Cart from "./components/pages/dashboard/Cart"
import AccountSettings from "./components/pages/dashboard/ProfileSettings"
import NotificationSettings from "./components/pages/dashboard/Settings"
import LessonPlayer from "./components/pages/dashboard/LessonPlayer"
import TermsConditions from "./components/pages/user/Terms&Conditions"

export default function App() {
  return (
      <Routes>
        {/** Home Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/terms" element={<TermsConditions />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboards */}
        <Route path="/dashboard/settings" element={<ProtectedRoute><NotificationSettings /></ProtectedRoute>} />
        <Route path="/dashboard/profile" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
        <Route path="/vidlesson/:id" element={<ProtectedRoute><LessonPlayer packageId={""} /></ProtectedRoute>} />
        {/* <Route path="/lesson/:id" element={<LessonPlayer packageId={""} />} /> */}
        <Route path="/lesson/:id" element={<ProtectedRoute><LessonWrapper /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      </Routes>
  )
}