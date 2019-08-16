import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCUK79q-iavQH6gELJjGzy-ts8gU1J7oJE",
    authDomain: "crwn-1769f.firebaseapp.com",
    databaseURL: "https://crwn-1769f.firebaseio.com",
    projectId: "crwn-1769f",
    storageBucket: "",
    messagingSenderId: "979337273104",
    appId: "1:979337273104:web:ffbe8c17e3f5a1cc"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;