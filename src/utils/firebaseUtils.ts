import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { auth, provider } from '../../firebase';

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    console.log('Token:', token);
    console.log('User:', user);

    return user;
  } catch (error: any) {
    console.error('Error signing in with GitHub: ', error);
    return error;
  }
};
