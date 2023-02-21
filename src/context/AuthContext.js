import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { api } from "../services/axios";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    //Theo dõi sự kiện đăng nhâp của người dùng
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setUser(currentUser);
        console.log("User is signed in:", currentUser.uid);

        const storedTokens = JSON.parse(localStorage.getItem("tokens"));
        const accessToken = storedTokens?.accessToken || null;

        api.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        });
      } else {
        console.log("User is signed out");
        setUser(null);
      }
    });
  });

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
