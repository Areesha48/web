import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
    } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
  




// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
const firebaseConfig = {
    apiKey: "AIzaSyDax2WojxQAQu-Zp5VoIk8g_qYJlBnEH6A",
    authDomain: "decordelight-79b31.firebaseapp.com",
    projectId: "decordelight-79b31",
    storageBucket: "decordelight-79b31.firebasestorage.app",
    messagingSenderId: "923769051203",
    appId: "1:923769051203:web:6f688fac25355c710c9cf6",
    measurementId: "G-534GRPWJR8"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Initialize Analytics
const auth = getAuth();
// Signup Function
function signup() {
  const firstName = document.getElementById('firstname-input').value;
  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password').value;
  const repeatPassword = document.getElementById('repeat-password-input').value;
  const errorMessage = document.getElementById('error-message');

  // Clear any previous error message
  errorMessage.textContent = '';

  // Input validations
  if (!firstName) {
      errorMessage.textContent = 'First name is required.';
      return;
  }
  if (!email) {
      errorMessage.textContent = 'Email is required.';
      return;
  }
  if (!password || !repeatPassword) {
      errorMessage.textContent = 'Both password fields are required.';
      return;
  }
  if (password !== repeatPassword) {
      errorMessage.textContent = 'Passwords do not match.';
      return;
  }
  if (password.length < 6) {
      errorMessage.textContent = 'Password must be at least 6 characters long.';
      return;
  }

  // Firebase Sign-up
  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // User signed up successfully
          const user = userCredential.user;
          console.log('User signed up:', user);
          alert('Sign up successful! Welcome, ' + user.email);
          window.location.pathname = 'login.html';
      })
      .catch((error) => {
          // Handle sign-up errors
          const errorMessageFirebase = error.message;
          console.error('Error signing up:', error);
          errorMessage.textContent = 'Error: ' + errorMessageFirebase;
      });
}

// Attach event listener to button
document.getElementById('signupButton')?.addEventListener('click', signup);

    // Sign-in function
  const signin = () => {
    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessageElement = document.getElementById('error-message');

    if (!email || !password) {
      errorMessageElement.textContent = "Email and password are required.";
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Signed in successfully: ', user);
        alert('Logged in...');
        sessionStorage.setItem("user", user.accessToken);
        window.location.pathname = 'index.html';
      })
      .catch((error) => {
        console.log(error);
        errorMessageElement.textContent = error.message;
      });
  };

  // Attach event listener to the login button
  document.getElementById('loginButton')?.addEventListener('click', signin);



  

  const provider = new GoogleAuthProvider();

  function signinWithGoogle() {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user)
      window.location.pathname = 'welcome.html'
      sessionStorage.setItem('user', token)
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error)
      // ...
    });
  }
  
  document.getElementById('googleLoginButton')?.addEventListener('click', signinWithGoogle);