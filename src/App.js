import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/authContext"; // Ensure you import the AuthProvider
import Login from "./components/login"; // The login component
import Dashboard from "./components/dashboard"; // The dashboard component
import ResumeGenerator from "./components/resumeGenerator"; // The resume generator component
import ProtectedRoute from "./components/protectedRoute"; // The protected route component
import CoverLetterGenerator from "./components/coverLetterGenerator";
import JobTracker from "./components/jobTracker";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/resume-generator"
            element={
              <ProtectedRoute>
                <ResumeGenerator />
              </ProtectedRoute>
            }
          />
          <Route path="/cover-letter-generator-container"
          element={
            <ProtectedRoute>
              <CoverLetterGenerator />
            </ProtectedRoute>
          } />
          <Route path= "/job-tracker" 
          element={
            <ProtectedRoute>
              <JobTracker />
            </ProtectedRoute>
          }/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
