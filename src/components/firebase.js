// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";            // Import Firebase app initialization
import { getAuth, GoogleAuthProvider } from "firebase/auth";  // Import authentication and provider
// Firebase configuration
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDML00uLJxQmR8F8XT2VkizR_OpNoUKLqY",
  authDomain: "ninetofive-d241f.firebaseapp.com",
  projectId: "ninetofive-d241f",
  storageBucket: "ninetofive-d241f.firebasestorage.app",
  messagingSenderId: "699437838829",
  appId: "1:699437838829:web:a74ecfef63004a6eb6f7e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export Auth and Provider for use in other components
export { auth, provider };