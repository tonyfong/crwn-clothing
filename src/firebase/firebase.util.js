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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
        await userRef.set(
          {
            displayName,
            email,
            createdAt,
            ...additionalData
          }
        )
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;