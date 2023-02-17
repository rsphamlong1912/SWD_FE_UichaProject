import React from "react";
import { Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/Signin";
import Main from "./components/layout/Main";
import ProtectedRoute from "./pages/ProtectedRoute";
import "antd/dist/antd.min.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-5">
        UiCha Firebase Authentication
      </h1>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/rtl" element={<Rtl />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Redirect from="*" to="/dashboard" /> */}
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
