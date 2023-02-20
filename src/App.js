import React, { useEffect } from "react";
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

function App() {


  async function requestPermission() {
    const permission = await Notification.requestPermission()
    if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BDYnLI-lWyP8cZUlOscmyqO4VGNVWVCMkio1T8ZZOoVW227bA-UoTYX4N_QpXzJOOjayK79OvJg_p00PnqyolZM",
        })
        console.log('Token Gen', token)
      }else if(permission === "denied") {
        alert('you denied for the notification')
      }
  }
  
  
  useEffect(()=>{
    requestPermission()
  },[])
  

  return (
    <>
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
    </>
  );
}

export default App;
