import { Row, Col, Card, Radio, Table, Button, Avatar, Typography, Dropdown, Space } from 'antd';

import { useEffect, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

// table code start
const columns = [
  {
    title: 'ID',
    dataIndex: 'idcreator',
    key: 'idcreator',
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
    width: '10%',
  },

  {
    title: 'DETAILS',
    key: 'details',
    dataIndex: 'details',
    width: '5%',
  },
];

const data2 = [
  { idcreator: '2', name: 'Cáo Hồng Hạnh', status: 0, idagency: 'H1iFm7FawHY0pv9C4IGIBOUgdi33', email: 's' },
  { idcreator: '1', name: 'Cáo Hồng ', status: 1, idagency: 'H1iFm7FawHY0pv9C4IGIBOUgdi33', email: 'g' },
  { idcreator: '3', name: 'Cáo Hồng 1', status: null, idagency: 'H1iFm7FawHY0pv9C4IGIBOUgdi33', email: '3' },
  { idcreator: '4', name: 'Cáo Hồng 2', status: 0, idagency: 'H1iFm7FawHY0pv9C4IGIBOUgdi33', email: 't' },
  { idcreator: '5', name: 'Cáo Hồng 3', status: 1, idagency: 'H1iFm7FawHY0pv9C4IGIBOUgdi33', email: 'd' },
];

const options = [
  { label: 'Active', value: 1 },
  { label: 'Inactive', value: null },
  { label: 'Pending', value: 0 },
];

function Creators() {
  const [creators, setCreators] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [dataToDisplay, setDataToDisplay] = useState(creators);

  useEffect(() => {
    fetchApi();
  }, []);

  //getApi
  const fetchApi = async () => {
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

  //updateApi
  const updateData = async (id, status) => {
    await fetch(
      `https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/creator/update/${id}?status=${status}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: status,
        }),
      },
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        fetchApi();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const convertStatus = (id, status) => {
    if (status === 0) {
      /* Pending to active & inactive */
      let result = window.confirm('Do you want to active this creator?');
      if (result === true) {
        status = true;
        // console.log(status);
      } else {
        return;
      }
    } else {
      let result = window.confirm('Do you want to Pending this creator?');
      if (result === true) {
        status = false;
      } else {
        return;
      }
    }
    // chờ xử lý api
    // else if (status === 1) {
    //   /* Active to inactive */
    //   let result = window.confirm('Do you want to Inactive this creator?');
    //   if (result === true) {
    //     status = null;
    //     console.log(status);
    //   } else {
    //     return;
    //   }
    // } else {
    //   /*Inactive to Active */
    //   let result = window.confirm('Do you want to Inactive this creator?');
    //   if (result === true) {
    //     status = true;
    //     console.log(status);
    //   } else {
    //     return;
    //   }
    // }
    updateData(id, status);
  };

  //filter Radio
  const onChange = (e) => {
    // console.log(`radio checked: ${e.target.value}`);
    setSelectedFilter(e.target.value);
    setDataToDisplay(
      creators
        .filter((creator) => creator.status === e.target.value)
        ?.map((creator) => {
          return {
            key: `${creator.idcreator}`,
            idcreator: (
              <>
                <p>{creator.idcreator}</p>
              </>
            ),

            name: (
              <>
                <Avatar.Group>
                  <Avatar className="shape-avatar" shape="square" size={40} src={creator.picture}></Avatar>
                  <div className="avatar-info">
                    <Title level={5}>{creator.name}</Title>
                  </div>
                </Avatar.Group>{' '}
              </>
            ),

            email: (
              <>
                <div className="author-info">
                  <p>{creator.email}</p>
                </div>
              </>
            ),

            status: (
              <label onClick={() => convertStatus(creator.idcreator, creator.status)}>
                {creator.status === 0 ? (
                  <Button type="primary" className="tag-primary" style={{ backgroundColor: 'green' }}>
                    Pending
                  </Button>
                ) : creator.status === 1 ? (
                  <Button type="primary" className="tag-primary">
                    Active
                  </Button>
                ) : (
                  <Button type="primary" className="tag-primary" danger>
                    Inactive
                  </Button>
                )}
              </label>
            ),

            details: (
              <>
                <div className="ant-action">
                  <Button
                    onClick={(e) => {
                      window.location.href = `/creators/${creator.idcreator}`;
                    }}
                  >
                    <Space>
                      <InfoCircleOutlined />
                      <span> Details</span>
                    </Space>
                  </Button>
                </div>
              </>
            ),
          };
        }),
    );
  };

  // const handleClick = (record) => {
  //   console.log(record.name);
  // };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Creators Table"
              extra={
                <>
                  <Radio.Group
                    defaultValue={1}
                    options={options}
                    onChange={onChange}
                    value={selectedFilter}
                    optionType="button"
                  />{' '}
                </>
              }
            >
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

export default Creators;
