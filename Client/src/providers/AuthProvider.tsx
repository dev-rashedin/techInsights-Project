import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
  User,
} from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { getASecureRandomPassword } from '../api/utils';
import { axiosApi } from '../api/axiosApi';

// ----------- Types -----------
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  createUser: (email: string, password: string) => Promise<User>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
  logInUser: (email: string, password: string) => Promise<User>;
  logOutUser: () => Promise<void>;
  googleLogin: () => Promise<User>;
  githubLogin: () => Promise<User>;
  updateUserPass: (user: User, currentPassword: string) => Promise<void>;
  resetUserPass: (email: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // --- Auth functions ---
  const createUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return user;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (name: string, photo: string) => {
    if (!auth.currentUser) throw new Error('No current user');
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logInUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const githubLogin = async () => {
    setLoading(true);
    try {
      const { user } = await signInWithPopup(auth, githubProvider);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const logOutUser = async () => {
    setLoading(true);
    try {
      return await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  const updateUserPass = async (user: User, currentPassword: string) => {
    const newPassword = getASecureRandomPassword();
    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetUserPass = async (email: string) => {
    setLoading(true);
    try {
      return await sendPasswordResetEmail(auth, email);
    } finally {
      setLoading(false);
    }
  };

  // --- Observer for auth state ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);

      try {
        if (currentUser?.email) {
          const res = await axiosApi.post('/jwt', { email: currentUser.email });
          if (res.data?.token) {
            localStorage.setItem('access-token', res.data.token);
          }
        } else {
          localStorage.removeItem('access-token');
        }
      } catch (error) {
        console.error('JWT fetch error:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // --- Memoized context ---
  const authInfo: AuthContextType = useMemo(
    () => ({
      user,
      loading,
      setLoading,
      createUser,
      updateUserProfile,
      logInUser,
      logOutUser,
      googleLogin,
      githubLogin,
      updateUserPass,
      resetUserPass,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
