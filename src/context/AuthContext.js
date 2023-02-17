import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { api } from "../services/axios";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
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
        currentUser.getIdToken().then((accessToken) => {
          // Đặt access token vào header của tất cả các yêu cầu AJAX
          api.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
          });
        });
        api
          .post("/login")
          .then((response) => {
            console.log(response.data);
            const { accessToken, refreshToken } = response.data;
            const tokens = {
              accessToken: accessToken,
              refreshToken: refreshToken,
            };
            //Lưu token vào local storage
            localStorage.setItem("tokens", JSON.stringify(tokens));

            //Lấy accessToken
            //const storedTokens = JSON.parse(localStorage.getItem('tokens'));
            // const accessToken = storedTokens.accessToken;
            // const refreshToken = storedTokens.refreshToken;
          })
          .catch((error) => {
            console.log(error);
          });
        navigate("/account");
      } else {
        console.log("User is signed out");
        api.interceptors.request.eject();
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
