import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, Card } from 'antd';
import '../assets/styles/signup.css';

import logo3 from '../assets/images/Google__G__Logo.svg.png';

import { Link, useNavigate } from 'react-router-dom';
import { DribbbleOutlined, TwitterOutlined, InstagramOutlined, GithubOutlined } from '@ant-design/icons';
import { PinteredOutLined, Home } from '../components/Icons';
import { Radio } from 'antd';

const SignUp = () => {
  const { Title } = Typography;
  const { Header, Footer, Content } = Layout;

  const navitems = [
    {
      label: (
        <Link to="/">
          <Home />
          <span> Home</span>
        </Link>
      ),
      key: '1',
    },
  ];

  const [role, setRole] = useState('customer');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(role);
  };

  const menu = [
    { label: 'Company', key: '1' },
    { label: 'About Us', key: '2' },
    { label: 'Teams', key: '3' },
    { label: 'Products', key: '4' },
    { label: 'Blogs', key: '5' },
    { label: 'Pricing', key: '6' },
  ];

  const media = [
    { label: <Link to="#">{<DribbbleOutlined />}</Link>, key: '1' },
    { label: <Link to="#">{<TwitterOutlined />}</Link>, key: '2' },
    { label: <Link to="#">{<InstagramOutlined />}</Link>, key: '3' },
    { label: <Link to="#">{<PinteredOutLined />}</Link>, key: '4' },
    { label: <Link to="#">{<GithubOutlined />}</Link>, key: '5' },
  ];
  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Header>
          <div className="header-col header-brand">
            <h5>UICHA</h5>
          </div>
          <div className="header-col header-nav">
            <Menu mode="horizontal" defaultSelectedKeys={['1']} items={navitems} />
          </div>
        </Header>

        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <h1>Lần đầu bạn đến với hệ thống?</h1>
            </div>
            <form>
              <h2>Chọn vai trò của bạn?</h2>
              <div className="wrapper">
                <input
                  type="radio"
                  name="role"
                  id="option-1"
                  value="agency"
                  onChange={(e) => setRole(e.target.value)}
                  checked={role === 'agency'}
                />
                <input
                  type="radio"
                  name="role"
                  id="option-2"
                  value="creater"
                  onChange={(e) => setRole(e.target.value)}
                  checked={role === 'creater'}
                />
                <input
                  type="radio"
                  name="role"
                  id="option-3"
                  value="customer"
                  onChange={(e) => setRole(e.target.value)}
                  checked={role === 'customer'}
                />
                <label htmlFor="option-1" className="option option-1">
                  <div className="dot"></div>
                  <span>Agency</span>
                </label>
                <label htmlFor="option-2" className="option option-2">
                  <div className="dot"></div>
                  <span>Content creators</span>
                </label>
                <label htmlFor="option-3" className="option option-3">
                  <div className="dot"></div>
                  <span>Customer</span>
                </label>
              </div>
              <br />
              <button onClick={handleSubmit} className="btn-submit-role">
                Xác nhận
              </button>
            </form>
          </div>

          <Card className="card-signup header-solid h-full ant-card pt-0" bordered="false">
            <div className="sign-up-gateways"></div>
          </Card>
        </Content>
        <Footer>
          <Menu mode="horizontal" items={menu} />
          <Menu mode="horizontal" className="menu-nav-social" items={media} />
          <p className="copyright">
            {' '}
            Copyright © 2023 UICHA by <a href="#pablo">Uicha Team</a>.{' '}
          </p>
        </Footer>
      </div>
    </>
  );
};

export default SignUp;
