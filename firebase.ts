// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDQWD8_-EynI19pbO9aXZgeR4dm3Plgx9U',
  authDomain: 'gitnotes-a49be.firebaseapp.com',
  projectId: 'gitnotes-a49be',
  storageBucket: 'gitnotes-a49be.appspot.com',
  messagingSenderId: '995438582479',
  appId: '1:995438582479:web:781aa129a0a71b995ef5ba',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and GitHub Auth Provider
const auth = getAuth(app);
const provider = new GithubAuthProvider();
provider.addScope('gist');

export { auth, provider };
