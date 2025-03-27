import React, { useState } from "react";
import { saveAs } from "file-saver";
import "../css/coverLetterGenerator.css";

const CoverLetterGenerator = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    company: "",
    hiringManager: "",
    experience: "",
    achievements: "",
    skills: "",
    interest: "",
    valueProposition: "",
    additionalInfo: ""
  });
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateCoverLetter = async () => {
    setLoading(true);
    setCoverLetter("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/generateCoverLetter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          jobTitle: formData.jobTitle,
          company: formData.company,
          hiringManager: formData.hiringManager,
          experience: formData.experience,
          achievements: formData.achievements,
          skills: formData.skills,
          interest: formData.interest,
          valueProposition: formData.valueProposition,
          additionalInfo: formData.additionalInfo
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong with the request");
      }

      const data = await response.json();
      setCoverLetter(data.coverLetter);
    } catch (err) {
      console.error("Request failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadCoverLetter = () => {
    if (coverLetter) {
      const blob = new Blob([coverLetter], { type: "text/plain;charset=utf-8" });
      saveAs(blob, "coverLetter.txt");
    }
  };

  return (
    <div className="cover-letter-generator-container">
      <h2>AI Cover Letter Generator</h2>

      <div className="form-container">
        {[
          { id: "fullName", label: "Your Full Name", placeholder: "Enter your full name" },
          { id: "jobTitle", label: "Job Title", placeholder: "Enter the job title" },
          { id: "company", label: "Company Name", placeholder: "Enter the company name" },
          { id: "hiringManager", label: "Hiring Manager (Optional)", placeholder: "Enter hiring manager's name" },
          { id: "experience", label: "Relevant Work Experience", placeholder: "Describe your relevant experience", textarea: true },
          { id: "achievements", label: "Key Achievements", placeholder: "List your achievements", textarea: true },
          { id: "skills", label: "Core Skills & Competencies", placeholder: "List your core skills (comma-separated)", textarea: true },
          { id: "interest", label: "Why You're Interested in the Role", placeholder: "Explain your interest in this job", textarea: true },
          { id: "valueProposition", label: "Your Unique Value Proposition", placeholder: "Describe what makes you a great fit", textarea: true },
          { id: "additionalInfo", label: "Additional Information (Optional)", placeholder: "Any extra details to include", textarea: true }
        ].map(({ id, label, placeholder, textarea }) => (
          <div className="input-container" key={id}>
            <label htmlFor={id}>{label}</label>
            {textarea ? (
              <textarea id={id} name={id} placeholder={placeholder} onChange={handleChange} />
            ) : (
              <input id={id} type="text" name={id} placeholder={placeholder} onChange={handleChange} />
            )}
          </div>
        ))}

        <button
          className={`generate-btn ${loading ? "loading" : ""}`}
          onClick={generateCoverLetter}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {coverLetter && (
        <div className="cover-letter-output">
          <h3>Generated Cover Letter</h3>
          <pre>{coverLetter}</pre>
          <button className="download-btn" onClick={downloadCoverLetter}>
            Download Cover Letter
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverLetterGenerator;
