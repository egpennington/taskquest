import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js'

const firebaseConfig = {
  apiKey: "AIzaSyAH30NMYdbT7JYduOnxumN8u5kfw1JpJ6Q",
  authDomain: "to-do-b89b0.firebaseapp.com",
  databaseURL: "https://to-do-b89b0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "to-do-b89b0",
  storageBucket: "to-do-b89b0.appspot.com",
  messagingSenderId: "922963418865",
  appId: "1:922963418865:web:203f2426d6fdeaf469d350"
}

const app = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()

// Import DOM Elements
// Import input bars
const emailEl = document.querySelector("#email")
const passwordEl = document.querySelector("#password")

// Import Signin Button and Google Signin
const signinBtnEl = document.querySelector(".signin-button-element")
const googleSignInEl = document.querySelector(".googleSignin")

// Add addEventListeners for Button Clicks

// Email Signin
signinBtnEl.addEventListener('click', function () {
  const emailValue = emailEl.value
  const passwordValue = passwordEl.value

  const auth = getAuth(app)
  signInWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
      const user = userCredential.user
      window.location.href = "home.html"
    }).catch((error) => {
      const errorCode = error.code
      if (errorCode === "auth/user-not-found") {
        createUserWithEmailAndPassword(auth, emailValue, passwordValue)
          .then((userCredential) => {
            const user = userCredential.user
            console.log(user)
            window.location.href = "newUser.html"
          })
      } else {
        console.log(errorCode)
      }
    })
})

googleSignInEl.addEventListener('click', function() {
  const auth = getAuth(app)
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      console.log(user)
      window.location.href = "home.html"
    })
})