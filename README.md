
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

  import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
  } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

  import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc
  } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBpADv380nomzd15tNPmruoYcok4VQ29VQ",
    authDomain: "quizspark-65dbd.firebaseapp.com",
    projectId: "quizspark-65dbd",
    storageBucket: "quizspark-65dbd.firebasestorage.app",
    messagingSenderId: "328231530287",
    appId: "1:328231530287:web:9a2f4bb9b92b5faa267bda"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  window.auth = auth;
  window.db = db;
  window.firebaseFunctions = {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    doc,
    setDoc,
    getDoc,
    updateDoc
  };
</script>
