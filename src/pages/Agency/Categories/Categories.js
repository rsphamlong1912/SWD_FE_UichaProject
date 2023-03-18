import { Row, Col, Card, Radio, Table, Button, Typography, Dropdown, Space, Modal, Input, Form } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Title } = Typography;

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    await fetch('https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/category/')
      .then((res) => res.json())
      .then((result) => {
        // console.log('idagency', result.data[0].idagency);
        // result.data.filter((data) => {
        //    if (data.idagency !== localStorage.getItem('uid')) {
        //       return false;
        //    }
        //    result.data = data;
        //    return true;
        // });
        // console.log(result.data);
        setCategories(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteApi = async (idproductcategory) => {
    fetch(`https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/category/delete/${idproductcategory}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleDelete = () => {};

  const onAddCategory = async (name, idagency) => {
    await fetch('https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/category/create', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        idagency: idagency,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
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

  // const onDelete = async () =>{{}}

  // table code start
  const [columns, setColumns] = useState([
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: '75%',
    },

    {
      title: 'ACTIONS',
      key: 'actions',
      dataIndex: 'actions',
    },
  ]);

  // add product modal
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const items = [
    {
      key: '1',
      label: (
        <label onClick={showModal}>
          <EditOutlined /> <span>Update</span>
        </label>
      ),
    },
    {
      key: '2',
      label: (
        <label onClick={handleDelete}>
          <DeleteOutlined /> <span>Delete</span>
        </label>
      ),
      danger: true,
    },
  ];

  // const handleOnSubmit = (e) => {
  //    const idagency = localStorage.getItem('uid');
  //    e.preventDefault();
  //    onAddCategory(e.target.name.value, idagency);
  //    e.target.name.value = '';
  // };

  const onFinish = (values) => {
    // values.preventDefault();
    const idagency = localStorage.getItem('uid');
    onAddCategory(values.name, idagency);
    values.name = '';
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const dataCreate = [
    {
      key: '1',
      name: (
        <>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        </>
      ),

      actions: (
        <>
          <div className="ant-action">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <PlusOutlined /> Add
              </Button>
            </Form.Item>
          </div>
        </>
      ),
    },
  ];

  const dataCategories = categories
    .filter((data) => {
      if (data.idagency !== localStorage.getItem('uid') || data.status === 0) {
        return false;
      }
      console.log(data);
      return true;
    })
    ?.map((category) => {
      return {
        key: `${category.idproductcategory}`,
        name: <>{category.name}</>,
        actions: (
          <>
            <div className="ant-action">
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <MoreOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </>
        ),
      };
    });

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Card bordered={false} className="criclebox tablespace mb-24" title="Categories Table">
              <div className="table-responsive">
                <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                  <Table columns={columns} dataSource={dataCreate} pagination={false} className="ant-border-space" />
                </Form>
                <Table columns={columns} dataSource={dataCategories} pagination={false} className="ant-border-space" />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Categories;
