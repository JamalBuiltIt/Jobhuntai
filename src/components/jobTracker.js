import React, { useState } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import "../css/jobTracker.css";

const JobTracker = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    company: "",
    role: "",
    dateApplied: "",
    followUpDate: "",
    status: "Applied",
  });
  const [loading, setLoading] = useState(false);
  const [followUpMessage, setFollowUpMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const addJob = () => {
    setJobs([...jobs, newJob]);
    setNewJob({ company: "", role: "", dateApplied: "", followUpDate: "", status: "Applied" });
  };

  const deleteJob = (index) => {
    const updatedJobs = jobs.filter((_, jobIndex) => jobIndex !== index);
    setJobs(updatedJobs);
  };
  

  const generateFollowUp = async (company, role, dateApplied) => {
    setLoading(true);
    setFollowUpMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/generateFollowUp", {
        company,
        role,
        dateApplied,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate follow-up message");
      }

      const data = await response.json();
      setFollowUpMessage(data.followUpMessage);
    } catch (err) {
      console.error("Request failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadFollowUp = () => {
    if (followUpMessage) {
      const blob = new Blob([followUpMessage], { type: "text/plain;charset=utf-8" });
      saveAs(blob, "followUpMessage.txt");
    }
  };

  return (
    <div className="job-tracker-container">
      <h2>Job Tracker</h2>

      <div className="add-job-container">
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={newJob.company}
          onChange={handleChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Job Title"
          value={newJob.role}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dateApplied"
          placeholder="Date Applied"
          value={newJob.dateApplied}
          onChange={handleChange}
        />
        <input
          type="date"
          name="followUpDate"
          placeholder="Follow up Date"
          value={newJob.followUpDate}
          onChange={handleChange}
        />
        <button onClick={addJob}>Add Job</button>
      </div>

      <div className="job-list">
  {jobs.map((job, index) => (
    <div className="job-item" key={index}>
      <button className="delete-btn" onClick={() => deleteJob(index)}>X</button>
      <h3>{job.role} at {job.company}</h3>
      <p>Applied on: {job.dateApplied}</p>
      <p>Status: {job.status}</p>
      <p>Follow-up on: {job.followUpDate}</p>
      <button onClick={() => generateFollowUp(job.company, job.role, job.dateApplied)}>
        Generate Follow-up Message
      </button>
    </div>
  ))}
</div>


      {loading && <p>Loading...</p>}

      {followUpMessage && (
        <div className="follow-up-message">
          <h3>Follow-up Message</h3>
          <pre>{followUpMessage}</pre>
          <button onClick={downloadFollowUp}>Download Follow-up</button>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default JobTracker;
