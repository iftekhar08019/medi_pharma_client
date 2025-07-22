import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = async () => {
        setLoading(true);
        const result = await signInWithPopup(auth, googleProvider);
        // Set default role to 'user' if not present
        if (result.user && !result.user.role) {
            result.user.role = 'user';
        }
        setUser({ ...result.user, role: 'user' });
        return result;
    }

    const signInWithGithub = async () => {
        setLoading(true);
        const result = await signInWithPopup(auth, githubProvider);
        // Set default role to 'user' if not present
        if (result.user && !result.user.role) {
            result.user.role = 'user';
        }
        setUser({ ...result.user, role: 'user' });
        return result;
    }

    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            // If provider is Google or GitHub, ensure role is set to 'user'
            if (currentUser && (currentUser.providerData?.some(p => p.providerId === 'google.com' || p.providerId === 'github.com'))) {
                setUser({ ...currentUser, role: 'user' });
            } else {
                setUser(currentUser);
            }
            setLoading(false);
        });

        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        signInWithGithub,
        updateUserProfile,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
