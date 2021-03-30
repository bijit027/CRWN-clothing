import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyCPIjB4KwdRivSrx5_XEHnkbuTLUhunjzE",
        authDomain: "crwn-db-d0c81.firebaseapp.com",
        projectId: "crwn-db-d0c81",
        storageBucket: "crwn-db-d0c81.appspot.com",
        messagingSenderId: "388514127554",
        appId: "1:388514127554:web:3fe7fa83a0d1f1d014255b",
        measurementId: "G-ZPTCGW3H1D"
      };

export const createUserProfileDocument = async(userAuth,addtionalData)=>{
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  

  if(!snapShot.exists){
    const {displayName,email}  = userAuth;
    const createdAt = new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addtionalData
      })
    }
    catch(error){
      console.log('error creating user',error.message)

    }
  }
  return userRef;

  

}
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({promt:'select_account'});

export const signInWithGoogle=()=>auth.signInWithPopup(provider);


export default firebase;