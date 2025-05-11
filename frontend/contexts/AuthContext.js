import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../auth/firebaseConfig';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get the Firebase ID token and store it for API access
        try {
          const token = await firebaseUser.getIdToken();
          console.log('[AuthContext] Got Firebase ID token, storing in localStorage');
          localStorage.setItem('token', token);
        } catch (tokenError) {
          console.error('[AuthContext] Error getting Firebase ID token:', tokenError);
        }
      
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || undefined,
          photoURL: firebaseUser.photoURL || undefined,
        });
      } else {
        localStorage.removeItem('token'); // Clear token on logout
        setUser(null);
      }
      setLoading(false);
    });
  
    return unsubscribe;
  }, []);

  const handleAuthError = (error) => {
    console.error('Auth error:', error);
    let message = 'An error occurred during authentication';

    switch (error.code) {
      case 'auth/user-not-found':
        message = 'No user found with this email';
        break;
      case 'auth/wrong-password':
        message = 'Invalid password';
        break;
      case 'auth/email-already-in-use':
        message = 'Email already registered';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email address';
        break;
      case 'auth/weak-password':
        message = 'Password should be at least 6 characters';
        break;
      case 'auth/popup-closed-by-user':
        message = 'Google sign-in was cancelled';
        break;
      case 'auth/operation-not-allowed':
        message = 'Google sign-in is not enabled in Firebase. Please enable it in the Firebase console.';
        break;
      case 'auth/unauthorized-domain':
        message = 'This domain is not authorized for OAuth operations. Please add it in the Firebase console.';
        break;
      case 'permission-denied':
      case 'missing-or-insufficient-permissions':
        message = 'Missing or insufficient permissions to access Firestore. Please check your security rules.';
        break;
      default:
        message = error.message || 'An unknown error occurred';
    }

    setError(message);
    return message;
  };

  const signInWithEmail = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      const errorMessage = handleAuthError(error);
      throw new Error(errorMessage);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      
      console.log('Starting Google sign-in...');
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign-in successful:', result.user.uid);

      try {
        const userRef = doc(db, 'users', result.user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          console.log('Creating new user document...');
          // Create user profile
          await setDoc(userRef, {
            email: result.user.email,
            displayName: result.user.displayName || null,
            photoURL: result.user.photoURL || null,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          });
          console.log('User document created successfully');
        } else {
          console.log('Updating existing user document...');
          // Update last login
          await setDoc(
            userRef,
            {
              lastLogin: new Date().toISOString(),
            },
            { merge: true }
          );
          console.log('User document updated successfully');
        }
      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError);
        // We'll continue even if Firestore operations fail
        // Just log the error but don't throw it to allow authentication to succeed
        setError('Authentication successful, but there was an error updating user data: ' + firestoreError.message);
      }

      return result;
    } catch (error) {
      console.error('Google sign-in error:', error);
      const errorMessage = handleAuthError(error);
      throw new Error(errorMessage);
    }
  };

  const signUp = async (email, password) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      try {
        // Add additional fields
        const userRef = doc(db, 'users', result.user.uid);
        await setDoc(
          userRef,
          {
            email: result.user.email,
            displayName: result.user.displayName || null,
            photoURL: result.user.photoURL || null,
            createdAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (firestoreError) {
        console.error('Firestore error during signup:', firestoreError);
        // Continue even if Firestore operations fail
      }

      return result;
    } catch (error) {
      const errorMessage = handleAuthError(error);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
      router.push('/');
    } catch (error) {
      handleAuthError(error);
    }
  };

  const isAuthenticated = () => {
    return !!user;
  };

  // Add memoization for the context value
  const contextValue = useMemo(() => ({
    user,
    loading,
    error,
    signInWithGoogle,
    logout,
    signInWithEmail,
    signUp,
    isAuthenticated,
    setError,
  }), [user, loading, error, signInWithGoogle, logout, signInWithEmail, signUp, isAuthenticated, setError]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
