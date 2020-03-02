import * as firebase from 'firebase'; 

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.analytics();

export async function loginUser(email: string, password: string){
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return true;
  }
  catch(error) {
    console.log(error);
    return false;
  }
}

// export const auth = firebase.auth();
// export const db = firebase.database();