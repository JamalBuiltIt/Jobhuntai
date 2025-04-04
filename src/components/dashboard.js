import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Job Hunt AI Dashboard</h1>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2>Generate Resume</h2>
          <p>Create a professional resume with AI.</p>
          <button style={styles.button} onClick={() => navigate("/resume-generator")}>
            Get Started
          </button>
        </div>
        <div style={styles.card}>
          <h2>Generate Cover Letter</h2>
          <p>Write a tailored cover letter for job applications.</p>
          <button style={styles.button} onClick={() => navigate("/cover-letter-generator-container")}>
            Get Started
          </button>
        </div>
        <div style={styles.card}>
          <h2>Job Tracker</h2>
          <p>Keep track of job applications and follow-ups.</p>
          <button style={styles.button} onClick={() => navigate("/job-tracker")}>
            View Tracker
          </button>
        </div>
      </div>
      <button style={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "250px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
  logoutButton: {
    marginTop: "30px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#dc3545",
    color: "white",
    cursor: "pointer",
  },
};

export default Dashboard;
