import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAOby_i12q5Dn20-G59f1qOqBhrVlerljA",
    authDomain: "jewelrymirre.firebaseapp.com",
    projectId: "jewelrymirre",
    storageBucket: "jewelrymirre.appspot.com",
    messagingSenderId: "261730443981",
    appId: "1:261730443981:web:b67cc2ff0a58372af73f84",
    measurementId: "G-PGNXQYVHZ1",
};

!firebase.apps.length &&
    firebase.initializeApp(firebaseConfig)

export const database = firebase.firestore();

export default firebase;