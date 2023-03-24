import { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Tooltip, Progress, Upload, message, Button, Timeline, Radio, Space } from 'antd';
import {
  MenuUnfoldOutlined,
  RightOutlined,
  FileOutlined,
  ToTopOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  TeamOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import Paragraph from 'antd/lib/typography/Paragraph';

const Dashboard = () => {
  const [creators, setCreators] = useState([]);
  const { Title, Text } = Typography;
  const [information, setInformation] = useState([]);
  const [tracking, setTracking] = useState([]);

  useEffect(() => {
    fetchApi();
    getCreators();
  }, []);

  const fetchApi = async () => {
    const idagency = localStorage.getItem('uid');
    fetch(`https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/order/agency/${idagency}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        setInformation(result.data);
      })
      .then(console.log);
  };

  const getCreators = async () => {
    const uid = localStorage.getItem('uid');
    await fetch(`https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/creator/?idagency=${uid}`)
      .then((res) => res.json())
      .then((result) => {
        setCreators(
          result.data?.map((item) => {
            if (item.idagency !== localStorage.getItem('uid')) {
              // eslint-disable-next-line array-callback-return
              return;
            }
            return item;
          }),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const totalRevenue = (information) => {
    return information.reduce((sum, order) => sum + Math.round(order.totalmoney), 0);
  };

  const total = totalRevenue(information).toLocaleString();

  const removeDuplicates = (arr) => {
    const result = [];
    const duplicates = {};

    for (let i = 0; i < arr.length; i++) {
      if (!duplicates[arr[i]]) {
        duplicates[arr[i]] = true;
        result.push(arr[i]);
      }
    }

    return result;
  };

  const newOrder = (tracking) => {
    // const result = [];
    // result.push(tracking);
    console.log(tracking);
    if (tracking === 'Pending') {
    }
  };

  const count = [
    {
      total: `Total Orders`,
      title: `${information.length}`,
      icon: <ShoppingCartOutlined />,
      unit: 'orders',
    },
    {
      total: 'Total Revenue',
      title: `${total}k`,
      icon: <DollarCircleOutlined />,
      unit: '$',
    },
    {
      total: 'Total Users',
      title: `${information.length}`,
      icon: <TeamOutlined />,
      unit: 'users',
    },
    {
      total: 'Creators',
      title: `${creators.length}`,
      icon: <ShoppingOutlined />,
      unit: 'creators',
    },
  ];

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.total}</span>
                      <Title level={3}>
                        {c.title} <small>{c.unit}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          <Col xl={24} className="mb-24">
            <Card bordered={true} className="criclebox ">
              <iframe
                src="https://lookerstudio.google.com/embed/reporting/09ae41b5-98a0-48cf-9a79-0aa37a3d795a/page/6ngJD"
                style={{ border: 0, width: '100%', height: '500px' }}
              ></iframe>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
