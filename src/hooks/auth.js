import {useAuthState, useSignOut} from 'react-firebase-hooks/auth'
import { auth, db } from 'lib/firebase';
import { useState, useEffect } from 'react';
import { DASHBOARD, LOGIN } from 'lib/routes';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { Toast } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import Dashboard from 'components/dashboard';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import isUsernameExists from "utils/isUsernameExists";

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const ref = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(ref);
      setUser(docSnap.data());
      setLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false); // Not signed in
    }
  }, [authLoading]);

  return { user, isLoading, error };
}

export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function login({email, password, redirectTo=DASHBOARD}) {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast({
        title: "you are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: "login failed",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      return false; // return false if login failed
    }
    

    setLoading(false)
    return true //return true if login succeded
  }

  return {login, isLoading}
}

export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const toast=useToast();
  const navigate = useNavigate();

  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD}) 
  {
    setLoading(true);
    const usernameExists = await isUsernameExists(username)

    if (usernameExists) {
      toast({
        title: "username already exists",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    } else {
      try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        
        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar:"",
          date: Date.now(),
        });

        toast({
          title: "Accaunt created",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });

        navigate(redirectTo)
      }catch (error) {
        toast({
          title: "Signing up failed",
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
      }
      finally {
        setLoading(false)
      }
    }
    setLoading(false);

  }


  return {register, isLoading};
}


export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const navigate = useNavigate();
  const toast = useToast();

  async function logout(){
    if (await signOut()) {
      toast({
        title: "succesfully logged out",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      })
      navigate(LOGIN);
    } // else: show error 
  }

  return {logout, isLoading};
}