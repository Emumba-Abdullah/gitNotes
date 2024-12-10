import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { toast } from 'react-toastify';

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    localStorage.setItem('userToken', token);

    return user;
  } catch (error: any) {
    toast.error('Error signing in with GitHub: ');
    return error;
  }
};
