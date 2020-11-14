import firebase from 'firebase'

{/* <script src="https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js"></script>

<script> */}
var config = {
  apiKey: "AIzaSyDW7xALdF2y52AXo2OS8YVyA68akr3S3Vw",
  authDomain: "foodtimer-c817a.firebaseapp.com",
  databaseURL: "https://foodtimer-c817a.firebaseio.com",
  projectId: "foodtimer-c817a",
  storageBucket: "foodtimer-c817a.appspot.com",
  messagingSenderId: "70775918116",
  appId: "1:70775918116:web:cca9668b972a69a20892b1",
  measurementId: "G-W3CHJ1706B"
};

firebase.initializeApp(config);
firebase.analytics();
// </script>
export default firebase;