import  firebase from "firebase"
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBSuy4GGNfBBKbpWtw7Qlq13rYlmB0xp3k",
  authDomain: "tcc-condominus.firebaseapp.com",
  projectId: "tcc-condominus",
  storageBucket: "tcc-condominus.appspot.com",
  messagingSenderId: "484267436991",
  appId: "1:484267436991:web:6d08b9521f383d3db50f0a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase