import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Card, Col, Descriptions, Dropdown, Radio, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';

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

export const BillingInfor = (props) => {
  const [information, setInformation] = useState([]);

  //   const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const idagency = localStorage.getItem('uid');
    fetch(`https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/order/agency/${idagency}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        setInformation(result.data);
        // setTotalPages(result.total);
      })
      .then(console.log);
  };

  const updateTracking = async (idorder, tracking) => {
    if (tracking === 'Pending') {
      /* Pending to active & inactive */
      let result = window.confirm('Order was completed?');
      if (result === true) {
        tracking = 'Completed';
        // console.log(tracking);
      } else {
        return;
      }
    } else {
      let result = window.confirm('Do you want to undo?');
      if (result === true) {
        tracking = 'Pending';
      } else {
        return;
      }
    }
    await fetch(`https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/order/update-tracking/${idorder}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tracking,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTimeout(() => {
          fetchApi();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const convertTracking = (idorder, tracking) => {
    console.log(idorder);
    console.log(tracking);

    if (tracking === 'Pending') {
      /* Pending to active & inactive */
      let result = window.confirm('Order was completed?');
      if (result === true) {
        tracking = 'Completed';
        // console.log(tracking);
      } else {
        return;
      }
    } else {
      let result = window.confirm('Do you want to undo?');
      if (result === true) {
        tracking = 'Completed';
      } else {
        return;
      }
    }
  };

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
              <Radio.Button value="d">Completed</Radio.Button>
              <Radio.Button value="c">Cancel</Radio.Button>
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
                      <label style={{ cursor: 'pointer' }} onClick={(e) => updateTracking(data.idorder, data.tracking)}>
                        {data.tracking}
                      </label>
                    </Descriptions.Item>
                    <Descriptions.Item label="ID Order" span={3}>
                      {data.idorder}
                    </Descriptions.Item>
                    <Descriptions.Item label="ID Customer" span={3}>
                      {data.idcustomer}
                    </Descriptions.Item>
                    <Descriptions.Item label="email" span={3}>
                      {data.Customer.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Time" span={3}>
                      {convertToLocalDate(data.datetime)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Price" span={3}>
                      $ {data.totalmoney}
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
