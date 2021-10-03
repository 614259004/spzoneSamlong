import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCeAapbDormp3VepegUaza-nhsNBqtEjuI",
    authDomain: "spzone-fb1ee.firebaseapp.com",
    projectId: "spzone-fb1ee",
    storageBucket: "spzone-fb1ee.appspot.com",
    messagingSenderId: "1015598316379",
    appId: "1:1015598316379:web:4622c1c6c2887e23fcb87e",
    measurementId: "G-XH1LLH17S4"
  };

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };