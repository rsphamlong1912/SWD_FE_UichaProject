import { DollarCircleOutlined, ShoppingCartOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Card, Col, List, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { OrderInfor } from './OrderInfor';

export const CreatorDetail = () => {
  let { idcreator } = useParams();

  useEffect(() => {
    fetchApi();
  }, []);

  //getApi
  const fetchApi = async () => {
    await fetch(`https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/creator/${idcreator}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const count = [
    {
      total: `Total Orders`,
      title: '0',
      icon: <ShoppingCartOutlined />,
      unit: 'orders',
    },
    {
      total: 'Todal Revenue',
      title: '0',
      icon: <DollarCircleOutlined />,
      unit: '$',
    },
    {
      total: 'Todal Users',
      title: '3,200',
      icon: <TeamOutlined />,
      unit: 'users',
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
          <Col span={24} md={16} className="mb-24">
            <OrderInfor />
          </Col>
          <Col span={24} lg={6} className="mb-24">
            <Card
              bordered={false}
              className="header-solid h-full ant-invoice-card"
              title={[<h6 className="font-semibold m-0">Information Creator</h6>]}
            ></Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
