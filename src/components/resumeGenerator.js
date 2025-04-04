import React, { useState } from "react";
import { saveAs } from "file-saver";
import "../css/resumeGenerator.css";

const ResumeGenerator = () => {
  const [userData, setUserData] = useState({
    name: "",
    jobTitle: "",
    experience: "",
    education: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState("");
  const [error, setError] = useState(""); // Added error state

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const generateResume = async () => {
    setLoading(true);
    setGeneratedResume("");
    setError(""); // Clear previous errors
  
    try {
      const response = await fetch("http://localhost:5000/api/generateResume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const errorData = await response.json(); // Always parse response JSON
  
      if (!response.ok) {
        console.error("API error:", errorData); // Log full error details
        throw new Error(errorData.error || "Failed to generate resume");
      }
  
      setGeneratedResume(errorData.resume);
    } catch (error) {
      console.error("Request failed:", error.message);
      setError(error.message); // Display error to the user
    } finally {
      setLoading(false);
    }
  };
  

  const downloadResume = () => {
    const blob = new Blob([generatedResume], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "resume.txt");
  };

  return (
    <div className="resume-generator-container">
      <h2>AI Resume Generator</h2>

      <div className="form-container">
        <div className="input-container">
          <label className="label" htmlFor="name">Your Name</label>
          <input
            id="name"
            className="input-field"
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label className="label" htmlFor="jobTitle">Job Title</label>
          <input
            id="jobTitle"
            className="input-field"
            type="text"
            name="jobTitle"
            placeholder="Enter your desired job title"
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label className="label" htmlFor="experience">Work Experience</label>
          <textarea
            id="experience"
            className="input-field"
            name="experience"
            placeholder="Describe your work experience"
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label className="label" htmlFor="education">Education</label>
          <textarea
            id="education"
            className="input-field"
            name="education"
            placeholder="List your education background"
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label className="label" htmlFor="skills">Skills</label>
          <textarea
            id="skills"
            className="input-field"
            name="skills"
            placeholder="List your skills (comma-separated)"
            onChange={handleChange}
          />
        </div>

        <button
          className={`generate-btn ${loading ? 'loading' : ''}`}
          onClick={generateResume}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>} {/* Display error message */}

      {generatedResume && (
        <div className="resume-output">
          <h3>Generated Resume</h3>
          <pre>{generatedResume}</pre>
          <button className="download-btn" onClick={downloadResume}>
            Download Resume
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeGenerator;
