import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { api } from "../services/axios";

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout()
      localStorage.removeItem('tokens');
      localStorage.removeItem('email');
      navigate('/');
      console.log('You are logged out')

    } catch (e) {
      console.log(e.message)
    }
  }

  const handleTest = () => {
    api.get("/agency/test")
      .then(res => {
        console.log(res)
        alert('Lấy dữ liệu thành công!');
      })
      .catch(err => {
        alert('Lấy dữ liệu thất bại!');
        console.log(err)
      })
  }

  return <div className="max-w-[600px] mx-auto my-16 p-4">
    <h1 className="text-2xl font-bold py-4">Account</h1>
    <p>User Email: {user && user.displayName}</p>
    <button onClick={handleLogout} className="border px-6 py-2 my-4">Logout</button>
    <button onClick={handleTest} className="border px-6 py-2 my-4">Test Author</button>
  </div>;
};

export default Account;
