import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Affix } from 'antd';
import Header from '../Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom/dist';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '~/context/AuthContext';
import Sidenav from '../Sidenav';

const { Header: AntHeader, Content, Sider } = Layout;

const Main = ({ children }) => {
  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/sign-in');
      console.log('You are logged out');
    } catch (e) {
      console.log(e.message);
    }
  };

  const [open, setOpen] = useState(false);
  const [sidenavColor, setSidenavColor] = useState('#1890ff');
  const [sidenavType, setSidenavType] = useState('transparent');
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setOpen(!open);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace('/', '');

  return (
    <Layout className={`layout-dashboard ${pathname === 'profile' ? 'layout-profile' : ''}`}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${sidenavType === '#fff' ? 'active-route' : ''}`}
        style={{ background: sidenavType }}
      >
        <Sidenav handleLogout={handleLogout} color={sidenavColor} />
      </Sider>
      <Layout>
        {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? 'ant-header-fixed' : ''}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader className={`${fixed ? 'ant-header-fixed' : ''}`}>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        )}
        <Content className="content-ant">{children}</Content>
        <Outlet />
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Main;
