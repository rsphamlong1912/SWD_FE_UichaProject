import React, { useEffect, createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import ProtectedRoute from "./pages/ProtectedRoute";
import "antd/dist/antd.min.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { AuthContextProvider } from "./context/AuthContext";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

export const TokenContext = createContext(null);
function App() {
  const [token, setToken] = useState(null);

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BDYnLI-lWyP8cZUlOscmyqO4VGNVWVCMkio1T8ZZOoVW227bA-UoTYX4N_QpXzJOOjayK79OvJg_p00PnqyolZM",
      });
      setToken(token);
      console.log("Token Gen", token);
    } else if (permission === "denied") {
      alert("you denied for the notification");
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <>
      <TokenContext.Provider value={token}>
        <AuthContextProvider>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Main />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="billing" element={<Billing />} />
              <Route path="profile" element={<Profile />} />
              <Route from="*" to="/dashboard" />
            </Route>
          </Routes>
        </AuthContextProvider>
      </TokenContext.Provider>
    </>
  );
}

export default App;
