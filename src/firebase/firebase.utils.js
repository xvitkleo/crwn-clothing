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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${ userAuth.uid }`); // para utilizar metodos CRUD
    
    const snapShot = await userRef.get(); // representa la data

    if(!snapShot.exists) { // si no existe la data, crea a un usuario en ese lugar (el signin y signout lo ignora, solo entra en signup)
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user', error.message)
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
