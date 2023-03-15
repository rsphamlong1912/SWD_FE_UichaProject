import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, Card } from 'antd';

import { Link, useNavigate } from 'react-router-dom';
import { DribbbleOutlined, TwitterOutlined, InstagramOutlined, GithubOutlined } from '@ant-design/icons';
import { PinteredOutLined, Home } from '../components/Icons';
import GoogleButton from 'react-google-button';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { api } from '~/services/axios';

const Signin = () => {
  const { Title } = Typography;
  const { Header, Footer, Content } = Layout;

  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignInClick = async () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setValue(res.user.email);
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('uid', res.user.uid);
        const data = {
          idToken: res.user.accessToken,
        };
        api
          .post('/login', data)
          .then((response) => {
            console.log('API return:', response.data);
            const { accessToken, refreshToken, accountdb } = response.data;
            const tokens = {
              accessToken: accessToken,
              refreshToken: refreshToken,
            };
            //Lưu token vào local storage
            localStorage.setItem('tokens', JSON.stringify(tokens));
            localStorage.setItem('role', accountdb);
            if (accountdb.status) {
              localStorage.setItem('role', 'creator');
            } else {
              localStorage.setItem('role', accountdb);
            }

            if (accountdb === 'unknown') {
              window.location.href = '/sign-up';
            } else if (accountdb === 'customer') {
              window.location.href = '/customer/menu-creator';
            } else if (accountdb.role === 'creator') {
              if (accountdb.status == 1) {
                window.location.href = '/creator';
              } else {
                window.location.href = '/pending-creator';
              }
            } else {
              window.location.href = '/profile';
            }

            //Lấy accessToken
            //const storedTokens = JSON.parse(localStorage.getItem('tokens'));
            // const accessToken = storedTokens.accessToken;
            // const refreshToken = storedTokens.refreshToken;
          })
          .catch((error) => {
            alert('Đăng nhập thất bại rồi!');
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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
              <Title>Sign In</Title>
            </div>
          </div>

          <Card className="card-signup header-solid h-full ant-card pt-0" bordered="false">
            <div className="sign-up-gateways">
              {/* <Button type="false">
                <img src={logo3} alt="logo 3" />
                <span>Sign in with Google</span>
              </Button> */}
              <GoogleButton type="light" className="grow ml-4" onClick={handleGoogleSignInClick} />
            </div>
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

export default Signin;
