import React, { useEffect } from "react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  getRedirectResult, 
  signOut 
} from "firebase/auth";
import { auth } from "./firebase"; 
import { useNavigate } from "react-router-dom";  

const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate(); 

  // Sign out to ensure the user starts from a clean session
  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleLogin = async () => {
    try {
      await signOutUser(); // Ensure no active session
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log("Redirected User:", result.user);
          navigate("/dashboard");
        } else {
          console.log("No result found.");
        }
      } catch (error) {
        console.error("Error in redirect result:", error);
      }
    };
    handleRedirectResult();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
