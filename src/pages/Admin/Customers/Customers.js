import { Row, Col, Card, Radio, Table, Button, Avatar, Typography, Dropdown, Space } from 'antd';

import { useEffect, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

// table code start
const columns = [
  {
    title: 'ID',
    dataIndex: 'idagency',
    key: 'idagency',
    width: '30%',
  },

  {
    title: 'NAME',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
  },

  {
    title: 'EMAIL',
    key: 'email',
    dataIndex: 'email',
    width: '30%',
  },
  {
    title: 'STATUS',
    key: 'status',
    dataIndex: 'status',
    width: '30%',
  },
];

const data2 = [
  { idagency: '2', name: 'Cáo Hồng Hạnh', status: 0, idagency: 'H1iFm7FawHY0pv9C4IGIBOUgdi33', email: 's' },
  { idagency: '1', name: 'Cáo Hồng ', status: 1, idagency: 'H1iFm7FawHY0pv9C4IGIBOUgdi33', email: 'g' },
  { idagency: '3', name: 'Cáo Hồng 1', status: null, idagency: 'H1iFm7FawHY0pv9C4IGIBOUgdi33', email: '3' },
  { idagency: '4', name: 'Cáo Hồng 2', status: 0, idagency: 'H1iFm7FawHY0pv9C4IGIBOUgdi33', email: 't' },
  { idagency: '5', name: 'Cáo Hồng 3', status: 1, idagency: 'H1iFm7FawHY0pv9C4IGIBOUgdi33', email: 'd' },
];

function Customers() {
  const [agency, setAgency] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);

  useEffect(() => {
    fetchApi();
  }, []);

  //getApi
  const fetchApi = async () => {
    await fetch(`https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/agency/`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        setAgency(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dataToDisplay = agency?.map((data) => {
    return {
      key: `${data.idagency}`,
      idagency: (
        <>
          <p>{data.idagency}</p>
        </>
      ),

      name: (
        <>
          <Title level={5}>{data.name}</Title>
        </>
      ),

      email: (
        <>
          <div className="author-info">
            <p>{data.email}</p>
          </div>
        </>
      ),
    };
  });

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card bordered={false} className="criclebox tablespace mb-24" title="Agency Table">
              <div className="table-responsive">
                <Table columns={columns} dataSource={dataToDisplay} pagination={false} className="ant-border-space" />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Customers;
