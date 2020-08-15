import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB7wXLWoz_vwgZfKwGRoToglMkZiHt0w80",
    authDomain: "crwn-db-f3c04.firebaseapp.com",
    databaseURL: "https://crwn-db-f3c04.firebaseio.com",
    projectId: "crwn-db-f3c04",
    storageBucket: "crwn-db-f3c04.appspot.com",
    messagingSenderId: "226660139239",
    appId: "1:226660139239:web:0063f652ed27f38269e242"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
