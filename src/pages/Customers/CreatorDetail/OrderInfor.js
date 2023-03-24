import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Card, Col, Descriptions, Dropdown, Radio, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const styleProcess = {
  position: 'absolute',
  top: '0px',
  right: '15px',
  fontSize: '14px',
};

const convertToLocalDate = (inputDate) => {
  const date = new Date(inputDate);
  return date.toLocaleString();
};

export const OrderInfor = (props) => {
  let { idcreator } = useParams();

  const [information, setInformation] = useState([]);

  //   const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
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
  console.log(information);
  // const getOrderDetails = async () => {
  //   const idagency = localStorage.getItem('uid');
  //   fetch(`https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080//orderdetail/${idcreator}/${}`)
  //     .then((res) => res.json())
  //     .then((result) => {
  //       // console.log(result.data);
  //       setInformation(result.data);
  //       console.log(result.data);
  //       // setTotalPages(result.total);
  //     })
  //     .then(console.log);
  // };

  const items = [
    {
      key: '3',
      label: (
        <label>
          <EditOutlined /> <span>Detail</span>
        </label>
      ),
    },
    {
      key: '1',
      label: (
        <label>
          <EditOutlined /> <span>Update</span>
        </label>
      ),
    },
    {
      key: '2',
      label: (
        <label>
          <DeleteOutlined /> <span>Delete</span>
        </label>
      ),
      danger: true,
    },
  ];

  return (
    <>
      <Card
        className="header-solid h-full"
        bordered={false}
        title={[<h6 className="font-semibold m-0">Billing Information</h6>]}
        bodyStyle={{ paddingTop: '0' }}
        extra={
          <>
            <Radio.Group defaultValue="a">
              <Radio.Button value="a">All</Radio.Button>
              <Radio.Button value="b">Pending</Radio.Button>
              <Radio.Button value="c">Processing</Radio.Button>
              <Radio.Button value="d">Completed</Radio.Button>
            </Radio.Group>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {information.map((data, index) => (
            <Col span={24} key={index}>
              <Card className="card-billing-info" bordered="false">
                <div className="col-info">
                  <Descriptions title={data.Customer.name} style={{ position: 'relative' }}>
                    <Descriptions.Item span={3} style={styleProcess}>
                      {data.tracking}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email Customer" span={3}>
                      {data.Customer.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="ID Order" span={3}>
                      {data.idorder}
                    </Descriptions.Item>
                    <Descriptions.Item label="ID Customer" span={3}>
                      {data.Customer.idcustomer}
                    </Descriptions.Item>
                    <Descriptions.Item label="Time" span={3}>
                      {convertToLocalDate(data.datetime)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Price" span={3}>
                      $ {Math.round(data.totalmoneyCreator).toLocaleString()}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <div className="col-action">
                  <div className="ant-action">
                    <Dropdown menu={{ items }} placement="bottomRight" overlayStyle={{ backgroundColor: 'red' }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <MoreOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
};
