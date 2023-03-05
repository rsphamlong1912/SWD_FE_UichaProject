// import { useState } from "react";
import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { UserAuth } from '~/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '~/assets/images/logo.png';
import { Billing, Customer, Dashboard, Profile, Signout } from '~/components/Icons';

const Sidenav = ({ color }) => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('tokens');
      localStorage.removeItem('email');
      console.log('You are logged out');
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const items = [
    {
      label: (
        <NavLink to="/dashboard">
          <span
            className="icon"
            style={{
              background: page === 'dashboard' ? color : '',
            }}
          >
            <Dashboard />
          </span>
          <span className="label">Dashboard</span>
        </NavLink>
      ),
      key: '1',
    },
    {
      label: (
        <NavLink to="/customers">
          <span
            className="icon"
            style={{
              background: page === 'customers' ? color : '',
            }}
          >
            <Customer />
          </span>
          <span className="label">Customers</span>
        </NavLink>
      ),
      key: '2',
    },
    {
      label: (
        <NavLink to="/billing">
          <span
            className="icon"
            style={{
              background: page === 'billing' ? color : '',
            }}
          >
            <Billing />
          </span>
          <span className="label">Billing</span>
        </NavLink>
      ),
      key: '3',
    },
    { label: 'Account Pages', key: '4' },
    {
      label: (
        <NavLink to="/profile">
          <span
            className="icon"
            style={{
              background: page === 'profile' ? color : '',
            }}
          >
            <Profile />
          </span>
          <span className="label">Profile</span>
        </NavLink>
      ),
      key: '5',
    },
    {
      label: (
        <NavLink to="/sign-in" onClick={handleLogout}>
          <span className="icon">
            <Signout />
          </span>
          <span className="label">Sign Out</span>
        </NavLink>
      ),
      key: '6',
    },
  ];

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>UICHA Dashboard</span>
      </div>
      <hr />
      <Menu items={items} theme="light" mode="inline" />
      {/* <div className="aside-footer">
        <div
          className="footer-box"
          style={{
            background: color,
          }}
        >
          <Button onClick={handleLogout} type="primary" className="ant-btn-sm ant-btn-block">
            SIGN OUT
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default Sidenav;
