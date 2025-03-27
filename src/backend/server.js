import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Make sure this is set in your .env

app.post("/api/generateResume", async (req, res) => {
  try {
    const { name, jobTitle, experience, education, skills } = req.body;
    console.log("Received request data:", req.body);

    if (!name || !jobTitle || !experience || !education || !skills) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const prompt = `Generate a professional resume for ${name}, applying for ${jobTitle}.
Work Experience: ${experience}.
Education: ${education}.
Skills: ${skills}.`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    // Make the POST request using axios
    const response = await axios.post(apiUrl, {
      contents: [{
        parts: [{ text: prompt }]
      }]
    }, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("API response:", response.data);

    // Check if the API returned valid candidates
    if (response.data && response.data.candidates && response.data.candidates.length > 0) {
      // Assuming the candidate's generated content is in the same structure as documented:
      const resumeText = response.data.candidates[0].content?.parts[0]?.text;
      res.json({ resume: resumeText || "Resume generation failed" });
    } else {
      res.status(400).json({ error: "Failed to generate resume" });
    }
  } catch (error) {
    console.error("Error generating resume:", error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data?.error?.message || "Internal Server Error"
    });
  }
});


// POST /api/generateCoverLetter endpoint
app.post("/api/generateCoverLetter", async (req, res) => {
  try {
    // Expected fields from frontend
    const {
      fullName,
      jobTitle,
      company,
      hiringManager,
      experience,
      achievements,
      skills,
      interest,
      valueProposition,
      additionalInfo
    } = req.body;

    console.log("Received request data:", req.body);

    // Validate required fields
    if (!fullName || !jobTitle || !company || !experience || !skills) {
      return res.status(400).json({
        error: "'fullName', 'jobTitle', 'company', 'experience', and 'skills' are required"
      });
    }

    // Construct a prompt for generating the cover letter.
    const prompt = `Generate a professional cover letter for ${fullName} applying for a ${jobTitle} position at ${company}.
    Hiring Manager: ${hiringManager ? hiringManager : "Not specified"}.
    Work Experience: ${experience}.
    Achievements: ${achievements}.
    Skills: ${skills}.
    Why you're interested in the role: ${interest}.
    Value proposition: ${valueProposition}.
    ${additionalInfo ? "Additional Information: " + additionalInfo : ""}
    Ensure the cover letter is well-structured, engaging, and tailored to the job application.`;

    // Use the official Gemini API endpoint
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    // Make the POST request to Gemini API using axios
    const response = await axios.post(apiUrl, {
      contents: [{
        parts: [{ text: prompt }]
      }]
    }, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("API response:", response.data);

    // Check if the API returned valid candidates and extract the generated cover letter
    if (response.data && response.data.candidates && response.data.candidates.length > 0) {
      const coverLetter = response.data.candidates[0].content?.parts[0]?.text;
      res.json({ coverLetter: coverLetter || "Cover letter generation failed" });
    } else {
      res.status(400).json({ error: "Failed to generate cover letter" });
    }
  } catch (error) {
    console.error("Error generating cover letter:", error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data?.error?.message || "Internal Server Error"
    });
  }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
