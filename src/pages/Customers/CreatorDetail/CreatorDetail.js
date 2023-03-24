import {
  DollarCircleOutlined,
  LikeOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  ToTopOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Col, List, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderInfor } from './OrderInfor';

export const CreatorDetail = () => {
  let { idcreator } = useParams();
  const [creator, setCreator] = useState([]);
  const [information, setInformation] = useState([]);

  useEffect(() => {
    fetchApi();
    getOrder();
  }, []);

  //getApi Id creator
  const fetchApi = async () => {
    await fetch(`https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/creator/${idcreator}`)
      .then((res) => res.json())
      .then((result) => {
        setCreator(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOrder = async () => {
    fetch(`https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/order/creator/${idcreator}`)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.data);
        setInformation(result.data);
        console.log(result.data);
        // setTotalPages(result.total);
      })
      .then(console.log);
  };

  const totalRevenue = (information) => {
    return information.reduce((sum, order) => sum + Math.round(order.totalmoneyCreator), 0);
  };

  const total = totalRevenue(information).toLocaleString();

  const count = [
    {
      total: `Total Orders`,
      title: `${information.length}`,
      icon: <ShoppingCartOutlined />,
      unit: 'orders',
    },
    {
      total: 'Total Revenue',
      title: `${total}`,
      icon: <DollarCircleOutlined />,
      unit: '$',
    },
    {
      total: 'Total Users',
      title: '3,200',
      icon: <TeamOutlined />,
      unit: 'users',
    },
    {
      total: 'Rank Creator',
      title: 'Good',
      icon: <LikeOutlined />,
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
          <Col span={24} md={18} className="mb-24">
            <OrderInfor />
          </Col>
          <Col span={24} lg={6} className="mb-24">
            <Card
              bordered={false}
              className="header-solid h-full ant-invoice-card"
              title={[<h6 className="font-semibold m-0">Information Creator</h6>]}
            >
              <Avatar.Group>
                <Avatar className="shape-avatar" shape="square" size={200} src={creator.picture}></Avatar>
              </Avatar.Group>{' '}
              <div className="avatar-info">
                <p>
                  <strong>ID Creator:</strong> {creator.idcreator}
                </p>
                <p>
                  <strong>Name:</strong> {creator.name}
                </p>{' '}
                <p>
                  <strong>Email:</strong> {creator.email}
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
