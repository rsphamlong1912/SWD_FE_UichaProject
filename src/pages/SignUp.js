import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Typography, Card } from 'antd';
import '../assets/styles/signup.css';

import logo3 from '../assets/images/Google__G__Logo.svg.png';

import { Link, useNavigate } from 'react-router-dom';
import { DribbbleOutlined, TwitterOutlined, InstagramOutlined, GithubOutlined } from '@ant-design/icons';
import { PinteredOutLined, Home } from '../components/Icons';
import { Radio } from 'antd';
import { api } from '~/services/axios';
import { UserAuth } from '~/context/AuthContext';

const SignUp = () => {
  const { Title } = Typography;
  const { Header, Footer, Content } = Layout;
  const { user } = UserAuth();

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
  const [idagency, setIdAgency] = useState('H1iFm7FawHY0pv9C4IGIBOUgdi33');
  const [agencyList, setAgencyList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(role);
    const data = {
      role: role,
      idagency: idagency,
      address: '',
      data: {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        phone: user.phoneNumber,
        picture: user.photoURL,
      },
    };
    api
      .post('/signup', data)
      .then((response) => {
        alert('Đăng ký thành công');
        if (role === 'customer') {
          window.location.href = '/customer/menu-creator';
        } else {
          window.location.href = '/creator';
        }
      })
      .catch((error) => {
        alert('Đăng ký thất bại');
      });
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
  useEffect(() => {
    api
      .get('/agency')
      .then((response) => {
        console.log('Dánh sách Agency nè:', response.data);
        setAgencyList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
              <div></div>
              <h2>Chọn vai trò của bạn?</h2>
              <div className="wrapper">
                {/* <input
                  type="radio"
                  name="role"
                  id="option-1"
                  value="agency"
                  onChange={(e) => setRole(e.target.value)}
                  checked={role === 'agency'}
                /> */}
                <input
                  type="radio"
                  name="role"
                  id="option-2"
                  value="creator"
                  onChange={(e) => setRole(e.target.value)}
                  checked={role === 'creator'}
                />
                <input
                  type="radio"
                  name="role"
                  id="option-3"
                  value="customer"
                  onChange={(e) => setRole(e.target.value)}
                  checked={role === 'customer'}
                />
                {/* <label htmlFor="option-1" className="option option-1">
                  <div className="dot"></div>
                  <span>Agency</span>
                </label> */}
                <label htmlFor="option-2" className="option option-2">
                  <div className="dot"></div>
                  <span>Nhà sáng tạo</span>
                </label>
                <label htmlFor="option-3" className="option option-3">
                  <div className="dot"></div>
                  <span>Khách hàng</span>
                </label>
              </div>
              <br />
              {/* <div>
                {role === 'creator' && (
                  <>
                    <h3>Chooese your agency</h3>
                    <select onChange={(event) => setIdAgency(event.target.value)}>
                      {agencyList.map((agency) => (
                        <option key={agency.idagency} value={agency.idagency}>
                          {agency.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div> */}
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
